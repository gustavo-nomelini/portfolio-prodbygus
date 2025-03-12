import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Obter dados do corpo da requisição
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validar dados obrigatórios
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios' },
        { status: 400 }
      );
    }

    // Configurar transportador de email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Configurar email
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Nova mensagem do portfólio: ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n${phone ? `Telefone: ${phone}\n` : ''}Mensagem:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nova mensagem de contato</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ''}
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Mensagem:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 20px; color: #666;">Esta mensagem foi enviada pelo formulário de contato do seu portfólio.</p>
        </div>
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    // Retornar resposta de sucesso
    return NextResponse.json(
      { message: 'Email enviado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    
    return NextResponse.json(
      { error: 'Erro ao enviar o email. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
