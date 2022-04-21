<?php

namespace Theme;

use WP_Admin_Bar;
use WP_Rewrite;

class Comments
{
    private static $instance;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new Comments();
        }
    }

    public function init_callback(): void
    {
        // コメントを無効化
        add_filter('comments_open', '__return_false');

        // 念の為リライトルールを削除
        add_filter('rewrite_rules_array', [$this, 'delete_comment_rewrite_rules']);

        // ダッシュボードのメニューから削除
        add_action('admin_menu', [$this, 'remove_comment_menus']);

        // ダッシュボードの投稿一覧ページからコメントのカラムを削除
        add_filter('manage_posts_columns', [$this, 'remove_comment_column']);

        // アドミンバーからコメントを削除
        add_action('admin_bar_menu', [$this, 'remove_comment_bar_menus'], 200);
    }

    public function delete_comment_rewrite_rules(array $rules): array
    {
        foreach ([
            'comments/feed/(feed|rdf|rss|rss2|atom)/?$',
            'comments/(feed|rdf|rss|rss2|atom)/?$',
            'comments/embed/?$',
            'comments/page/?([0-9]{1,})/?$'
        ] as $rule) if (!empty($rules[$rule])) unset($rules[$rule]);
        return $rules;
    }

    public function remove_comment_menus(): void
    {
        remove_menu_page('edit-comments.php');
    }

    public function remove_comment_column(array $columns): array
    {
        if (!empty($columns['comments'])) unset($columns['comments']);
        return $columns;
    }

    public function remove_comment_bar_menus(WP_Admin_Bar $wp_admin_bar): void
    {
        $wp_admin_bar->remove_menu('comments');
    }
}
