/**
 * Email Service - Enviar notificações de contato
 * Suporta múltiplos providers: Resend, SendGrid, Mailgun, ou backend customizado
 */

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Enviar email de contato para admin
 */
export async function sendContactEmail(
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const apiKey = import.meta.env.VITE_EMAIL_API_KEY;
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "admin@tatianatorres.com";
    const provider = import.meta.env.VITE_EMAIL_PROVIDER || "resend";

    // HTML template para email admin
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">
          Sent from: Tatiana Torres Beauty Website
        </p>
      </div>
    `;

    // HTML template para confirmação ao cliente
    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Obrigada por nos contactar!</h2>
        <p>Olá ${formData.name},</p>
        <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
        <p><strong>Seus detalhes:</strong></p>
        <ul>
          <li>Email: ${formData.email}</li>
          <li>Telefone: ${formData.phone}</li>
        </ul>
        <p>Att,<br>Tatiana Torres Beauty</p>
      </div>
    `;

    // Enviar para admin
    if (provider === "resend") {
      await sendViaResend(apiKey, adminEmail, adminHtml, formData);
    } else if (provider === "sendgrid") {
      await sendViaSendGrid(apiKey, adminEmail, adminHtml, formData);
    } else {
      // Fallback: enviar para backend customizado
      await sendViaBackend(formData);
    }

    // Enviar confirmação ao cliente
    try {
      if (provider === "resend") {
        await sendViaResend(
          apiKey,
          formData.email,
          clientHtml,
          {
            ...formData,
            subject: "Thank you for contacting us",
          }
        );
      }
    } catch (e) {
      console.debug("Failed to send confirmation email:", e);
    }

    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email";
    console.error("Email sending error:", message);
    return { success: false, error: message };
  }
}

/**
 * Enviar via Resend (recomendado)
 */
async function sendViaResend(
  apiKey: string,
  to: string,
  html: string,
  formData: ContactFormData
) {
  if (!apiKey) {
    throw new Error("Resend API key not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "contact@tatianatorres.com",
      to,
      subject:
        to === formData.email
          ? "Thank you for contacting us"
          : `New Contact from ${formData.name}`,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send email via Resend");
  }

  return await response.json();
}

/**
 * Enviar via SendGrid
 */
async function sendViaSendGrid(
  apiKey: string,
  to: string,
  html: string,
  formData: ContactFormData
) {
  if (!apiKey) {
    throw new Error("SendGrid API key not configured");
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: to }],
          subject:
            to === formData.email
              ? "Thank you for contacting us"
              : `New Contact from ${formData.name}`,
        },
      ],
      from: {
        email: "contact@tatianatorres.com",
        name: "Tatiana Torres Beauty",
      },
      content: [
        {
          type: "text/html",
          value: html,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email via SendGrid");
  }
}

/**
 * Fallback: Enviar via backend customizado
 */
async function sendViaBackend(formData: ContactFormData) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("No email service configured");
  }

  const response = await fetch(`${backendUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to submit contact form");
  }

  return await response.json();
}

/**
 * Enviar email de notificação de appointment
 */
export async function sendAppointmentEmail(
  appointmentData: {
    clientName: string;
    clientEmail: string;
    treatmentName: string;
    appointmentDate: string;
    appointmentTime: string;
  }
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Appointment Confirmation</h2>
      <p>Hello ${appointmentData.clientName},</p>
      <p>Your appointment has been confirmed:</p>
      <ul>
        <li><strong>Treatment:</strong> ${appointmentData.treatmentName}</li>
        <li><strong>Date:</strong> ${appointmentData.appointmentDate}</li>
        <li><strong>Time:</strong> ${appointmentData.appointmentTime}</li>
      </ul>
      <p>If you need to reschedule, please contact us.</p>
      <p>Att,<br>Tatiana Torres Beauty</p>
    </div>
  `;

  return sendContactEmail({
    name: appointmentData.clientName,
    email: appointmentData.clientEmail,
    phone: "",
    message: html,
  });
}
