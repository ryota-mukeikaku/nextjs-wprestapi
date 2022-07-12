<?php

namespace Theme;

class Media
{
    private static $instance;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new Media();
        }
    }

    public function init_callback(): void
    {
        // srcsetの自動挿入を無効
        add_filter('wp_calculate_image_srcset_meta', '__return_null');

        // リサイズ画像を作成させない
        // add_filter('intermediate_image_sizes_advanced', function () {
        //     return [];
        // });
        add_filter('big_image_size_threshold', '__return_false');

        // オリジナルファイルのサイズ制限
        add_action('wp_handle_upload', [$this, 'set_limit'], 1);
    }

    public function set_limit(array $file): array
    {
        if (in_array($file['type'], ['image/jpeg', 'image/gif', 'image/png'])) {
            $w = IMAGE_MAX_WIDTH;
            $h = IMAGE_MAX_HEIGHT;
            $image = wp_get_image_editor($file['file']);
            if (!is_wp_error($image)) {
                $size = getimagesize($file['file']);
                if ($size[0] > $w || $size[1] > $h) {
                    $image->resize($w, $h, false);
                    $image->save($file['file']);
                }
            }
        }
        return $file;
    }
}
