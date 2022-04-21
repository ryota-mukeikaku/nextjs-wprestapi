<?php

namespace Theme;

use WP_Post;
use WP_Post_Type;
use WP_Taxonomy;

class RestBreadcrumbs
{
    private static $instance;
    private $rtn = [];

    private function __construct()
    {
        $this->rtn = [
            [
                'title' =>  NAME_HOME,
                'url' => '/'
            ]
        ];
    }

    public static function init(): RestBreadcrumbs
    {
        if (!isset(self::$instance)) {
            self::$instance = new RestBreadcrumbs();
        }
        return self::$instance;
    }

    public function single(WP_Post $post): array
    {
        $post_type_obj = get_post_type_object($post->post_type);
        if ($post->post_type !== 'post') {
            $this->rtn[] = [
                'title' => $post_type_obj->label,
                'url' => '/' . $post->post_type . '/'
            ];
            $this->rtn[] = [
                'title' => $post->post_title,
                'url' => '/' . $post->post_type . '/' . $post->ID . '/',
            ];
        } else {
            $this->rtn[] = [
                'title' => $post_type_obj->label,
                'url' => '/page/1/'
            ];
            $this->rtn[] = [
                'title' => $post->post_title,
                'url' => '/' . $post->ID . '/',
            ];
        }
        return $this->rtn;
    }
    public function archive_post_type(WP_Post_Type $post_type_obj): array
    {
        $this->rtn[] = [
            'title' => $post_type_obj->label,
            'url' => ($post_type_obj->name === 'post') ? '/page/1/' : '/' . $post_type_obj->name . '/'
        ];
        return $this->rtn;
    }
    public function archive_taxonomy(WP_Taxonomy $taxonomy_obj): array
    {
        $post_types = get_post_types(['_builtin' => false]);
        $post_types['post'] = 'post';
        $matched_post_type = '';
        foreach ($post_types as $post_type) {
            if (is_object_in_taxonomy($post_type, $taxonomy_obj->taxonomy)) {
                $matched_post_type = $post_type;
                break;
            }
        }
        if (!empty($matched_post_type)) {
            $post_type_obj = get_post_type_object($matched_post_type);
            $this->rtn[] = [
                'title' => $post_type_obj->label,
                'url' => ($post_type_obj->name === 'post') ? '/page/1/' : '/' . $post_type_obj->name . '/'
            ];
            $this->rtn[] = [
                'title' => $taxonomy_obj->name,
                'url' => ($post_type_obj->name === 'post') ? '/' . $taxonomy_obj->taxonomy . '/' . $taxonomy_obj->slug . '/' : '/' . $post_type_obj->name . '/' . $taxonomy_obj->taxonomy . '/' . $taxonomy_obj->slug . '/'
            ];
        } else {
            $this->rtn[] = [
                'title' => $taxonomy_obj->label,
                'url' => '/' . $taxonomy_obj->taxonomy . '/' . $taxonomy_obj->slug . '/'
            ];
        }
        return $this->rtn;
    }
}
