<?php

namespace Theme;

// Note: Composerでaws/aws-sdk-phpがインストールされている必要があります
use Aws\S3\S3Client;

class UploadToS3
{
    private static $instance;

    private function __construct()
    {
        add_filter('init', [$this, 'init_callback']);
    }

    public static function init(): void
    {
        if (!isset(self::$instance)) {
            self::$instance = new UploadToS3();
        }
    }

    public function init_callback(): void
    {
        // アップロード時にS3にアップロード
        add_filter('wp_handle_upload', [$this, 'upload_to_s3']);

        // アタッチメント登録時にguidを変更
        add_filter('wp_insert_attachment_data', [$this, 'replace_guid'], '99');

        // メディアのパスを変更
        add_filter('upload_dir', function (array $uploads): array {
            $uploads['url'] = AWS_S3_IMAGE_URL . $uploads["subdir"];
            $uploads['baseurl'] = AWS_S3_IMAGE_URL;
            return $uploads;
        }, 1);
    }

    public function replace_guid(array $data): array
    {
        $data['guid'] = preg_replace('/' . preg_quote(wp_upload_dir()['baseurl'], '/') . '/', '', $data['guid']);
        return $data;
    }

    public function upload_to_s3(array $upload): array
    {
        $s3client = new S3Client([
            'credentials' => [
                'key' => AWS_S3_UPLOADER_IAM_ACCESS_KEY_ID,
                'secret' => AWS_S3_UPLOADER_IAM_SECRET_ACCESS_KEY,
            ],
            'region' => AWS_S3_BUCKET_REGION,
            'version' => 'latest',
        ]);

        $result = $s3client->putObject([
            'Bucket' => AWS_S3_BUCKET_NAME,
            'Key' => preg_replace('/^.+?wp-content\/uploads\//', AWS_S3_UPLOAD_ROOT_PATH, $upload['file']),
            'SourceFile' => $upload['file'],
            'Body' => $upload['file'],
            'ContentType' => mime_content_type($upload['file']),
        ]);

        return $upload;
    }
}
