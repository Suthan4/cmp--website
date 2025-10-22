import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req: Request) {
  const { name, email, company, phoneNumber, message, countryCode } =
  await req.json();
  const transporter = nodemailer.createTransport({
    service: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "Contactus@smyd.in",
      pass: "Happyfaceme@2001",
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
  transporter.verify((err, success) => {
    if (err) console.error("❌ SMTP connection failed:", err);
    else console.log("✅ Connected to Outlook SMTP!");
  });
  try {
    await transporter.sendMail({
      from: email,
      to: "harisuthan268@gmail.com",
      subject: `New Contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${countryCode}-${phoneNumber}
Message: ${message}
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
