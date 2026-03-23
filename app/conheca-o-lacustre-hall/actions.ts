"use server";

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const eventType = formData.get("eventType") as string;
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

  // 2. Enviar Email (Usando Resend API via fetch para evitar dependências pesadas)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.log("Variável RESEND_API_KEY não configurada. Simulado sucesso do envio:", { name, email, phone, eventType });
    return { success: true, message: "Agradecemos o contato! Em breve retornaremos com sua proposta." };
  }

  try {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Lacustre Hall <onboarding@resend.dev>", // Altere para um remetente verificado
        to: ["contato@lacustre.com.br"],
        subject: `Nova Solicitação de Proposta: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f5; color: #111827;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <h1 style="color: #1a2e1a; font-size: 24px; font-weight: bold; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Solicitação de Proposta Personalizada</h1>
              <p style="font-size: 16px;">Um cliente deseja receber um orçamento pelo site:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="font-weight: bold; padding: 10px; background-color: #f9fafb; border: 1px solid #e5e7eb; width: 30%;">Nome:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; padding: 10px; background-color: #f9fafb; border: 1px solid #e5e7eb;">E-mail:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${email}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; padding: 10px; background-color: #f9fafb; border: 1px solid #e5e7eb;">Telefone:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${phone}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; padding: 10px; background-color: #f9fafb; border: 1px solid #e5e7eb;">Tipo de Evento:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${eventType || 'Não especificado'}</td>
                </tr>
              </table>
            </div>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
        return { success: false, error: "Erro ao enviar email via Resend API." };
    }

    return { success: true, message: "Agradecemos o contato! Em breve retornaremos com sua proposta." };
  } catch (err) {
    return { success: false, error: "Ocorreu um erro no servidor ao tentar enviar o formulário." };
  }
}
