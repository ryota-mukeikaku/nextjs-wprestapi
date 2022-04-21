<?php

namespace Theme;

use WP_Error;

/**
 * Examples:
 * Log::init()->log('message here');
 * Log::init()->log('write to other file','custom_log');
 */

class Log
{
    private static $instance;
    private static $dir;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init($dir = WP_CONTENT_DIR . '/log'): Log
    {
        if (!isset(self::$instance)) {
            self::$dir = $dir;
            self::$instance = new Log();
        }
        return self::$instance;
    }

    public function init_callback(): void
    {
        if (!file_exists(self::$dir)) {
            if (!mkdir(self::$dir)) {
                new WP_Error('Could not create log directory');
                return;
            }
        }
        if (!is_writable(self::$dir)) {
            new WP_Error('log direcroty is not writable');
            return;
        }
    }

    public function log(string $msg, ?string $type = 'wordpress'): void
    {
        $path = self::$dir . '/' . $type . '.log';
        if (!file_exists($path)) {
            if (!file_put_contents($path, '')) {
                new WP_Error('Could not create ' . $path);
                return;
            }
        }
        if (!is_writable($path)) {
            new WP_Error($path . ' is not writable');
            return;
        }
        $this->add_log($msg, $path);
    }
    public function add_log(string $msg, string $path): void
    {
        $datetime = '[' . date_i18n('Y-m-d H:i:s') . '] ';
        $res = file_put_contents($path, file_get_contents($path) . $datetime . $msg . PHP_EOL);
        if (!$res) {
            new WP_Error('Could not add line on' . $path);
        }
    }
}
