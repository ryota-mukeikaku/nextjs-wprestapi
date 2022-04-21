<?php
function xss(?string $str = null): ?string
{
    return htmlentities($str, ENT_QUOTES, 'UTF-8');
}
