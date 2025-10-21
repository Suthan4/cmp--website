import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req: Request) {
  const { name, email, company, phoneNumber, message } = await req.json();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "harisuthan268@gmail.com",
      pass: "qdjr evsm unrq gytb",
    },
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
Phone: ${phoneNumber}
Message: ${message}
  `,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
