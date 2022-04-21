<?php

namespace Theme;

class Frontend
{
    private static $instance;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new Frontend();
        }
    }

    public function init_callback(): void
    {
        // titleタグの出力
        add_theme_support('title-tag');

        // bodyに付与されるクラスを調整
        add_filter('body_class', [$this, 'body_class']);

        // 抜粋（excerpt）の設定
        // $this->exerpt();
    }

    public function body_class(array $classes): array
    {
        global $post;
        switch (true) {
            case is_front_page():
                unset($classes[array_search('blog', $classes)]);
                $classes[] = 'front-page';
                $classes[] = 'index';
                break;
            case is_page():
                unset($classes[array_search('page-id-' . $post->ID, $classes)]);
                $classes[] = 'page-' . $GLOBALS['post']->post_name;
                $parent = $post;
                while ($parent->post_parent) {
                    unset($classes[array_search('parent-pageid-' . $parent->post_parent, $classes)]);
                    $descendant = array_search('child-of-' . $parent->post_name, $classes);
                    $parent = get_post($parent->post_parent);
                    $classes[] = 'child-of-' . $parent->post_name;
                    if ($descendant) $classes[] = 'descendant-of-' . $parent->post_name;
                }
                break;
        }
        return $classes;
    }

    private function exerpt(): void
    {
        // 文字数設定
        add_filter('excerpt_mblength', function ($length): int {
            return 59;
        });

        // moreの文言を変更
        add_filter('excerpt_more', function ($more): string {
            return '...';
        });
    }
}
