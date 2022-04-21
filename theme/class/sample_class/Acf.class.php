<?php

namespace Theme;

class Acf
{
    private static $instance;

    private function __construct()
    {
        if (defined('ACF')) {
            add_filter('init', [$this, 'init_callback']);
        }
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new Acf();
        }
    }

    public function init_callback(): void
    {
        // ローカル環境でACFの設定をphpファイルにエクスポート
        // $this->export_acf_settings();

        // ローカル以外の環境でエクスポートされた設定ファイルを読み込む
        // $this->import_acf_settings();

        // ローカル以外の環境でACFの設定ページ動線をサイドバーに表示させない
        // add_action('admin_menu', [$this, 'remove_acf_setting_page'], 999);

        // 設定ページ作成
        // add_action('acf/init', [$this, 'display_acf_option_page']);

        // 設定サブページ作成
        // add_action('acf/init', [$this, 'display_acf_option_sub_page']);

        // Google Maps API Key設定
        // add_filter('acf/fields/google_map/api', 'set_google_map_api');

        // タクソノミーの選択肢をフィルター
        // add_filter('acf/fields/taxonomy/query/name={nameを設定}', [$this, 'filter_taxonomy_query'], 10, 3);

        // 関連の選択肢をフィルター
        // add_filter('acf/fields/relationship/query/name={nameを設定}', [$this, 'filter_relationship_query'], 10, 3);
    }

    public function display_acf_option_page(): void
    {

        if (function_exists('acf_add_options_page')) {
            acf_add_options_page(
                [
                    'page_title' => 'サイト設定',
                    'menu_title' => 'サイト設定',
                    'menu_slug' => 'acf-options'
                ]
            );
        }
    }

    public function display_acf_option_sub_page(): void
    {
        if (function_exists('acf_add_options_sub_page')) {
            acf_add_options_sub_page(
                [
                    'page_title' => 'サブページ',
                    'menu_title' => 'サブページ',
                    'parent_slug' => 'acf-options',
                ]
            );
        }
    }

    public function set_google_map_api(array $api): array
    {
        $api['key'] = GOOGLE_MAPS_API_KEY;
        return $api;
    }

    // 親カテゴリだけをcount順に抽出するサンプル
    public function filter_taxonomy_query(array $args, array $field, int $post_id)
    {
        $cat = get_category($post_id);
        if ($cat->parent != 0) {
            return;
        }

        $args['parent'] = $cat->term_id;
        $args['orderby'] = 'count';
        $args['order'] = 'DESC';

        return $args;
    }

    // 一回のロード件数を40件にサンプル
    public function filter_relationship_query(array $args, array $field, int $post_id): array
    {
        $args['posts_per_page'] = 40;

        return $args;
    }

    public function export_acf_settings(): void
    {
        if (wp_get_environment_type() === 'local' && is_writable(STYLESHEETPATH . '/functions/libs')) {
            add_action('acf/update_field_group', [$this, 'export']);
            add_action('acf/untrash_field_group', [$this, 'export']);
            add_action('acf/trash_field_group', [$this, 'export']);
            add_action('acf/delete_field_group', [$this, 'export']);
            add_action('acf/include_fields', [$this, 'export']);
        }
    }

    public function import_acf_settings(): void
    {
        if (wp_get_environment_type() !== 'local' && file_exists(STYLESHEETPATH . '/functions/libs/exported_acf_settings.php')) {
            require_once(STYLESHEETPATH . '/functions/libs/exported_acf_settings.php');
        }
    }

    public function export(): ?bool
    {

        $selected = [];

        /**
         * quote from
         * class-acf-admin-tool-export.php
         * function html_field_selection()
         */
        $field_groups = acf_get_field_groups();
        // loop
        if ($field_groups) {
            foreach ($field_groups as $field_group) {
                //modified
                $selected[] = esc_html($field_group['key']);
            }
        }

        /**
         * quote from
         * class-acf-admin-tool-export.php
         * function get_selected
         */
        $json = array();

        // bail early if no keys
        if (!$selected) return false;


        // construct JSON
        foreach ($selected as $key) {

            // load field group
            $field_group = acf_get_field_group($key);


            // validate field group
            if (empty($field_group)) continue;


            // load fields
            $field_group['fields'] = acf_get_fields($field_group);


            // prepare for export
            $field_group = acf_prepare_field_group_for_export($field_group);


            // add to json array
            $json[] = $field_group;
        }


        /**
         * quote from
         * class-acf-admin-tool-export.php
         * function html_generate
         */

        $str_replace = array(
            "  " => "\t",
            "'!!__(!!\'" => "__('",
            "!!\', !!\'" => "', '",
            "!!\')!!'" => "')",
            "array (" => "array("
        );
        $preg_replace = array(
            '/([\t\r\n]+?)array/' => 'array',
            '/[0-9]+ => array/' => 'array'
        );

        // add condition local or not
        $data = "<?php if( wp_get_environment_type() !== 'local' && function_exists('acf_add_local_field_group') ):" . "\r\n" . "\r\n";

        foreach ($json as $field_group) {

            // code
            $code = var_export($field_group, true);


            // change double spaces to tabs
            $code = str_replace(array_keys($str_replace), array_values($str_replace), $code);


            // correctly formats "=> array("
            $code = preg_replace(array_keys($preg_replace), array_values($preg_replace), $code);


            // echo
            $data .= "acf_add_local_field_group({$code});" . "\r\n" . "\r\n";
        }

        $data .= "endif;";

        file_put_contents(STYLESHEETPATH . '/functions/libs/exported_acf_settings.php', $data);
    }

    function remove_acf_setting_page(): void
    {
        remove_menu_page('edit.php?post_type=acf-field-group');
    }
}
