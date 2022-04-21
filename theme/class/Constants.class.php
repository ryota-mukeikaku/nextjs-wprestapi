<?php

namespace Theme;

class Constants
{
    private static $instance;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback'], 1);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new Constants();
        }
    }

    public function init_callback(): void
    {
        $this->general();
        $this->assets();
        $this->media();
        $this->internal_links();
        $this->external_links();
        $this->sns_links();
        $this->meta(); // Theme\Metaの設定をハードコードする場合
    }

    private function general(): void
    {
        define('NAME_SITE', get_bloginfo('name'));

        define('ORGANIZATION_NAME', '');
        define('KEY_COLOR', ' #0f5599');
    }

    private function assets(): void
    {
        define('URL_ASSETS', get_template_directory_uri() . '/assets/');
        define('URL_IMAGES', URL_ASSETS . 'images/');

        define('URL_JS', URL_ASSETS . 'js/');
        define('URL_CSS', URL_ASSETS . 'css/');
        define('URL_SVG', URL_ASSETS . 'svg/');

        define('PATH_IMAGES', STYLESHEETPATH . '/assets/images/');
        define('PATH_SVG_SPRITE', STYLESHEETPATH . '/assets/svg/sprite.svg');

        define('URL_FAVICON', URL_IMAGES . 'favicon.ico');
        define('URL_APPLE_TOUCH_ICON', URL_IMAGES . 'apple-touch-icon.png');

        define('URL_ORGANIZATION_LOGO', URL_SVG . 'logo.svg');
    }

    private function media(): void
    {
        define("IMAGE_MAX_WIDTH", '2880');
        define("IMAGE_MAX_HEIGHT", '0');
    }

    private function meta(): void
    {
        // define('THEME_META_SITE_NAME', 'サイト名');
        // define('THEME_META_DEFAULT_SINGLE_TITLE', '');
        // define('THEME_META_DEFAULT_ARCHIVE_TITLE', '');
        // define('THEME_META_SEARCH_TITLE', '');
        // define('THEME_META_DEFAULT_DESCRIPTION', '');
        // define('THEME_META_DEFAULT_OGIMAGE', '');
        // define('THEME_META_TWITTER', '@twitter');

        // define('THEME_META_HOME_TITLE', '');
        // define('THEME_META_HOME_DESCRIPTION', '');

        // define('THEME_META_POST_TYPE_POST_ARCHIVE_TITLE', '%default%');
        // define('THEME_META_POST_TYPE_POST_ARCHIVE_DESCRIPTION', '%default%');
        // define('THEME_META_POST_TYPE_POST_SINGLE_TITLE', '%default%');
        // define('THEME_META_POST_TYPE_POST_SINGLE_DESCRIPTION', '%default%');

        // define('THEME_META_TAXONOMY_CATEGORY_TITLE', '%default%');
        // define('THEME_META_TAXONOMY_CATEGORY_DESCRIPTION', '%default%');
        // define('THEME_META_TAXONOMY_POST_TAG_TITLE', '%default%');
        // define('THEME_META_TAXONOMY_POST_TAG_DESCRIPTION', '%default%');
    }

    private function internal_links(): void
    {
        define('URL_HOME', home_url('/'));
        define('NAME_HOME', 'HOME');

        //    define('URL_NEWS', URL_HOME . 'news/');
        //    define('NAME_NEWS', 'NEWS');
        //
        //    define('URL_ABOUT', URL_HOME . 'about/');
        //    define('NAME_ABOUT', 'ABOUT');
        //
        //    define('URL_SERVICE', URL_HOME . 'service/');
        //    define('NAME_SERVICE', 'SERVICE');
        //
        //    define('URL_CASE', URL_HOME . 'case/');
        //    define('NAME_CASE', 'CASE');
        //
        //    define('URL_RECRUIT', URL_HOME . 'recruit/');
        //    define('NAME_RECRUIT', 'RECRUIT');
        //
        //    define('URL_CONTACT', URL_HOME . 'contact/');
        //    define('NAME_CONTACT', 'CONTACT');
        //
        //    define('URL_CONFIRM', URL_CONTACT . 'confirm/');
        //    define('URL_COMPLETE', URL_CONTACT . 'complete/');
        //
        //    define('URL_PRIVACY', URL_HOME . 'privacy/');
        //    define('NAME_PRIVACY', 'PRIVACY');
    }

    private function external_links(): void
    {
        // define('URL_EXAMPLE', 'https://example.com/');
        // define('NAME_EXAMPLE', 'EXAMPLE');
    }

    private function sns_links(): void
    {
        // define('URL_YOUTUBE', 'https://www.youtube.com/');
        // define('URL_TWITTER', 'https://twitter.com/');
        // define('URL_FACEBOOK', 'https://facebook.com/');
        // define('URL_INSTAGRAM', 'https://instagram.com/');
        // define('URL_LINKED_IN', 'https://www.linkedin.com/');
        // define('URL_HATEBU', 'https://b.hatena.ne.jp/');
        // define('URL_PINTEREST', 'https://www.pinterest.jp/');
    }
}

// Constants::init();
