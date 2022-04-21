<?php

namespace Theme;

class Security
{
    private static $instance;
    private $err = [];

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new Security();
        }
    }

    public function init_callback(): void
    {
        // ダッシュボードにセキュリティウィジェットを追加
        add_action('wp_dashboard_setup', [$this, 'add_widget']);

        // 自動アップデートを無効
        define('AUTOMATIC_UPDATER_DISABLED', true);

        // PHPバージョンを非表示
        header_register_callback(function () {
            header_remove('X-Powered-By');
        });

        /**
         * Disable xmlrpc.php
         */
        add_filter('xmlrpc_enabled', '__return_false');

        // ピンバックの非表示
        add_filter('wp_headers', function (array $headers) {
            unset($headers['X-Pingback']);
            return $headers;
        });

        // ピンバックを無効
        add_filter("xmlrpc_methods", function (array $methods) {
            unset($methods["pingback.ping"]);
            return $methods;
        });

        // wp-login.phpへのリダイレクト禁止
        remove_action('template_redirect', 'wp_redirect_admin_locations', 1000);

        // authorページを無効
        add_filter('author_rewrite_rules', '__return_empty_array');

        // REST APIのリンクを非表示
        remove_action('template_redirect', 'rest_output_link_header', 11, 0);
    }

    public function add_widget(): void
    {
        $this->check_security();
        if (!empty($this->err)) {
            wp_add_dashboard_widget('security', 'サイトセキュリティ', [$this, 'custom_widget_callback']);
        }
    }

    public function custom_widget_callback(): void
    {
        echo '<ul style="color:red;">';
        foreach ($this->err as $err) {
            echo '<li>' . $err . '</li>';
        }
        echo '</ul>';
    }

    public function check_security(): void
    {
        $this->check_environment_type();
        if (in_array(wp_get_environment_type(), ['production'])) {
            $this->check_wp_debug();
            $this->check_user_name();
            $this->check_noindex();
            $this->check_salt();
            $this->check_basic_auth();
            $this->check_wp_config();
            $this->check_htaccess_permission();
        }
    }

    public function check_environment_type(): void
    {
        if (!defined('WP_ENVIRONMENT_TYPE')) {
            $this->err[] = 'WP_ENVIDONMENT_TYPEを設定してください。';
        }
    }

    public function check_wp_debug(): void
    {
        if (defined('WP_DEBUG') && WP_DEBUG === true) {
            $this->err[] = 'WP_DEBUGが有効になっています。';
        }
    }

    public function check_user_name(): void
    {
        $users = get_users();
        if (!empty($users)) foreach ($users as $user) {
            if (in_array($user->data->user_login, ['admin', 'root', 'user'])) {
                $this->err[] = 'ユーザー「<strong>' . $user->data->user_login . '</strong>」が存在します。削除してください。';
            }
        }
    }

    public function check_noindex(): void
    {
        if (get_option('blog_public') === "0") {
            $this->err[] = 'noindexからチェックを外してください';
        }
    }

    public function check_salt(): void
    {
        $keys = [
            'AUTH_KEY',
            'SECURE_AUTH_KEY',
            'LOGGED_IN_KEY',
            'NONCE_KEY',
            'AUTH_SALT',
            'SECURE_AUTH_SALT',
            'LOGGED_IN_SALT',
            'NONCE_SALT'
        ];
        foreach ($keys as $key) {
            if (!(defined($key) || empty(constant($key)) || constant($key) === 'put your unique phrase here')) {
                $this->err[] = $key . 'がデフォルト、または空白、または定義されていません。wp-config.phpに設定してください。ユニークな値を<a href="https://api.wordpress.org/secret-key/1.1/salt/" target="_blank">こちら</a>から取得できます。';
            }
        }
    }

    public function check_basic_auth(): void
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, URL_HOME);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);
        if (!empty($info['http_code']) && $info['http_code'] === 401) {
            $this->err[] = 'Basic認証がかかっています。';
        }
    }

    public function check_wp_config(): void
    {
        if (file_exists(ABSPATH . 'wp-config-sample.php')) {
            $this->err[] = 'wp-config-sample.phpが存在しています。削除してください。';
        }
        if (file_exists(ABSPATH . 'wp-config.php') && !in_array(substr(sprintf('%o', fileperms(ABSPATH . 'wp-config.php')), -4), ['0400', '600'])) {
            $this->err[] = 'wp-config.phpのパーミッションを400または600に設定してください。';
        }
    }

    public function check_htaccess_permission(): void
    {
        global $is_apache;
        if ($is_apache && file_exists(ABSPATH . '.htaccess') && !in_array(substr(sprintf('%o', fileperms(ABSPATH . '.htaccess')), -4), ['604', '606'])) {
            $this->err[] = '.htaccessのパーミッションを604または606に設定してください。';
        }
    }
}
