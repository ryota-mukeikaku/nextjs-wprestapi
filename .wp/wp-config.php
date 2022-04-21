<?php

require_once(__DIR__ . '/../composer/vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', $_ENV['MYSQL_DATABASE']);

/** Database username */
define('DB_USER',  $_ENV['MYSQL_USER']);

/** Database password */
define('DB_PASSWORD',  $_ENV['MYSQL_PASSWORD']);

/** Database hostname */
define('DB_HOST',  $_ENV['MYSQL_HOST']);

/** Database charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The database collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         $_ENV['WP_SALT_AUTH_KEY']);
define('SECURE_AUTH_KEY',  $_ENV['WP_SALT_SECURE_AUTH_KEY']);
define('LOGGED_IN_KEY',    $_ENV['WP_SALT_LOGGED_IN_KEY']);
define('NONCE_KEY',        $_ENV['WP_SALT_NONCE_KEY']);
define('AUTH_SALT',        $_ENV['WP_SALT_AUTH_SALT']);
define('SECURE_AUTH_SALT', $_ENV['WP_SALT_SECURE_AUTH_SALT']);
define('LOGGED_IN_SALT',   $_ENV['WP_SALT_LOGGED_IN_SALT']);
define('NONCE_SALT',       $_ENV['WP_SALT_NONCE_SALT']);

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = $_ENV['WP_DB_PREFIX'];

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define('WP_DEBUG', $_ENV['WP_DEBUG']);
define('WP_DEBUG_DISPLAY', $_ENV['WP_DEBUG_DISPLAY']);
define('WP_DEBUG_LOG', $_ENV['WP_DEBUG_LOG']);

define('WP_ENVIRONMENT_TYPE', $_ENV['WP_ENVIRONMENT_TYPE']);
define('WP_POST_REVISIONS', $_ENV['WP_POST_REVISIONS']);
define('WP_AUTO_UPDATE_CORE', $_ENV['WP_AUTO_UPDATE_CORE']);
define('WPLANG', $_ENV['WP_LANG']);

define('GOOGLE_MAPS_API_KEY', $_ENV['GOOGLE_MAPS_API_KEY']);

define('AWS_S3_UPLOADER_IAM_ACCESS_KEY_ID', $_ENV['AWS_S3_UPLOADER_IAM_ACCESS_KEY_ID']);
define('AWS_S3_UPLOADER_IAM_SECRET_ACCESS_KEY', $_ENV['AWS_S3_UPLOADER_IAM_SECRET_ACCESS_KEY']);
define('AWS_S3_UPLOAD_ROOT_PATH', $_ENV['AWS_S3_UPLOAD_ROOT_PATH']);
define('AWS_S3_IMAGE_URL', $_ENV['AWS_S3_IMAGE_URL']);
define('AWS_S3_BUCKET_REGION', $_ENV['AWS_S3_BUCKET_REGION']);
define('AWS_S3_BUCKET_NAME', $_ENV['AWS_S3_BUCKET_NAME']);

define('AWS_CLOUDFRONT_CACHE_CLEAR_IAM_ACCESS_KEY_ID', $_ENV['AWS_CLOUDFRONT_CACHE_CLEAR_IAM_ACCESS_KEY_ID']);
define('AWS_CLOUDFRONT_CACHE_CLEAR_IAM_SECRET_ACCESS_KEY', $_ENV['AWS_CLOUDFRONT_CACHE_CLEAR_IAM_SECRET_ACCESS_KEY']);
define('AWS_CLOUDFRONT_CACHE_CLEAR_CLIENT_VERSION', $_ENV['AWS_CLOUDFRONT_CACHE_CLEAR_CLIENT_VERSION']);
define('AWS_CLOUDFRONT_CACHE_CLEAR_REGION', $_ENV['AWS_CLOUDFRONT_CACHE_CLEAR_REGION']);
define('AWS_CLOUDFRONT_CACHE_CLEAR_DISTRIBUTION_ID', $_ENV['AWS_CLOUDFRONT_CACHE_CLEAR_DISTRIBUTION_ID']);

define('AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_IAM_ACCESS_KEY_ID', $_ENV['AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_IAM_ACCESS_KEY_ID']);
define('AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_IAM_SECRET_ACCESS_KEY', $_ENV['AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_IAM_SECRET_ACCESS_KEY']);
define('AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_CLIENT_VERSION', $_ENV['AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_CLIENT_VERSION']);
define('AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_REGION', $_ENV['AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_REGION']);
define('AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_DISTRIBUTION_NAME', $_ENV['AWS_LIGHT_SAIL_CDN_CACHE_CLEAR_DISTRIBUTION_NAME']);

define('GITHUB_APP_ID', $_ENV['GITHUB_APP_ID']);

if (in_array(WP_ENVIRONMENT_TYPE, ['production'])) { // Note: GithubActionRerunを実行する環境のみ
    define('GITHUB_APP_PRIVATE_KEY', file_get_contents($_ENV['GITHUB_APP_PEM']));
} else {
    define('GITHUB_APP_PRIVATE_KEY', $_ENV['GITHUB_APP_PEM']);
}

define('GITHUB_REPO_OWNER', $_ENV['GITHUB_REPO_OWNER']);
define('GITHUB_REPO_NAME', $_ENV['GITHUB_REPO_NAME']);

define('SLACK_INCOMMING_WEBHOOK', $_ENV['SLACK_INCOMMING_WEBHOOK']);

define('ACCESS_CONTROL_ALLOW_ORIGIN', $_ENV['ACCESS_CONTROL_ALLOW_ORIGIN']);

define('NEXT_PUBLIC_URL', $_ENV['NEXT_PUBLIC_URL']);
/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

define('FS_METHOD', 'direct');
/**
 * The WP_SITEURL and WP_HOME options are configured to access from any hostname or IP address.
 * If you want to access only from an specific domain, you can modify them. For example:
 *  define('WP_HOME','http://example.com');
 *  define('WP_SITEURL','http://example.com');
 *
 */

if (defined('WP_CLI')) {
    $_SERVER['HTTP_HOST'] = '127.0.0.1';
}

define('WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] . '/');
define('WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST'] . '/');
/* That's all, stop editing! Happy publishing. */


/** Absolute path to the WordPress directory. */

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}


/** Sets up WordPress vars and included files. */

require_once ABSPATH . 'wp-settings.php';
