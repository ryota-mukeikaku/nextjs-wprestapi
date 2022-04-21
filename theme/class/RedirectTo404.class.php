<?php

namespace Theme;

class RedirectTo404
{
    private static $instance;

    private function __construct()
    {
        // trueを404にする
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init()
    {
        if (!isset(self::$instance)) {
            self::$instance = new RedirectTo404();
        }
    }

    public function init_callback(): void
    {
        add_action('template_redirect', [$this, 'blacklist_404']);

        // 念の為、埋め込み・アタッチメント・トラックバック・ユーザー登録画面のリライトルールを削除する
        add_filter('rewrite_rules_array', [$this, 'delete_unnecessary_rewrite_rules']);
    }

    public function blacklist_404(): void
    {
        global $wp_query;
        switch (true) {
                #case is_post_type_archive('post_type_name'):
                #case is_tax('tax_name'):
                #case is_category():
                #case is_tag():
            case is_search(): // 検索結果ページ
            case is_date(): // 日付アーカイブ
            case is_feed(): // フィード
            case is_attachment(): // アタッチメントページ
            case is_trackback(): // トラックバック
            case is_embed(): // 埋め込み
            case is_author(): // 著者ページ
                $wp_query->set_404();
                status_header(404);
                break;
        }
    }

    public function delete_unnecessary_rewrite_rules(array $rules): array
    {
        foreach ($rules as $k => $rule) if (preg_match('/(embed=true|attachment=|tb=1|register=true)/', $rule)) unset($rules[$k]);
        return $rules;
    }
}
