<?php

namespace Theme;

class Dashbord
{
    private static $instance;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new Dashbord();
        }
    }

    public function init_callback(): void
    {
        // ダッシュボードウィジェットの非表示
        add_action('wp_dashboard_setup', [$this, 'hide_dashboard_widgets']);

        // カスタムダッシュボードウィジェットを追加
        // add_action('wp_dashboard_setup', [$this, 'add_custom_widget']);

        // クイック編集の禁止
        if (!is_local()) {
            add_action('admin_menu', [$this, 'disable_quick_edit']);
        }

        // ログイン画面のロゴと背景を変更
        add_action('login_head', [$this, 'replace_login_logo']);

        // ログイン画面のロゴのURLをTOPページに変更
        add_filter('login_headerurl', [$this, 'replace_logo_link']);

        // フッターにクレジットを追加
        add_filter('admin_footer_text', [$this, 'modify_admin_footer_credit']);

        // 管理者以外のサイドバーメニュー非表示
        add_action('admin_menu', [$this, 'non_adiministrator_remove_menus']);

        // アドミンバーの項目表示・非表示
        add_action('admin_bar_menu', [$this, 'manage_bar_menus'], 201);
    }

    public function hide_dashboard_widgets(): void
    {
        remove_action('welcome_panel', 'wp_welcome_panel'); // ようこそ
        remove_meta_box('dashboard_right_now', 'dashboard', 'normal'); // 概要
        remove_meta_box('dashboard_activity', 'dashboard', 'normal'); // アクティビティ
        remove_meta_box('dashboard_quick_press', 'dashboard', 'side'); // クイックドラフト
        remove_meta_box('dashboard_primary', 'dashboard', 'side'); // WordPressニュース
        remove_meta_box('dashboard_site_health', 'dashboard', 'normal'); // サイトヘルスステータス
    }

    public function add_custom_widget(): void
    {
        wp_add_dashboard_widget('{hundle-of-widget}', 'タイトル', [$this, 'custom_widget_callback']);
    }

    public function custom_widget_callback(): void
    {
        echo 'custom widget';
    }

    public function disable_quick_edit(): void
    {
        foreach (get_post_types([
            'public'   => true,
            '_builtin' => true
        ]) as $pt) {
            add_filter($pt . '_row_actions', function (array $actions): array {
                unset($actions['inline hide-if-no-js']);
                return $actions;
            });
        }
    }

    public function replace_login_logo(): void
    {
        echo '
        <style>
        .login {
            background-image: url(' . get_stylesheet_directory_uri() . '/screenshot.png);
            background-size: cover;
            background-position: center center;
        }
        #login h1 a {
            background-image: url(' . get_stylesheet_directory_uri() . '/logo.svg);
            background-size: contain;
        }
        </style>';
    }

    public function replace_logo_link(): string
    {
        return URL_HOME;
    }

    public function modify_admin_footer_credit(): void
    {
        // echo ' <a href="https://exmaple.com" target="_blank">Powered by Example</a>';
    }

    public function non_adiministrator_remove_menus(): void
    {
        if (!is_super_admin()) {
            remove_menu_page('upload.php');
            remove_menu_page('tools.php');
            remove_submenu_page('index.php', 'update-core.php');
        }
    }

    public function manage_bar_menus($wp_admin_bar): void
    {
        $wp_admin_bar->remove_menu('wp-logo');      // ロゴ
        //    $wp_admin_bar->remove_menu( 'site-name' );    // サイト名
        $wp_admin_bar->remove_menu('customize');    // サイト名 -> カスタマイズ (公開側)
        $wp_admin_bar->remove_menu('comments');     // コメント
        $wp_admin_bar->remove_menu('updates');      // 更新
        $wp_admin_bar->remove_menu('view');         // 投稿を表示
        //    $wp_admin_bar->remove_menu( 'new-content' );  // 新規
        //    $wp_admin_bar->remove_menu( 'new-post' );     // 新規 -> 投稿
        $wp_admin_bar->remove_menu('new-media');    // 新規 -> メディア
        $wp_admin_bar->remove_menu('new-page');     // 新規 -> 固定ページ
        $wp_admin_bar->remove_menu('new-user');     // 新規 -> ユーザー
        //    $wp_admin_bar->remove_menu( 'my-account' );   // マイアカウント
        $wp_admin_bar->remove_menu('user-info');    // マイアカウント -> プロフィール
        $wp_admin_bar->remove_menu('edit-profile'); // マイアカウント -> プロフィール編集
        //    $wp_admin_bar->remove_menu( 'logout' );       // マイアカウント -> ログアウト
        $wp_admin_bar->remove_menu('search');       // 検索 (公開側)
    }
}
