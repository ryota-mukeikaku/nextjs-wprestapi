<?php

namespace Theme;

use Theme\Log;

class QueryHooks
{
    private static $instance;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new QueryHooks();
        }
    }

    public function init_callback(): void
    {
        // フック数分メソッドを作成する
        // add_action('pre_get_posts', [$this, 'example_func']);
    }

    public function example_func($query): void
    {
        // 管理画面とサブクエリは除外
        if (is_admin() || !$query->is_main_query()) {
            return;
        }
        if ($query->is_home()) {
            $query->set('posts_per_page', '10');
            $query->set('meta_query', [
                [
                    'key' => 'meta_key',
                    'value' => 'meta_value'
                ]
            ]);
        }
    }
}
