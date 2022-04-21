<?php

namespace Theme;

class Notification
{
    private static $instance;

    private function __construct()
    {
    }

    public static function init(): Notification
    {
        if (!isset(self::$instance)) {
            self::$instance = new Notification();
        }
        return self::$instance;
    }

    public function slack(string $msg): void
    {
        $options =
            [
                CURLOPT_URL => SLACK_INCOMMING_WEBHOOK,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => http_build_query([
                    'payload' => json_encode(['text' => $msg])
                ]),
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_RETURNTRANSFER => true,
            ];
        $curl = curl_init();
        curl_setopt_array($curl, $options);
        $response = curl_exec($curl);
        $res = json_decode($response, true);
        curl_close($curl);
        return;
    }
}
