<?php

namespace Theme;

use Aws\Exception\AwsException;
use Aws\CloudFront\CloudFrontClient;

use Theme\Notification;

class CloudFrontCacheClear
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
            self::$instance = new CloudFrontCacheClear();
        }
    }

    public function init_callback(): void
    {
        if (in_array(wp_get_environment_type(), ['production'])) {
            add_action('clear_cloudfront_cache', [$this, 'clear_cloudfront_cache']);

            // キャッシュクリアダッシュボードウィジェットを追加
            add_action('wp_dashboard_setup', [$this, 'add_widget']);
        }
    }

    public function clear_cloudfront_cache(): void
    {
        $client = new CloudFrontClient([
            'version' => AWS_CLOUDFRONT_CACHE_CLEAR_CLIENT_VERSION,
            'region' => AWS_CLOUDFRONT_CACHE_CLEAR_REGION,
            'credentials' => [
                'key' => AWS_CLOUDFRONT_CACHE_CLEAR_IAM_ACCESS_KEY_ID,
                'secret' => AWS_CLOUDFRONT_CACHE_CLEAR_IAM_SECRET_ACCESS_KEY,
            ],
        ]);

        $caller = $this->generateRandomString(16);

        $clearItems = ['*'];

        try {
            $this->notification->slack('cloudfront cache clear is started');
            $result = $client->createInvalidation([
                'DistributionId' => AWS_CLOUDFRONT_CACHE_CLEAR_DISTRIBUTION_ID,
                'InvalidationBatch' => [
                    'CallerReference' => $caller,
                    'Paths' => [
                        'Items' => $clearItems,
                        'Quantity' => count($clearItems)
                    ]
                ]
            ]);
            $this->notification->slack('cloudfront cache clear result:' . json_encode($result));
        } catch (AwsException $e) {
            $this->notification->slack('Error:cloudfront cache clear result:' . json_encode($e));
        }
    }

    public function generateRandomString(?int $length = 10): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function add_widget(): void
    {
        wp_add_dashboard_widget('rerun-github-actions', 'CloudFront キャッシュクリア', [$this, 'custom_widget_callback']);
    }

    public function custom_widget_callback(): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['clear_cloudfront_cache'])) {
            $this->clear_cloudfront_cache();
        }
        echo <<< MSG_EOF
        <form action="" method="POST">
         <button class="button button-primary" name="clear_cloudfront_cache" value="true">CloudFrontのキャッシュをクリア</button>
        </form>
        MSG_EOF;
    }
}
