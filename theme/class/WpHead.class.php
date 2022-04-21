<?php

namespace Theme;

class WpHead
{
    private static $instance;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new WpHead();
        }
    }

    public function init_callback(): void
    {
        // 絵文字に係るスクリプトなどのロードを無効
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');
        add_filter('emoji_svg_url', '__return_false');

        // xmlrpc linkを非表示
        remove_action('wp_head', 'rsd_link');

        // Hide Windows Live Writer manifest link
        remove_action('wp_head', 'wlwmanifest_link');

        // short linkを非表示
        remove_action('wp_head', 'wp_shortlink_wp_head');

        // REST APIエンドポイントを非幼児
        remove_action('wp_head', 'rest_output_link_wp_head', 10);

        // oEmbed Discovery Linksを非表示
        remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);

        // WordPressバージョンを非表示
        remove_action('wp_head', 'wp_generator');
    }
}
