<?php

namespace Theme;

use \WP_Query;
use \WP_REST_Response;
use \WP_REST_Request;
use \WP_Error;
use WP_Post;

use \Theme\Pagination;
use \Theme\Meta;
use \Theme\RestBreadcrumbs;

class RestApi
{
    private static $instance;

    private $meta;
    private $breadcrumbs;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new RestApi();
        }
    }

    public function init_callback(): void
    {
        add_filter('wp_headers', [$this, 'add_cros_header']);
        add_action('rest_api_init', [$this, 'register_endpoints']);
        // プレビュー表示用にhashを追加
        add_action('transition_post_status', function ($new_status, $old_status, $post) {
            if (in_array($new_status, ['publish', 'trash'])) return;
            if (empty(get_post_meta($post->ID, 'preview_hash', true))) {
                add_post_meta($post->ID, 'preview_hash', wp_generate_uuid4(), true);
            }
        }, 10, 3);
        add_action('admin_head', function () {
            echo '<style>
                #post-preview, .block-editor-post-preview__dropdown{
                    display:none !important;
                }
                </style>';
        });


        // 管理画面以外404
        add_filter('template_redirect', [$this, 'all_front_to_404']);
    }
    function add_cros_header(array $headers): array
    {
        global $wp;
        if (preg_match('/wp-json/', $wp->request)) {
            $headers['Access-Control-Allow-Origin'] = ACCESS_CONTROL_ALLOW_ORIGIN;
            $headers['Access-Control-Allow-Credentials'] = 'true';
            $headers['Access-Control-Allow-Methods'] = 'GET,HEAD';
        }
        return $headers;
    }
    function register_endpoints(): void
    {
        $this->meta = new Meta;
        $this->breadcrumbs = RestBreadcrumbs::init();

        register_rest_route('api/v1', '/index', [
            'methods' => 'GET',
            'callback' => [$this, 'index'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);

        register_rest_route('api/v1', '/ids/(?P<post_type>.+?$)', [
            'methods' => 'GET',
            'callback' => [$this, 'ids'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);

        register_rest_route('api/v1', '/terms/(?P<taxonomy>.+?$)', [
            'methods' => 'GET',
            'callback' => [$this, 'terms'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);

        register_rest_route('api/v1', '/pages/(?P<mode>[^/]+?)/(?P<slug>.+$)', [
            'methods' => 'GET',
            'callback' => [$this, 'archive_pages'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);

        register_rest_route('api/v1', '/post_type/(?P<post_type>[^/]+?)/(?P<id>\d+?$)', [
            'methods' => 'GET',
            'callback' => [$this, 'article'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);

        register_rest_route('api/v1', '/archive/post_type/(?P<post_type>[^/]+?)/page/(?P<page>\d+?$)', [
            'methods' => 'GET',
            'callback' => [$this, 'archive_article'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);

        register_rest_route('api/v1', '/index/page/(?P<page>\d+?$)', [
            'methods' => 'GET',
            'callback' => [$this, 'archive_index'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);

        register_rest_route('api/v1', '/archive/taxonomy/(?P<taxonomy>[^\/]+?)/term/(?P<slug>[^\/]+?)/page/(?P<page>\d+?$)', [
            'methods' => 'GET',
            'callback' => [$this, 'archive_taxonomy'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);

        register_rest_route('api/v1', '/archive/search/(?P<search>[^\/]+?)/page/(?P<page>\d+?$)', [
            'methods' => 'GET',
            'callback' => [$this, 'archive_search'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);

        register_rest_route('api/v1', '/preview/(?P<hash>\S+?$)', [
            'methods' => 'GET',
            'callback' => [$this, 'preview'],
            'permission_callback' => [$this, 'rest_permission_callback_true']
        ]);
    }
    function rest_permission_callback_true(): bool
    {
        return true;
    }
    function ids(WP_REST_Request $data)
    {
        $post_type = $data['post_type'];
        if (empty($post_type)) {
            return new WP_Error('Invalid Access', 'Invalid Access', ['status' => 400]);
        }
        global $wpdb;
        $res = $wpdb->get_results("select ID from wp_posts where post_type = '" . $post_type . "' and post_status = 'publish'");
        return new WP_REST_Response($res, 200);
    }
    function terms(WP_REST_Request $data)
    {
        if (empty($data['taxonomy'])) {
            return new WP_Error('Invalid Access', 'Invalid Access', ['status' => 400]);
        }
        $taxonomy = $data['taxonomy'];
        $terms = get_terms(['taxonomy' => $taxonomy]);
        $rtn = [];
        if ($terms) foreach ($terms as $term) {
            $posts = new WP_Query([
                'post_type' => 'any',
                'tax_query' => [
                    [
                        'taxonomy' => $taxonomy,
                        'field' => 'term_id',
                        'terms' => $term->term_id
                    ]
                ]
            ]);
            $rtn[] = [
                'slug' => $term->slug,
                'count' => $posts->max_num_pages
            ];
        }
        return new WP_REST_Response(['terms' => $rtn], 200);
    }
    function index()
    {
        $meta = $this->meta->get_metaset('home');
        $recent = new WP_Query(
            [
                'post_type' => 'post',
                'posts_per_page' => 1,
            ]
        );
        $formated_recent = $this->format_posts($recent);
        $posts = new WP_Query(
            [
                'post_type' => 'post',
                'posts_per_page' => 4,
                'offset' => 1
            ]
        );
        $formated_posts = $this->format_posts($posts);
        $news = new WP_Query(
            [
                'post_type' => 'news',
                'posts_per_page' => -1
            ]
        );
        $formated_news = $this->format_posts($news);
        return new WP_REST_Response(['meta' => $meta, 'recent' => $formated_recent, 'posts' => $formated_posts, 'news' => $formated_news, 'more_page' => $posts->max_num_pages, 'max_page' => ceil(($posts->found_posts - 5) / 10) + 1], 200);
    }
    function article(WP_REST_Request $data)
    {
        $id = $data['id'];
        $post_type = $data['post_type'];
        if ($post_type === "article") {
            $post_type = 'post';
        }
        if (empty($id)) {
            return new WP_Error('Invalid Access', 'Invalid Access', ['status' => 400]);
        }
        $post = get_post($id);
        if (empty($post)) {
            return new WP_Error('Invalid Access', 'Not Found', ['status' => 404]);
        }
        $meta = $this->meta->get_metaset('single', ['id' => $id, 'post_type' => $post->post_type, 'title' => get_the_title($id), 'description' => get_post_meta($id, 'description', true)]);
        $formated_post = $this->format_post($post);
        $pagination = $this->post_pagination($post);
        $relation = $this->post_relation($post);
        $breadcrumbs = $this->breadcrumbs->single($post);
        return new WP_REST_Response(['meta' => $meta, 'post' => $formated_post, 'pagination' => $pagination, 'relation' => $relation, 'breadcrumbs' => $breadcrumbs], 200);
    }
    function preview(WP_REST_Request $data)
    {
        $hash = $data['hash'];
        if (empty($hash)) {
            return new WP_Error('Invalid Access', 'Invalid Access', ['status' => 400]);
        }
        $posts = new WP_Query(
            [
                'post_type' => 'any',
                'post_status' => ['publish', 'future', 'draft', 'pending', 'private', 'auto-draft', 'inherit'],
                'posts_per_page' => 1,
                'meta_query' => [
                    [
                        'key' => 'preview_hash',
                        'value' => $hash
                    ]
                ]
            ]
        );
        if (!$posts->have_posts()) {
            return new WP_Error('Nothing was found', 'Nothing was found', ['status' => 404]);
        }
        $post = get_post($posts->posts[0]->ID);
        $meta = $this->meta->get_metaset('single', ['id' => $post->ID, 'post_type' => $post->post_type, 'title' => get_the_title($post->ID)]);
        $formated_post = $this->format_post($post);
        $pagination = $this->post_pagination($post);
        $relation = $this->post_relation($post);
        $breadcrumbs = $this->breadcrumbs->single($post);
        return new WP_REST_Response(['meta' => $meta, 'post' => $formated_post, 'pagination' => $pagination, 'relation' => $relation, 'breadcrumbs' => $breadcrumbs], 200);
    }
    function archive_index(WP_REST_Request $data)
    {
        $page = $data['page'];
        if (empty($page)) {
            return new WP_Error('Invalid Access', 'Invalid Access', ['status' => 400]);
        }
        $post_type = 'post';
        $posts = new WP_Query([
            'post_type' => $post_type,
            'offset' => 10 * ($page - 2) + 5,
        ]);
        if (!$posts->have_posts()) {
            return new WP_Error('Invalid Access', 'Not Found', ['status' => 404]);
        }
        $post_type_obj = get_post_type_object($post_type);
        $meta = $this->meta->get_metaset('archive', ['post_type' => $post_type, 'label' => $post_type_obj->label]);
        $formated_posts = $this->format_posts($posts);
        $pagination = Pagination::init($posts, 'post_type', $post_type === "post" ? 'article' : $post_type);
        $breadcrumbs = $this->breadcrumbs->archive_post_type($post_type_obj);
        return new WP_REST_Response(['meta' => $meta, 'posts' => $formated_posts, 'pagination' => $pagination->get_pagination_array(), 'breadcrumbs' => $breadcrumbs, 'label' => $post_type_obj->label], 200);
    }
    function archive_article(WP_REST_Request $data)
    {
        $page = $data['page'];
        $post_type = $data['post_type'];
        if ($post_type === "article") {
            $post_type = 'post';
        }
        if (empty($page)) {
            return new WP_Error('Invalid Access', 'Invalid Access', ['status' => 400]);
        }
        $posts = new WP_Query([
            'paged' => $page,
            'post_type' => $post_type
        ]);
        if (!$posts->have_posts()) {
            return new WP_Error('Invalid Access', 'Not Found', ['status' => 404]);
        }
        $post_type_obj = get_post_type_object($post_type);
        $meta = $this->meta->get_metaset('archive', ['post_type' => $post_type, 'label' => $post_type_obj->label]);
        $formated_posts = $this->format_posts($posts);
        $pagination = Pagination::init($posts, 'post_type', $post_type === "post" ? 'article' : $post_type);
        $breadcrumbs = $this->breadcrumbs->archive_post_type($post_type_obj);
        return new WP_REST_Response(['meta' => $meta, 'posts' => $formated_posts, 'pagination' => $pagination->get_pagination_array(), 'breadcrumbs' => $breadcrumbs, 'label' => $post_type_obj->label], 200);
    }
    function archive_taxonomy(WP_REST_Request $data)
    {
        $taxonomy = $data->get_param('taxonomy');
        $slug = $data->get_param('slug');
        $page = $data->get_param('page');
        if (empty($page) || empty($slug) || empty($taxonomy)) {
            return new WP_Error('Invalid Access', 'Invalid Access', ['status' => 400]);
        }
        $posts = new WP_Query([
            'paged' => $page,
            'post_type' => 'any',
            'tax_query' => [
                [
                    'taxonomy' => $taxonomy,
                    'field' => 'slug',
                    'terms' => $slug
                ]
            ]
        ]);
        if (!$posts->have_posts()) {
            return new WP_Error('Invalid Access', 'Not Found', ['status' => 404]);
        }
        $taxonomy_obj = get_term_by('slug', $slug, $taxonomy);
        $meta = $this->meta->get_metaset('taxonomy', ['taxonomy' => $taxonomy, 'label' => $taxonomy_obj->name, 'description' => $taxonomy_obj->description]);
        $formated_posts = $this->format_posts($posts);
        $pagination = Pagination::init($posts, $taxonomy, $slug);
        $breadcrumbs = $this->breadcrumbs->archive_taxonomy($taxonomy_obj);
        return new WP_REST_Response(['meta' => $meta, 'posts' => $formated_posts, 'pagination' => $pagination->get_pagination_array(), 'breadcrumbs' => $breadcrumbs, 'label' => $taxonomy_obj->name], 200);
    }
    function archive_search(WP_REST_Request $data)
    {
        $search = $data['search'];
        $page = $data['page'];
        if (empty($page) || empty($search)) {
            return new WP_Error('Invalid Access', 'Invalid Access', ['status' => 400]);
        }
        $posts = new WP_Query([
            'paged' => $page,
            'post_type' => 'any',
            's' => htmlentities($search, ENT_QUOTES, 'UTF-8')
        ]);
        if (!$posts->have_posts()) {
            return new WP_Error('Invalid Access', 'Not Found', ['status' => 404]);
        }
        $meta = $this->meta->get_metaset('search', ['label' => $search]);
        $formated_posts = $this->format_posts($posts);
        $pagination = Pagination::init($posts, 'search', htmlentities($search, ENT_QUOTES, 'UTF-8'));
        return new WP_REST_Response(['meta' => $meta, 'posts' => $formated_posts, 'pagination' => $pagination->get_pagination_array()], 200);
    }
    function format_posts($posts, $has_content = false): ?array
    {
        $rtn = [];
        if (is_array($posts)) {
            foreach ($posts as $post) {
                $rtn[] = $this->format_post($post, $has_content);
            }
        } elseif (is_object($posts)) {
            while ($posts->have_posts()) {
                $posts->the_post();
                $post = get_post(get_the_ID());
                $rtn[] = $this->format_post($post, $has_content);
            }
        }
        return (count($rtn)) ? $rtn : null;
    }
    function format_post(WP_Post $post, ?bool $has_content = true): array
    {
        $thumb = get_post_thumbnail_id($post->ID);

        $blocks = parse_blocks($post->post_content);
        $h2 = [];
        $i = 0;
        $index = 0;
        if (!empty($blocks)) foreach ($blocks as $b) if ($b['blockName'] === "core/heading") {
            if (empty($b['attrs']['level'])) {
                $i++;
                $h2[] = [
                    'text' => trim(strip_tags($b['innerHTML'])),
                    'id' => sanitize_title_with_dashes($b['innerHTML']),
                ];
                $index++;
            }
        }
        $rtn = [
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => ($has_content) ? $this->post_content_filter(apply_filters('the_content', $post->post_content)) : '',
            'date' => get_the_date('Y.m.d', $post),
            'taxonomies' => $this->post_taxonomies($post),
            'thumbnail' => !empty($thumb) ? wp_get_attachment_image_src($thumb, 'full') : null,
            'post_type' => ($post->post_type === 'post') ? 'article' : $post->post_type,
            'toc' => $h2
        ];
        return $rtn;
    }
    function post_content_filter(string $content): string
    {
        $content = preg_replace('/<!--.*?-->/', '', $content);
        $content = preg_replace('/wp-block-/', '', $content);
        return $content;
    }
    function post_taxonomies(WP_Post $post): array
    {
        $rtn = [];
        $taxonomies = get_object_taxonomies($post->post_type, 'objects');
        foreach ($taxonomies as $taxonomy_slug => $taxonomy) {
            $terms = get_the_terms($post->ID, $taxonomy_slug);
            if (!empty($terms)) {
                foreach ($terms as $term) {
                    $rtn[$taxonomy_slug][] = [
                        'slug' => $term->slug,
                        'name' => $term->name,
                        'term_id' => $term->term_id
                    ];
                }
            }
        }
        return $rtn;
    }
    function post_taxonomy_args(WP_Post $post): array
    {
        $args['tax_query'] = [
            'relation' => 'OR'
        ];
        $terms_in = $this->post_taxonomies($post);
        if (!empty($terms_in)) {
            foreach ($terms_in as $taxonomy => $terms) {
                if (!empty($terms)) {
                    $arr = [];
                    foreach ($terms as $term) {
                        $arr[] = $term['term_id'];
                    }
                    $args['tax_query'][] = [
                        'taxonomy' => $taxonomy,
                        'field' => 'term_id',
                        'terms' => $arr,
                        'operator' => 'IN'
                    ];
                }
            }
        } else {
            unset($args['tax_query']);
        }
        return $args;
    }
    function post_pagination(WP_Post $post, ?bool $same_term = false): array
    {
        $rtn = [
            'prev' => null,
            'next' => null
        ];
        $args = [
            'posts_per_page' => 1,
            'post_type' => $post->post_type,
            'post__not_in' => [$post->ID],
            'orderby' => 'date'
        ];
        if ($same_term) {
            $args = array_merge($args, $this->post_taxonomy_args($post));
        }
        $prev = new WP_Query(array_merge($args, [
            'date_query' => [
                [
                    'after' => get_the_date('Y-m-d H:i:s', $post)
                ]
            ],
            'order' => 'ASC'
        ]));
        if ($prev->have_posts()) {
            $prev->the_post();
            $rtn['prev'] = $this->format_post(get_post(), false);
        }
        $next = new WP_Query(array_merge($args, [
            'date_query' => [
                [
                    'before' => get_the_date('Y-m-d H:i:s', $post)
                ]
            ],
            'order' => 'DESC'
        ]));
        if ($next->have_posts()) {
            $next->the_post();
            $rtn['next'] = $this->format_post(get_post(), false);
        }
        return $rtn;
    }
    function post_relation(WP_Post $post): ?array
    {
        $args = [
            'posts_per_page' => 2,
            'post_type' => $post->post_type,
            'post__not_in' => [$post->ID],
        ];
        $args = array_merge($args, $this->post_taxonomy_args($post));
        $posts = new WP_Query($args);
        return $this->format_posts($posts);
    }

    function archive_pages(WP_REST_Request $data): WP_REST_Response
    {
        $args = $data['mode'] === "post_type" ?
            [
                'post_type' => $data['slug'] === 'article' ? 'post' : $data['slug']
            ] :
            [
                'tax_query' => [
                    [
                        'taxonomy' => $data['mode'],
                        'field' => 'slug',
                        'terms' => [$data['slug']]
                    ]
                ]
            ];
        $posts = new WP_Query($args);
        $rtn = [];
        if ($posts->max_num_pages !== 0) {
            for ($i = 1; $i <= $posts->max_num_pages; $i++) {
                $rtn[] = (string)$i;
            }
        }
        return new WP_REST_Response(['pages' => $rtn], 200);
    }

    public function all_front_to_404()
    {
        global $wp_query;
        switch (false) {
            case is_admin():
                $wp_query->set_404();
                status_header(404);
                break;
        }
    }
}
