<?php

namespace Theme;

use WP_Post;

class PostTypeTaxonomy
{
    private static $instance;
    private static $dafault_post_type_args = [
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => 5,
        'menu_icon' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'author', 'thumbnail')
    ];
    private static $default_taxonomy_args = [
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
    ];

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new PostTypeTaxonomy();
        }
    }

    public function init_callback(): void
    {
        // 投稿タイプとタクソノミーを登録
        // $this->register_exaple(); // 投稿タイプ毎に追加

        // カスタム投稿タイプのpermalinkをslugからpost_idに変更
        // add_action('registered_post_type', [$this, 'replace_permalink_from_slug_to_id'], 1);

        // タクソノミーのslugに日本語がある場合、taxonomyName-idに変更して保存
        // add_action('admin_init', [$this, 'term_slug_filter']);

        // 標準の投稿タイプ・タクソノミーを無効
        // $this->disable_post();
    }

    public function register_exaple(): void
    {
        $args = array_merge(self::$dafault_post_type_args, array(
            'label' => 'POST TYPE NAME',
            'rewrite' => array('slug' => 'post_type_name')
        ));
        register_post_type('post_type_name', $args);


        $args = array_merge(self::$default_taxonomy_args, array(
            'label' => 'TAXONOMY NAME',
            'rewrite' => array('slug' => 'taxonomy slug')
        ));
        register_taxonomy('taxonomy_name', array('post_type_name'), $args);
    }

    public function replace_permalink_from_slug_to_id(): void
    {
        // 変更したい投稿タイプを配列にセット
        $post_types = [
            ''
        ];

        if (empty($post_types)) return;

        foreach ($post_types as $pt) {
            add_action('registered_post_type', function ($post_type) use ($pt) {
                if ($pt === $post_type) {
                    add_rewrite_tag("%${pt}_id%", '([0-9]+)', "post_type=${pt}&p=");
                    add_permastruct($pt, "${pt}/%${pt}_id%", []);
                }
            }, 10);

            add_filter('post_type_link', function (string $post_link, WP_Post $post) use ($pt): string {
                if ($pt === $post->post_type) {
                    $post_link = str_replace("%${pt}_id%", $post->ID, $post_link);
                }
                return $post_link;
            }, 10, 2);
        }
    }

    public function term_slug_filter(): void
    {
        add_action('create_term',  [$this, 'japanese_slug_to_taxonomy_name_and_term_id'], 10, 3);
        add_action('created_term', [$this, 'japanese_slug_to_taxonomy_name_and_term_id'], 10, 3);
        add_action('edited_term',  [$this, 'japanese_slug_to_taxonomy_name_and_term_id'], 10, 3);
    }

    public function japanese_slug_to_taxonomy_name_and_term_id(int $term_id, int $tt_id, string $taxonomy): void
    {
        $term = get_term($term_id, $taxonomy);
        if (!preg_match('/^[-_0-9a-zA-Z]+?$/', $term->slug)) {
            wp_update_term($term_id, $taxonomy, array(
                'slug' => $taxonomy . '-' . $term_id
            ));
        }
    }

    public function disable_post(): void
    {
        // カテゴリーとポストタグを無効
        unregister_taxonomy_for_object_type('category', 'post');
        unregister_taxonomy_for_object_type('post_tag', 'post');

        // 投稿タイプ、タクソノミーを404にする
        add_action('template_redirect', 'redirect_404_default_post_type_taxonomy');

        // 念の為リライトルールを削除
        add_filter('rewrite_rules_array', [$this, 'delete_default_post_type_rewrite_rules']);

        // 管理画面から非表示
        add_action('admin_menu', function (): void {
            remove_menu_page('edit.php');
        });
    }

    public function delete_default_post_type_rewrite_rules(array $rules): array
    {
        foreach ([
            '([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$',
            '([^/]+)/(feed|rdf|rss|rss2|atom)/?$',
            '([^/]+)/page/?([0-9]{1,})/?$',
            '([^/]+)/-([0-9]{1,})/?$',
            '([^/]+)(?:/([0-9]+))?/?$'
        ] as $rule) if (array_key_exists($rule, $rules)) unset($rules[$rule]);
        return $rules;
    }

    public function redirect_404_default_post_type_taxonomy(): void
    {
        global $wp_query;
        switch (true) {
            case is_post_type_archive('post'):
            case is_category():
            case is_tag():
            case is_singular('post'):
                $wp_query->set_404();
                status_header(404);
                break;
        }
    }
}
