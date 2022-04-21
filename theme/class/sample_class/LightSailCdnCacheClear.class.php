<?php

namespace Theme;

use Aws\Exception\AwsException;
use Aws\Lightsail\LightsailClient;

use Theme\Notification;

class LightSailCdnCacheClear
{
    private static $instance;

    private $notification;

    private function __construct()
    {
        $this->notification = Notification::init();
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new LightSailCdnCacheClear();
        }
    }

    public function init_callback(): void
    {
        if (in_array(wp_get_environment_type(), ['production'])) {
            add_action('clear_lightsail_cdn_cache', [$this, 'clear_lightsail_cdn_cache']);

            // キャッシュクリアダッシュボードウィジェットを追加
            add_action('wp_dashboard_setup', [$this, 'add_widget']);
        }
    }

    public function clear_lightsail_cdn_cache(): void
    {
        $client = new LightsailClient([
            'version' => AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_CLIENT_VERSION,
            'region' => AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_REGION,
            'credentials' => [
                'key' => AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_IAM_ACCESS_KEY_ID,
                'secret' => AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_IAM_SECRET_ACCESS_KEY,
            ],
        ]);

        try {
            $this->notification->slack('lightsail cdn cache clear is started');
            $result = $client->resetDistributionCache([
                'distributionName' => AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_DISTRIBUTION_NAME,
            ]);
            $this->notification->slack('lightsail cdn cache clear result:' . json_encode($result));
        } catch (AwsException $e) {
            $this->notification->slack('Error:lightsail cdn cache clear result:' . json_encode($e));
        }
    }

    public function add_widget(): void
    {
        wp_add_dashboard_widget('rerun-github-actions', 'Lightsail CDN キャッシュクリア', [$this, 'custom_widget_callback']);
    }

    public function custom_widget_callback(): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['clear_lightsail_cdn_cache'])) {
            $this->clear_lightsail_cdn_cache();
        }
        echo <<< MSG_EOF
        <form action="" method="POST">
         <button class="button button-primary" name="clear_lightsail_cdn_cache" value="true">Lightsail CDNのキャッシュをクリア</button>
        </form>
        MSG_EOF;
    }
}
