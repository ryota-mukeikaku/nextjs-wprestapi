<?php

function is_blank(?bool $bool = true): string
{
    return ($bool) ? ' target="_blank" rel="noopener noreferrer"' : '';
}

function is_current(?bool $bool = false): string
{
    return ($bool) ? ' is-current' : '';
}

// モディファイヤークラスを付与（第二引数は配列で複数可）
function get_modified_class(string $class_name, $modifier): string
{
    $rtn = '';
    if (!empty($modifier)) {
        if (!is_array($modifier)) {
            $rtn = ' ' . $class_name . '--' . $modifier;
        } else {
            foreach ($modifier as $m) $rtn .= ' ' . $class_name . '--' . $m;
        }
    }
    return $class_name . $rtn;
}

//
function get_additional_class($addtional): string
{
    $rtn = '';
    if (!empty($addtional)) {
        if (!is_array($addtional)) {
            $rtn = ' ' . $addtional;
        } else {
            foreach ($addtional as $a) $rtn .= ' ' . $a;
        }
    }
    return $rtn;
}
