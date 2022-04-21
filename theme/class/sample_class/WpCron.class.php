<?php

namespace Theme;

class WpCron
{
    private static $instance;
    private static $action;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new WpCron();
        }
    }

    public function init_callback(): void
    {
        // DBの変更をトリガーにwp-cronにアクションを渡す

        // Note: CroundFrontCacheClear.phpをclassディレクトリに含める必要があります
        // $this->que_action_when_db_changed('clear_cloudfront_cache');

        // Note: LightSailCdnCacheClear.phpをclassディレクトリに含める必要があります
        // $this->que_action_when_db_changed('clear_lightsail_cdn_cache');

        // Note: GithubActionsRerun.phpをclassディレクトリに含める必要があります（SSGなどのビルドが走り、なおかつオリジンとしてのWPにCDNのキャッシュが適用されている場合は、CI/CDの中でCDNのキャッシュをクリアした方が安全かもしれません
        // $this->que_action_when_db_changed('rerun_github_actions');
    }

    public function que_action_when_db_changed(string $action): void
    {
        self::$action = $action;
        add_action('updated_option', [$this, 'check_option_key_before_set_action'], 10);
        add_action('transition_post_status', [$this, 'set_action'], 10);
        add_action('created_term', [$this, 'set_action']);
        add_action('edited_terms', [$this, 'set_action']);
        add_action('delete_terms', [$this, 'set_action']);
    }

    public function check_option_key_before_set_action(array $option): void
    {
        if (!in_array($option, ['cron'])) { // Note: 場合によっては他に影響するキーがある可能性があります。その場合、cronの実行がloopする可能性があるため注意が必要です。
            $this->set_action();
        }
    }

    public function set_action(): void
    {
        $next = wp_next_scheduled(self::$action);
        if ($next) {
            // 同一アクションが登録されている場合は破棄する
            wp_unschedule_event($next, self::$action);
        }

        // actionが発火するまでのdelay
        $delay = ((ceil(date('i') / 10) * 10) + 10) * 60;
        wp_schedule_single_event(strtotime(date('Y-m-d H:') . '00:00') + $delay, self::$action);
    }
}
