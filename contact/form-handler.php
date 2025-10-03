<?php
// Simple PHP mail handler example (fallback if not using Netlify/Formspree)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = strip_tags($_POST['name'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone = strip_tags($_POST['phone'] ?? '');
    $message = strip_tags($_POST['message'] ?? '');
    $rodo = isset($_POST['rodo']);
    if(!$name || !$email || !$message || !$rodo){
        http_response_code(400);
        echo "Brak wymaganych pól.";
        exit;
    }
    $to = "kontakt@domy3d.pl";
    $subject = "Nowa wiadomość z formularza Domy3D";
    $body = "Imię: $name\nEmail: $email\nTelefon: $phone\n\nWiadomość:\n$message";
    $headers = "From: noreply@domy3d.pl\r\nReply-To: $email\r\n";
    if(mail($to,$subject,$body,$headers)){
        header("Location: /contact/sent.html");
        exit;
    } else {
        http_response_code(500);
        echo "Błąd serwera pocztowego.";
    }
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}
