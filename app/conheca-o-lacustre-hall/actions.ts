"use server";

import nodemailer from "nodemailer";

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const recaptchaToken = formData.get("g-recaptcha-response") as string;

  if (!name || !email || !phone) {
    return { success: false, error: "Por favor, preencha todos os campos obrigatórios." };
  }

  // 1. Validar reCAPTCHA
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    try {
      const recaptchaRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
        }
      );
      const recaptchaData = await recaptchaRes.json();
      if (!recaptchaData.success) {
        return { success: false, error: "Falha na validação do reCAPTCHA. Tente novamente." };
      }
    } catch (err) {
      return { success: false, error: "Erro de rede ao validar reCAPTCHA." };
    }
  }

  // 2. Enviar Email via SMTP (Ideal para cPanel)
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("Configurações SMTP ausentes no arquivo .env");
    return { success: false, error: "Erro interno: Configuração de e-mail pendente." };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // True para porta 465, false para outras
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      // Importante para cPanel se o certificado SSL for auto-assinado ou tiver problemas
      rejectUnauthorized: false
    }
  });

  try {
    await transporter.sendMail({
      from: `"Lacustre Hall Site" <${smtpUser}>`, // Remetente deve ser o mesmo usuário do SMTP geralmente
      to: process.env.RECEIVER_EMAIL || "contato@lacustre.com.br", // Para onde vai o e-mail
      replyTo: email, // Quando responder, vai para o cliente
      subject: `Solicitação de Proposta (Site): ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f5; color: #111827;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
            <h1 style="color: #1a2e1a; font-size: 24px; font-weight: bold; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Nova Solicitação de Proposta</h1>
            <p style="font-size: 16px;">Dados recebidos via formulário da landing page:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #e5e7eb;">
              <tr>
                <td style="font-weight: bold; padding: 12px; background-color: #f9fafb; border: 1px solid #e5e7eb; width: 30%;">Nome:</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">${name}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 12px; background-color: #f9fafb; border: 1px solid #e5e7eb;">E-mail:</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">${email}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 12px; background-color: #f9fafb; border: 1px solid #e5e7eb;">Telefone:</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">${phone}</td>
              </tr>
            </table>
            
            <p style="margin-top: 25px; font-size: 12px; color: #6b7280; text-align: center;">Este e-mail foi gerado automaticamente pelo site Lacustre.</p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Nodemailer Error:", err);
    return { success: false, error: "Ocorreu um erro ao processar o envio do e-mail." };
  }
}

