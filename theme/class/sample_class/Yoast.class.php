<?php

namespace Theme;

class Yoast
{
    private static $instance;

    private function __construct()
    {
        if (defined('WPSEO_FILE')) {
            add_filter('init', [$this, 'init_callback']);
        }
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new Yoast();
        }
    }

    public function init_callback(): void
    {
        // Yoastにjson-ldを出力させない
        // add_filter('wpseo_json_ld_output', '__return_false');

        // 投稿ページのjson-ldを変更
        // add_filter('wpseo_schema_article', [$this, 'article_json_ld']);

        // Yoastにrobotsを出力させない
        // add_filter('wpseo_robots', '__return_false');

        // descriptionをフィルター
        // add_filter('wpseo_metadesc', [$this, 'description_filter']);
        // add_filter('wpseo_opengraph_desc', [$this, 'description_filter']);

        // titleをフィルター
        // add_filter('wpseo_title', 'title_filter');
        // add_filter('wpseo_opengraph_title', 'title_filter');

        // sitenameをフィルター
        // add_filter('wpseo_opengraph_site_name', 'site_name_filter');

        // ogp画像をフィルター
        // add_filter('wpseo_opengraph_image', 'og_image_filter');

        // headタグ内に自動出力されるYoastのコメントアウトを削除
        // add_action('wp_head', 'remove_comment', ~PHP_INT_MAX);
    }

    public function article_json_ld(string $schema_data): string
    {
        // do something
        return $schema_data;
    }

    public function description_filter(string $desc): string
    {
        // do something
        return $desc;
    }

    public function title_filter(string $title): string
    {
        // do something
        return $title;
    }

    public function site_name_filter(string $name): string
    {
        // do something
        return $name;
    }

    public function og_image_filter(string $img): string
    {
        return $img;
    }

    public function remove_comment(): void
    {
        ob_start(function (string $o): string {
            return preg_replace('/^\n?<!--.*?[Y]oast.*?-->\n?$/mi', '', $o);
        });
    }
}
