<?php

namespace Theme;

use WP_Query;

class Pagination
{
    private static $instance;
    private static $pages;
    private static $paged;
    private static $mode;
    private static $slug;
    private static $range;
    private static $add_first_and_last;

    private function __construct()
    {
        // do nothing
    }

    public static function init(?WP_Query $query = null, ?string $mode = null, ?string $slug = null, int $range = 2, bool $add_first_and_last = false): Pagination
    {
        if (!isset(self::$instance)) {
            $query = !empty($query) ? $query : $GLOBALS['wp_query'];
            self::$paged = (empty($query->query_vars['paged'])) ? 1 : (int)$query->query_vars['paged'];
            self::$pages = (int)$query->max_num_pages;
            self::$mode = $mode;
            self::$slug = $slug;
            self::$range = $range;
            self::$add_first_and_last = $add_first_and_last;
            self::$instance = new Pagination();
        }
        return self::$instance;
    }

    public function get_pagination_array(): ?array
    {
        if (self::$pages <= 1) return null;

        $prev = (self::$paged !== 1) ? self::$paged - 1 : false;
        $next = (self::$paged !== self::$pages) ? self::$paged + 1 : false;

        $numbers = $this->get_pagination_numbers();

        if (self::$add_first_and_last) {
            $numbers[] = 1;
            $numbers[] = self::$pages;
            $numbers = array_unique($numbers);
            sort($numbers);
        }

        $rtn = [
            'prev' => $prev,
            'next' => $next,
            'current' => self::$paged,
            'numbers' => $numbers,
            'mode' => self::$mode,
            'slug' => self::$slug
        ];
        return $rtn;
    }

    private function get_pagination_numbers(): array
    {
        $rtn = [];
        $min_number = self::$range * 2 + 1;
        for ($i = max(1, self::$paged - self::$range); $i <= min(self::$pages, self::$paged + self::$range); $i++) $rtn[] = $i;
        if (count($rtn) >= $min_number) return $rtn;

        if ($rtn[0] === 1) {
            for ($i = count($rtn) + 1; $i <= min(self::$pages, $min_number); $i++) $rtn[] = $i;
        } else {
            for ($i = $rtn[0] - 1; $i >= max(1, self::$pages - $min_number + 1); $i--) $rtn[] = $i;
            sort($rtn);
        }
        return $rtn;
    }
}
