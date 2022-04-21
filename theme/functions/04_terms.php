<?php

function get_first_term(int $post_id, string $taxonomy = 'category'): array
{
    $terms = get_the_terms($post_id, $taxonomy);

    if (!empty($terms[0])) {
        return $terms[0];
    } else {
        return [];
    }
}

// 全親カテゴリのみ取得
function get_parent_taxonomies(string $taxonomy = 'category'): array
{
    $parent_taxonomy = [];
    $parent_datas = get_terms(
        $taxonomy,
        array(
            'fields' => 'all',
            'get' => 'all',
            'parent' => 0,
        )
    );
    if (!empty($parent_datas)) {
        foreach ($parent_datas as $key => $val) {
            $parent_taxonomy[$val->term_id] = $val;
        }
    }

    return $parent_taxonomy;
}
