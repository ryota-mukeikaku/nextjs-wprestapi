<?php

namespace Theme;

// Composerでfirebase/php-jwtをインストールしている必要があります
use Firebase\JWT\JWT;

use Theme\Notification;

class GithubActionsRerun
{
    private static $instance;
    private $privateKey = GITHUB_APP_PRIVATE_KEY;
    private $githubAppId = GITHUB_APP_ID;
    private $githubRepoOwner = GITHUB_REPO_OWNER;
    private $githubRepoName = GITHUB_REPO_NAME;
    private $jwt;

    private $notification;

    private function __construct()
    {
        $this->notification = Notification::init();
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new GithubActionsRerun();
        }
    }

    public function init_callback(): void
    {
        if (in_array(wp_get_environment_type(), ['production'])) {
            add_action('rerun_github_actions', [$this, 'rerun_github_actions']);

            // rerunダッシュボードウィジェットを追加
            add_action('wp_dashboard_setup', [$this, 'add_widget']);
        }
    }

    public function rerun_github_actions(): void
    {
        $this->notification->slack('github actions rerun is started');
        $this->jwt = $this->create_jwt();
        $this->rerun();
    }

    private function create_jwt(): string
    {
        $payload = array(
            'iat' => time() - 60,
            'exp' => time() + 600,
            'iss' => $this->githubAppId
        );
        return JWT::encode($payload, $this->privateKey, 'RS256');
    }

    private function curl(array $options): string
    {
        $options +=
            [
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_RETURNTRANSFER => true,
            ];
        $curl = curl_init();
        curl_setopt_array($curl, $options);
        $response = curl_exec($curl);
        $res = json_decode($response, true);
        curl_close($curl);
        return $res;
    }

    private function rerun(): void
    {
        $installations = $this->curl([
            CURLOPT_HTTPHEADER => ['User-Agent:Php/Automated', 'Authorization: Bearer ' . $this->jwt, 'Accept: application/vnd.github.v3+json'],
            CURLOPT_URL => 'https://api.github.com/app/installations',
        ]);

        $installations_id = $installations[0]['id'];

        $access_token = $this->curl([
            CURLOPT_HTTPHEADER => ['User-Agent:Php/Automated', 'Authorization: Bearer ' . $this->jwt, 'Accept: application/vnd.github.v3+json'],
            CURLOPT_URL => 'https://api.github.com/app/installations/' . $installations_id . '/access_tokens',
            CURLOPT_CUSTOMREQUEST => 'POST',
        ]);

        $token = $access_token['token'];

        $runs = $this->curl([
            CURLOPT_HTTPHEADER => ['User-Agent:Php/Automated', 'Authorization: token ' . $token, 'Accept: application/vnd.github.v3+json'],
            CURLOPT_URL => 'https://api.github.com/repos/' . $this->githubRepoOwner . '/' . $this->githubRepoName . '/actions/runs',
        ]);

        $leatest_run_id = $runs['workflow_runs'][0]['id'];

        $rerun_res = $this->curl([
            CURLOPT_HTTPHEADER => ['User-Agent:Php/Automated', 'Authorization: token ' . $token, 'Accept: application/vnd.github.v3+json'],
            CURLOPT_URL => 'https://api.github.com/repos/' . $this->githubRepoOwner . '/' . $this->githubRepoName . '/actions/runs/' . $leatest_run_id . '/rerun',
            CURLOPT_CUSTOMREQUEST => 'POST',
        ]);

        $this->notification->slack(json_encode($rerun_res));
    }

    public function add_widget(): void
    {
        wp_add_dashboard_widget('rerun-github-actions', 'Github Actions', [$this, 'custom_widget_callback']);
    }

    public function custom_widget_callback(): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['rerun_github_actions'])) {
            $this->rerun_github_actions();
        }
        echo <<< MSG_EOF
        <form action="" method="POST">
         <button class="button button-primary" name="rerun_github_actions" value="true">Github Actions Rerunを実行</button>
        </form>
        MSG_EOF;
    }
}
