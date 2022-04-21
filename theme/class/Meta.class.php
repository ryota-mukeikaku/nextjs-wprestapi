<?php

namespace Theme;

class Meta
{
    public $opt = [];
    public $title = '';
    public $label = '';
    function __construct()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['meta_submit'])) {
            $opt = [];
            foreach ($_POST as $k => $v) {
                if (strpos($k, 'theme_meta') !== 0) {
                    continue;
                }
                $opt[$k] = htmlentities($v, ENT_QUOTES, 'UTF-8');
            }
            update_option("theme_meta", $opt);
        }
        $this->opt = get_option("theme_meta");
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_print_scripts', function () {
            wp_enqueue_media();
        });
    }
    private function get(?string $name): string
    {
        if (defined('THEME_META_' . strtoupper(preg_replace('/-/', '_', $name)))) {
            return constant('THEME_META_' . strtoupper(preg_replace('/-/', '_', $name)));
        }
        return !empty($this->opt['theme_meta_' . $name]) ? $this->opt['theme_meta_' . $name] : '';
    }
    private function placeholder(?string $title): string
    {
        return (preg_replace(['/%site_name%/', '/%title%/', '/%label%/'], [$this->get('site_name'), $this->title, $this->label], $title));
    }
    private function comparison(array $meta, ?string $key): array
    {
        $title = $this->get($key . '_title');
        $description = $this->get($key . '_description');
        $meta['title'] = (empty($title) || $title === '%default%') ? $meta['title'] : $this->placeholder($title);
        $meta['description'] = (empty($description) || $title === '%default%') ? $meta['description'] : $this->placeholder($description);
        return $meta;
    }
    public function get_metaset(string $mode, ?array $args = []): array
    {
        $rtn = [
            'siteName' => $this->get('site_name'),
            'title' => $this->get('site_name'),
            'description' => $this->get('default_description'),
            'ogType' => 'article',
            'ogImage' => $this->get('default_ogimage'),
            'twitter' => $this->get('twitter')
        ];
        if ($mode === 'home') {
            $rtn = $this->comparison($rtn, 'home');
            $rtn['ogType'] = 'website';
        }
        if ($mode === 'single') {
            $this->title = $args['title'];
            $rtn = $this->comparison($rtn, 'default_single');
            $rtn = $this->comparison($rtn, 'post_type_' . $args['post_type'] . '_single');
            $thumb = get_post_thumbnail_id($args['id']);
            if (!empty($thumb)) {
                $rtn['ogImage'] = wp_get_attachment_image_src($thumb, 'full')[0];
            }
        }
        if ($mode === 'archive') {
            $this->label = $args['label'];
            $rtn = $this->comparison($rtn, 'default_archive');
            $rtn = $this->comparison($rtn, 'post_type_' . $args['post_type'] . '_archive');
            $rtn['ogType'] = 'website';
        }
        if ($mode === 'taxonomy') {
            $this->label = $args['label'];
            $rtn = $this->comparison($rtn, 'default_archive');
            $rtn = $this->comparison($rtn, 'taxonomy_' . $args['taxonomy']);
            $rtn['ogType'] = 'website';
        }
        if ($mode === 'search') {
            $this->label = $args['label'];
            $rtn = $this->comparison($rtn, 'default_archive');
            $rtn = $this->comparison($rtn, 'search');
            $rtn['ogType'] = 'website';
        }
        if (!empty($args['description'])) {
            $rtn['description'] = $args['description'];
        }
        return $rtn;
    }
    function admin_menu(): void
    {
        add_menu_page('メタ設定', 'メタ設定', 'manage_options', 'meta-settings', [$this, 'settings_page']);
    }
    function  settings_page(): void
    {
        $initial = '';
        foreach ([
            ['label' => 'サイト名', 'key' => 'site_name', 'placeholder' => 'サイト名'],
            ['label' => '詳細・固定ページタイトル', 'key' => 'default_single_title', 'placeholder' => '%title% | %site_name%'],
            ['label' => '一覧ページタイトル', 'key' => 'default_archive_title', 'placeholder' => '%label% | %site_name%'],
            ['label' => '検索結果ページタイトル', 'key' => 'search_title', 'placeholder' => '「%search%」の検索結果 | %site_name%'],
            ['label' => 'description', 'key' => 'default_description', 'placeholder' => '', 'textarea' => 'true'],
            ['label' => 'twitterアカウント', 'key' => 'twitter', 'placeholder' => '@twitter'],
        ] as $s) {
            $initial .= $this->input($s);
        }
        $home = $this->input(
            ['label' => 'タイトル', 'key' => 'home_title', 'placeholder' => '%site_name%'],
        ) . $this->input(
            ['label' => 'description', 'key' => 'home_description', 'placeholder' => '%default%', 'textarea' => 'true'],
        );;

        $post_types = '';
        foreach (get_post_types([
            'public'   => true,
            '_builtin' => true
        ]) as $pt) {
            $obj = get_post_type_object($pt);
            $post_types .= $this->input(
                ['label' => '【' . $obj->label . '】<br />詳細ページ<br />タイトル', 'key' => 'post_type_' . $pt . '_single_title', 'placeholder' => '%default%']
            );
            $post_types .= $this->input(
                ['label' => '【' . $obj->label . '】<br />詳細ページ<br />description', 'key' => 'post_type_' . $pt . '_single_description', 'placeholder' => '%default%', 'textarea' => 'true'],
            );
            if (!in_array($pt, ['page', 'attachment'])) {
                $post_types .= $this->input(
                    ['label' => '【' . $obj->label . '】<br />一覧ページ<br />タイトル', 'key' => 'post_type_' . $pt . '_archive_title', 'placeholder' => '%default%']
                );
                $post_types .= $this->input(
                    ['label' => '【' . $obj->label . '】<br />一覧ページ<br />description', 'key' => 'post_type_' . $pt . '_archive_description', 'placeholder' => '%default%', 'textarea' => 'true'],
                );
            }
        };
        $taxonomies = '';
        $all_taxonomies = get_taxonomies(['public' => true], 'objects');
        foreach ($all_taxonomies as $t) {
            $taxonomies .= $this->input(
                ['label' => '【' . $t->label . '】<br />タイトル', 'key' => 'taxonomy_' . $t->name . '_title', 'placeholder' => '%default%']
            ) .
                $this->input(
                    ['label' => '【' . $t->label . '】<br />description', 'key' => 'taxonomy_' . $t->name . '_description', 'placeholder' => '%default%', 'textarea' => 'true'],
                );
        }
        $ogp = empty($this->opt['theme_meta_default_ogimage']) ? '' : $this->opt['theme_meta_default_ogimage'];
        echo <<<EOF
        <style>#wpcontent {padding-left:0;}</style>
        <div style="text-align:center; padding: 30px; background: white;">
            <h1>メタ設定</h1>
        </div>
        <div>
        <form method="POSt">
            <div style="max-width: 880px; margin: 0 auto; padding: 60px 40px 0;">
                <h2>共通設定（値は%default%に代入されます）</h2>
                <table class="form-table" role="presentation">
                <tbody>
                {$initial}
                <tr>
                    <th scope="row">OGP画像</th>
                    <td>{$this->uploader('theme_meta_default_ogimage',$ogp)}</td>
                </tr>
                </tbody></table>
            </div>
            <div style="max-width: 880px; margin: 0 auto; padding: 60px 40px 0;">
                <h2>トップページ</h2>
                <table class="form-table" role="presentation">
                <tbody>
                {$home}
                </tbody></table>
            </div>
            <div style="max-width: 880px; margin: 0 auto; padding: 60px 40px 0;">
                <h2>投稿タイプ</h2>
                <table class="form-table" role="presentation">
                <tbody>
                {$post_types}
                </tbody></table>
            </div>
            <div style="max-width: 880px; margin: 0 auto; padding: 60px 40px 0;">
                <h2>タクソノミー</h2>
                <table class="form-table" role="presentation">
                <tbody>
                {$taxonomies}
                </tbody></table>
            </div>
            <div style="max-width: 880px; margin: 0 auto; padding: 30px 40px 60px;">
            <input type="submit" name="meta_submit" id="set-page" class="button button-primary" value="保存する">
            </form>
        </div>
        EOF;
    }
    function input(array $args): string
    {
        $value = empty($this->opt['theme_meta_' . $args['key']]) ? '' : $this->opt['theme_meta_' . $args['key']];
        if (defined('THEME_META_' . strtoupper(preg_replace('/-/', '_', $args['key'])))) {
            $input = constant('THEME_META_' . strtoupper(preg_replace('/-/', '_', $args['key'])));
        } elseif (!empty($args['textarea'])) {
            $input = '<textarea name="theme_meta_' . $args['key'] . '" placeholder="' . $args['placeholder'] . '" class="regular-text code" rows="4">' . $value . '</textarea>';
        } else {
            $input = '<input name="theme_meta_' . $args['key'] . '" type="text" value="' . $value . '" placeholder="' . $args['placeholder'] . '" class="regular-text code"> ';
        }
        return <<<EOF
        <tr>
            <th scope="row">{$args['label']}</th>
            <td>{$input}</td>
        </tr>
        EOF;
    }

    function uploader(string $name, string $value): string
    {
        $image = empty($value) ? '' : '<img src="' . $value . '" alt="選択中の画像" style="max-width: 100%;height:auto;">';
        return <<<EOF
        <input name="{$name}" type="text" value="{$value}" />
        <input type="button" name="{$name}_slect" value="選択" />
        <input type="button" name="{$name}_clear" value="クリア" />
        <div id="{$name}_thumbnail" class="uploded-thumbnail" style="max-width:300px; margin-top:10px;">
        {$image}
        </div>
        <script type="text/javascript">
            (function($) {
                const input = document.querySelector('input[name="{$name}"]');
                var custom_uploader;
                $("input:button[name={$name}_slect]").click(function(e) {
                    e.preventDefault();
                    if (custom_uploader) {
                        custom_uploader.open();
                        return;
                    }
                    custom_uploader = wp.media({
                        title: "画像を選択してください",
                        library: {
                            type: "image"
                        },
                        button: {
                            text: "画像の選択"
                        },
                        multiple: false
                    });
                    custom_uploader.on("select", function() {
                        var images = custom_uploader.state().get("selection");
                        images.each(function(file) {
                            input.setAttribute('value',file.attributes.sizes.full.url);
                            $("#{$name}_thumbnail").empty();
                            $("#{$name}_thumbnail").append('<img src="' + file.attributes.sizes.full.url + '"  style="max-width: 100%;height:auto;"/>');
                        });
                    });
                    custom_uploader.open();
                });
                $("input:button[name={$name}_clear]").click(function() {
                    $("input:text[name={$name}]").val("");
                    $("#{$name}_thumbnail").empty();
                });
            })(jQuery);
        </script>
        EOF;
    }
}
