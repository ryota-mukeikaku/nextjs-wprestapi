<?php

namespace Theme;

use WP_Error;
use WP_REST_Response;

class Gutenberg
{
    private static $instance;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
        // アイキャッチを有効化
        add_action('after_setup_theme', function (): void {
            add_theme_support('post-thumbnails');
        });
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new Gutenberg();
        }
    }

    public function init_callback(): void
    {

        // カスタムブロック追加
        $this->add_custom_blocks();

        // core/headingブロックにidを付与
        add_filter('render_block',  [$this, 'add_id_to_heading_block'], 10, 2);

        // プレビューブロック、descriptionブロックの設定
        $this->setup_preview_description_blocks();

        // Relationブロックのcurl用エンドポイント追加
        add_filter('wp_headers', [$this, 'add_access_control_header']);
        add_action('rest_api_init', [$this, 'add_relation_block_curl_endpoint']);

        // 使用ブロックのホワイトリスト
        add_filter('allowed_block_types_all', [$this, 'block_white_list']);

        // パターン削除
        add_filter('should_load_remote_block_patterns', '__return_false');

        // デフォルトのスタイル読み込み禁止
        add_action('wp_enqueue_scripts', function (): void {
            wp_dequeue_style('global-styles');
        });

        // block-library/style.min.cssの読み込みを無効
        add_action('wp_enqueue_scripts', [$this, 'dequeue_block_style'], 9999);

        // JS読み込み
        add_action('enqueue_block_editor_assets', [$this, 'enqure_block_scripts']);

        // サイドバーの表示項目を調整
        $this->modify_editor_sidebar();
    }

    public function add_custom_blocks(): void
    {
        foreach ([
            [
                'type' => 'relation',
                'callback' => null,
            ],
            [
                'type' => 'dl',
                'callback' => null,
            ],
            [
                'type' => 'profile',
                'callback' => null,
            ],
            [
                'type' => 'columns',
                'callback' => null,
            ],
            [
                'type' => 'speech',
                'callback' => null,
            ],
            [
                'type' => 'button',
                'callback' => null,
            ],
            [
                'type' => 'cv',
                'callback' => null,
            ],
            [
                'type' => 'toc',
                'callback' => [$this, 'toc_render_callback'],
            ],
        ] as $block_type) {

            $asset_file = include(STYLESHEETPATH . '/blocks/build/' . $block_type['type'] . '.asset.php');

            wp_register_script(
                $block_type['type'],
                get_theme_file_uri('/blocks/build/' . $block_type['type'] . '.js'),
                $asset_file['dependencies'],
                $asset_file['version']
            );

            wp_register_style(
                $block_type['type'] . '-editor-style',
                get_theme_file_uri('/blocks/build/' . $block_type['type'] . '.css'),
                ['wp-edit-blocks'],
                filemtime(get_theme_file_path('/blocks/build/' . $block_type['type'] . '.css'))
            );

            $args = [
                'editor_script' => $block_type['type'],
                'editor_style' => $block_type['type'] . '-editor-style',
            ];

            if (!is_null($block_type['callback'])) {
                $args['render_callback'] = $block_type['callback'];
            }

            register_block_type(
                'theme/' . $block_type['type'],
                $args
            );
        }
    }

    public function block_white_list(): array
    {
        $allowed_block_types = [
            'core/paragraph',
            'core/heading',
            'core/image',
            'core/quote',
            'core/list',
            'core/table',
            'core/embed',
            'theme/profile',
            'theme/dl',
            'theme/columns',
            'theme/speech',
            'theme/relation',
            'theme/button',
            'theme/cv',
            'theme/toc',
        ];
        return $allowed_block_types;
    }

    public function setup_preview_description_blocks(): void
    {
        add_action('enqueue_block_editor_assets', function (): void {
            foreach (['preview', 'description'] as $type) {
                $asset_file = include(STYLESHEETPATH . '/blocks/build/' . $type . '.asset.php');
                wp_enqueue_script(
                    'theme-' . $type,
                    get_theme_file_uri('/blocks/build/' . $type . '.js'),
                    $asset_file['dependencies'],
                    $asset_file['version']
                );
            }
        });
        add_action('admin_head', function (): void {
            echo '<script type="text/javascript">var NEXT_PUBLIC_URL = "' . NEXT_PUBLIC_URL . '"</script>' . PHP_EOL;
        });
        foreach (get_post_types([
            'public'   => true,
            '_builtin' => true
        ]) as $pt) {
            foreach (['description', 'preview_hash'] as $key) {
                register_post_meta(
                    $pt,
                    $key,
                    [
                        'show_in_rest' => true,
                        'single'       => true,
                        'type'         => 'string',
                        'auth_callback' => function () {
                            return current_user_can('edit_posts');
                        }
                    ]
                );
            }
        }
    }

    public function add_id_to_heading_block(string $block_content, array $block): string
    {
        if ('core/heading' == $block['blockName']) {
            $block_content = preg_replace_callback("#<(h[2-3])>(.*?)</\\1>#", function ($match) {
                list(, $heading, $title) = $match;
                return '<' . $heading . ' id="' . sanitize_title_with_dashes($title) . '">' . $title . '</' . $heading . '>';
            }, $block_content);
        }
        return $block_content;
    }

    public function toc_render_callback(array $block_attributes): ?string
    {
        if (empty($block_attributes['post_id'])) {
            return null;
        }
        $post = get_post($block_attributes['post_id']);
        $blocks = parse_blocks($post->post_content);
        $headings = [];
        $enableH3 = !array_key_exists('enableH3', $block_attributes) || $block_attributes['enableH3'] === true;
        foreach ($blocks as $b) {
            if ($b['blockName'] !== "core/heading") {
                continue;
            }
            if (empty($b['attrs']['level'])) {
                $headings[] = [
                    'h2' => trim(strip_tags($b['innerHTML'])),
                    'h3' => []
                ];
            } elseif ($b['attrs']['level'] === 3) {
                $headings[count($headings) - 1]['h3'][] = trim(strip_tags($b['innerHTML']));
            }
        }

        $rtn = '<div class="wp-block-theme-toc">';

        if (!empty($block_attributes['title'])) {
            $rtn .= '<div class="wp-block-theme-toc__title">' . $block_attributes['title'] . '</div>';
        }

        $rtn .= '<div class="wp-block-theme-toc__list">';

        foreach ($headings as $v) {
            $rtn .= '
        <div class="wp-block-theme-toc__item">
            <a class="wp-block-theme-toc__link" href="#' . sanitize_title_with_dashes($v['h2']) . '">' . $v['h2'] . '</a>';

            if ($enableH3 && $v['h3']) {
                $rtn .= '<div class="wp-block-theme-toc__list">';
                foreach ($v['h3'] as $h3) {
                    $rtn .= '<div class="wp-block-theme-toc__item">
                    <a class="wp-block-theme-toc__link" href="#' . sanitize_title_with_dashes($h3) . '">' . $h3 . '</a>
                </div>';
                }
                $rtn .= '</div>';
            }
            $rtn .= '</div>';
        }

        return $rtn . '</div></div>';
    }


    public function add_access_control_header($headers): ?array
    {
        global $wp;
        if (!preg_match('/wp-json/', $wp->request)) {
            $headers['Access-Control-Allow-Origin'] = ACCESS_CONTROL_ALLOW_ORIGIN;
            $headers['Access-Control-Allow-Credentials'] = 'true';
            $headers['Access-Control-Allow-Methods'] = 'GET,HEAD';
        }
        return $headers;
    }

    public function add_relation_block_curl_endpoint(): void
    {
        register_rest_route('api/v1', '/relation/', array(
            'methods' => 'GET',
            'callback' => function ($data) {
                $url = urldecode($data->get_param('url'));
                $conn = curl_init();
                curl_setopt($conn, CURLOPT_URL, $url);
                curl_setopt($conn, CURLOPT_RETURNTRANSFER, true);
                $content = curl_exec($conn);
                curl_close($conn);
                if (!$content) :
                    return new WP_Error('Could not get html', "指定のURLからHTMLを取得できませんでした。", ['status' => 400]);
                endif;
                preg_match('/<title[^>]*>(.+?)<\/title>/', $content, $title);
                preg_match('/<meta [^>]*property="og:image"[^>]+?content="(.+?)"/', $content, $image);
                if (empty($image[1])) {
                    preg_match('/<meta [^>]*?content="([^\"]+?)"[^>]+?property="og:image"/', $content, $image);
                }
                preg_match('/<meta [^>]*?property="og:description"[^>]+?content="([^\"]+?)"/', $content, $description);
                if (empty($description[1])) {
                    preg_match('/<meta [^>]*?content="([^\"]+?)"[^>]+?property="og:description"/', $content, $description);
                }
                if (empty($title[1]) || empty($image[1])) {
                    return new WP_Error('Could not parse html', "HTMLのパースに失敗しました。取得元サイトのデータが不完全な可能性があります", ['status' => 400]);
                }
                $image = $image[1];
                if (preg_match('/^\//', $image)) {
                    $image = preg_replace('/(^.+?\/\/.+?)\//', '$1', $url) . $image;
                }
                $rtn = [
                    'title' => $title[1],
                    'image' => $image,
                    'description' => !empty($description[1]) ? $description[1] : ''
                ];
                return new WP_REST_Response(json_encode($rtn), 200);
            },
            'permission_callback' => function (): bool {
                return true;
            }
        ));
    }

    public function dequeue_block_style(): void
    {
        wp_dequeue_style('wp-block-library');
    }

    public function enqure_block_scripts(): void
    {
        wp_enqueue_script(
            'gb-settings',
            get_template_directory_uri() . '/blocks/block_settings.js',
            ['wp-blocks', 'wp-dom-ready', 'wp-edit-post'],
            '1.0',
            true
        );
    }

    public function modify_editor_sidebar(): void
    {
        remove_theme_support('block-templates');

        foreach (['post', 'page'] as $post_type) {
            remove_post_type_support($post_type, 'author');              // 投稿者
            remove_post_type_support($post_type, 'post-formats');        // 投稿フォーマット
            remove_post_type_support($post_type, 'revisions');           // リビジョン
            // remove_post_type_support($post_type, 'thumbnail');        // アイキャッチ
            remove_post_type_support($post_type, 'excerpt');             // 抜粋
            remove_post_type_support($post_type, 'comments');            // コメント
            remove_post_type_support($post_type, 'trackbacks');          // トラックバック
            remove_post_type_support($post_type, 'custom-fields');       // カスタムフィールド
            remove_post_type_support($post_type, 'template');            // テンプレート
            if ($post_type === 'post') {
                // unregister_taxonomy_for_object_type('category', 'post'); // カテゴリー
                // unregister_taxonomy_for_object_type('post_tag', 'post'); // タグ
            }
        }
    }
}
