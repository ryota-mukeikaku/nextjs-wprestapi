<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once(__DIR__ . '/../../composer/vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();


header('Access-Control-Allow-Origin: ' . preg_replace('/\/$/', '', $_ENV['NEXT_PUBLIC_URL']));
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

if (
    $_SERVER['REQUEST_METHOD'] !== "POST" ||
    $_SERVER['HTTP_ORIGIN'] !== preg_replace('/\/$/', '', $_ENV['NEXT_PUBLIC_URL'])
) {
    send_status(401);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw);


if (empty($data->token)) {
    send_status(401);
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('secret' => $_ENV['GOOGLE_RECAPTCHA_SECRET_KEY'], 'response' => $data->token)));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
$arrResponse = json_decode($response, true);

if ($arrResponse["success"] != '1' || $arrResponse["score"] <= 0.5) {
    send_status(401);
}

// 文字エンコードを指定
mb_language('uni');
mb_internal_encoding('UTF-8');

// インスタンスを生成（true指定で例外を有効化）
$mail = new PHPMailer(true);

// 文字エンコードを指定
$mail->CharSet = 'utf-8';

try {
    // デバッグ設定

    // SMTPサーバの設定
    $mail->isSMTP();                          // SMTPの使用宣言
    $mail->Host       = $_ENV['SMTP_HOST'];   // SMTPサーバーを指定
    $mail->SMTPAuth   = true;                 // SMTP authenticationを有効化
    $mail->Username   = $_ENV['SMTP_USER'];   // SMTPサーバーのユーザ名
    $mail->Password   = $_ENV['SMTP_PASSWORD'];           // SMTPサーバーのパスワード
    $mail->SMTPSecure = $_ENV['SMTP_SECURE'];  // 暗号化を有効（tls or ssl）無効の場合はfalse
    $mail->Port       = $_ENV['SMTP_PORT']; // TCPポートを指定（tlsの場合は465や587）

    // 送受信先設定（第二引数は省略可）
    $mail->setFrom($_ENV['ADMIN_EMAIL_FROM_ADDRESS'], $_ENV['ADMIN_EMAIL_FROM_NAME']); // 送信者
    $mail->addAddress($_ENV['ADMIN_EMAIL_FROM_ADDRESS'], $_ENV['ADMIN_EMAIL_FROM_NAME']);   // 宛先
    $mail->addReplyTo($_ENV['ADMIN_EMAIL_FROM_ADDRESS'], $_ENV['ADMIN_EMAIL_FROM_NAME']); // 返信先
    $mail->Sender = $_ENV['ADMIN_EMAIL_FROM_ADDRESS']; // Return-path

    // 送信内容設定
    $mail->Subject = '件名';
    $mail->Body    = 'メッセージ本文';

    // 送信
    $mail->send();
} catch (Exception $e) {
    send_status(500);
}

try {
    // デバッグ設定

    // SMTPサーバの設定
    $mail->isSMTP();                          // SMTPの使用宣言
    $mail->Host       = $_ENV['SMTP_HOST'];   // SMTPサーバーを指定
    $mail->SMTPAuth   = true;                 // SMTP authenticationを有効化
    $mail->Username   = $_ENV['SMTP_USER'];   // SMTPサーバーのユーザ名
    $mail->Password   = $_ENV['SMTP_PASSWORD'];           // SMTPサーバーのパスワード
    $mail->SMTPSecure = $_ENV['SMTP_SECURE'];  // 暗号化を有効（tls or ssl）無効の場合はfalse
    $mail->Port       = $_ENV['SMTP_PORT']; // TCPポートを指定（tlsの場合は465や587）

    // 送受信先設定（第二引数は省略可）
    $mail->setFrom($_ENV['ADMIN_EMAIL_FROM_ADDRESS'], $_ENV['ADMIN_EMAIL_FROM_NAME']); // 送信者
    $mail->addAddress($_ENV['ADMIN_EMAIL_FROM_ADDRESS'], $_ENV['ADMIN_EMAIL_FROM_NAME']);   // 宛先
    $mail->addReplyTo($_ENV['ADMIN_EMAIL_FROM_ADDRESS'], $_ENV['ADMIN_EMAIL_FROM_NAME']); // 返信先
    $mail->Sender = $_ENV['ADMIN_EMAIL_FROM_ADDRESS']; // Return-path

    // 送信内容設定
    $mail->Subject = '件名';
    $mail->Body    = 'メッセージ本文';

    // 送信
    $mail->send();
} catch (Exception $e) {
    send_status(500);
}

send_status(200);

function send_status($no)
{
    header("Content-Type: application/json; charset=utf-8");
    http_response_code($no);
    echo json_encode(['status' => $no]);
    exit();
}
