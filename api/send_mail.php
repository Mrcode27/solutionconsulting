<?php
// c:\xampp\htdocs\solutionconsulting-main\api\send_mail.php

// Allow requests from any origin (for development) - adjust for production
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load Composer's autoloader
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit();
}

$name = $data['name'] ?? '';
$company = $data['company'] ?? '';
$service = $data['service'] ?? '';
$budget = $data['budget'] ?? '';
$message = $data['message'] ?? '';

if (empty($name) || empty($company) || empty($service)) {
    echo json_encode(["success" => false, "message" => "Veuillez remplir les champs obligatoires."]);
    exit();
}

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'rs1.obambu.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'no-reply@solutionconsulting.biz';
        $mail->Password = 'Azerty@2026';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;                                   // TCP port to connect to

    // Recipients
    $mail->setFrom('no-reply@solutionconsulting.biz', 'Solution Consulting');
    $mail->addAddress('ethegreat17@gmail.com');           // Add a recipient

    // Content
    $mail->isHTML(true);
    $mail->Subject = "Nouveau Lead: $name ($company)";
    $mail->Body    = "
        <h2>Nouvelle demande d'audit</h2>
        <p><strong>Nom:</strong> $name</p>
        <p><strong>Entreprise:</strong> $company</p>
        <p><strong>Service:</strong> $service</p>
        <p><strong>Budget:</strong> $budget</p>
        <p><strong>Message:</strong><br>$message</p>
    ";
    $mail->AltBody = "Nom: $name\nEntreprise: $company\nService: $service\nBudget: $budget\nMessage:\n$message";

    $mail->send();
    echo json_encode(["success" => true, "message" => "Email envoyé avec succès."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur d'envoi: {$mail->ErrorInfo}"]);
}
?>
