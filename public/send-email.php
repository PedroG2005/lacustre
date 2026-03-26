<?php
/**
 * PHP Bridge para envio de e-mail via SMTP no cPanel (Next.js Static Export)
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// 1. Receber Dados
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
    exit;
}

$name  = $input['name'] ?? '';
$email = $input['email'] ?? '';
$phone = $input['phone'] ?? '';
$recaptchaToken = $input['g-recaptcha-response'] ?? '';

if (!$name || !$email || !$phone) {
    echo json_encode(['success' => false, 'error' => 'Por favor, preencha todos os campos.']);
    exit;
}

// 2. Validar reCAPTCHA
$recaptchaSecret = "6LfVXpUsAAAAAJlvO9lEX93oI41G7sObIMWiKobQ";
if ($recaptchaSecret && $recaptchaToken) {
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret'   => $recaptchaSecret,
        'response' => $recaptchaToken
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        echo json_encode(['success' => false, 'error' => 'Erro de conexão com Google: ' . $curl_error]);
        exit;
    }

    $responseData = json_decode($response);
    if (!$responseData || !$responseData->success) {
        echo json_encode(['success' => false, 'error' => 'Falha na validação do reCAPTCHA. Verifique suas chaves.']);
        exit;
    }
}

// 3. Configurações de SMTP do seu cPanel
$smtp_host = "lacustre.com.br";
$smtp_port = 465;
$smtp_user = "site@lacustre.com.br"; 
$smtp_pass = "Dubbox@2026";        
$to        = "comercial@lacustre.com.br"; 

// 4. Montar o E-mail (HTML)
$subject = "Nova Solicitação de Proposta: $name";
$message = "
<html>
<body style='font-family: sans-serif; padding: 20px; background-color: #f4f4f5;'>
    <div style='background: #fff; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;'>
        <h2 style='color: #1a2e1a;'>Nova Proposta Solicitada</h2>
        <p><b>Nome:</b> $name</p>
        <p><b>E-mail:</b> $email</p>
        <p><b>Telefone:</b> $phone</p>
        <hr style='border: 0; border-top: 1px solid #eee;'>
        <p style='font-size: 12px; color: #666;'>Enviado via Landing Page Lacustre Hall (cPanel Bridge)</p>
    </div>
</body>
</html>
";

$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Site Lacustre <$smtp_user>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// 5. Enviar usando a função mail() do PHP. No cPanel, ela usa o SMTP local automaticamente.
// NOTA: Se preferir SMTP autenticado rigoroso, use PHPMailer (mas mail() costuma funcionar no cPanel).
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Houve um problema no servidor de e-mail do cPanel.']);
}
?>
