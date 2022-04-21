<?php

function is_local(): bool
{
    return wp_get_environment_type() === 'local';
}

function is_development(): bool
{
    return wp_get_environment_type() === 'development';
}

function is_staging(): bool
{
    return wp_get_environment_type() === 'staging';
}

function is_production(): bool
{
    return wp_get_environment_type() === 'production';
}
