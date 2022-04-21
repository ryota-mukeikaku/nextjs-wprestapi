<?php
foreach (glob(STYLESHEETPATH . '/functions/*.php') as $file) {
    require_once $file;
}

class ClassLoader
{
    private $dir;
    public function __construct($dir)
    {
        $this->dir = $dir;
    }
    public function register()
    {
        spl_autoload_register([$this, 'loadClass']);
    }
    public function loadClass($class)
    {
        $file = $this->dir . '/' . str_replace('Theme\\', '', $class) . '.class.php';
        if (is_readable($file)) {
            require_once $file;
            return true;
        }
    }
}

$loader = new ClassLoader(STYLESHEETPATH . '/class');
$loader->register();

Theme\Comments::init();
Theme\Constants::init();
Theme\Dashbord::init();
Theme\Frontend::init();
Theme\Gutenberg::init();
Theme\Log::init();
Theme\Media::init();
Theme\PostTypeTaxonomy::init();
Theme\QueryHooks::init();
Theme\RedirectTo404::init();
Theme\RestApi::init();
Theme\Security::init();
Theme\WpHead::init();

// Theme\Acf::init();
// Theme\CloudFrontCacheClear::init();
// Theme\GithubActionsRerun::init();
// Theme\LightSailCdnCacheClear::init();
// Theme\UploadToS3::init();
// Theme\WpCron::init();
// Theme\Yoast::init();
