import { db } from "@/config/firebase";
import { collection } from "firebase/firestore";
import { resend } from "@/lib/resend/client";
import { addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    console.log(`New waitlist signup: ${email}`);

    const vapiWrapperCollectionRef = collection(db, 'TelezenWaitlist');
    await addDoc(vapiWrapperCollectionRef, { email, createdAt: new Date() });

    await resend.emails.send({
      from: 'no-reply@telezen-ai.com',
      to: 'marc.hypolite@gmail.com',
      cc: ['marc.hypolite@telezen-ai.com'],
      subject: 'New user signed up for the new Telezen wait list',
      html: `
      <p>A new user signed up for the new Telezen wait list:</p>
      <p>Email: ${email}</p>
  `
    });

    // Send email to user
    await resend.emails.send({
      from: 'no-reply@telezen-ai.com',
      to: email,
      subject: 'Welcome to the Telezen waitlist!',
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Telezen AI</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9fafb;
              color: #111827;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              padding: 20px 0;
            }
            .logo {
              max-width: 150px;
              margin-bottom: 10px;
            }
            .content {
              background-color: white;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .title {
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 20px;
              color: #111827;
            }
            .message {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 25px;
              color: #4b5563;
            }
            .feature {
              display: flex;
              margin-bottom: 15px;
              align-items: center;
            }
            .feature-icon {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              color: #6366f1;
            }
            .feature-text {
              font-size: 15px;
              color: #4b5563;
            }
            .cta {
              display: inline-block;
              background-color: #6366f1;
              color: white;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-weight: 500;
              margin: 20px 0;
              transition: background-color 0.2s;
            }
            .cta:hover {
              background-color: #4f46e5;
            }
            .footer {
              text-align: center;
              padding: 20px 0;
              font-size: 14px;
              color: #6b7280;
            }
            .social {
              margin: 15px 0;
            }
            .social a {
              margin: 0 8px;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://telezen-ai.com/telezen-logo.png" alt="Telezen AI Logo" class="logo">
            </div>
            <div class="content">
              <div class="title">Welcome to the Telezen AI Waitlist!</div>
              <div class="message">
                Thank you for joining our waitlist! We're excited to have you on board as we prepare to launch Telezen AI, the platform that lets you create powerful voice agents with custom prompts and knowledge bases.
              </div>
              
              <div class="feature">
                <div class="feature-icon">🎯</div>
                <div class="feature-text">Create voice agents with custom prompts</div>
              </div>
              <div class="feature">
                <div class="feature-icon">📱</div>
                <div class="feature-text">Add phone numbers to agents and start receiving calls</div>
              </div>
              <div class="feature">
                <div class="feature-icon">👥</div>
                <div class="feature-text">Create and manage contacts with ease</div>
              </div>
              
              <div class="message">
                We'll keep you updated on our progress and let you know as soon as you can access the platform. In the meantime, follow us on social media for the latest updates.
              </div>
              
              <a href="https://telezen-ai.com" class="cta">Learn More</a>
            </div>
            <div class="footer">
              <div>© ${new Date().getFullYear()} Telezen AI - Voice Agents for Everyone</div>
              <div class="social">
                <a href="https://x.com/TeleZen_AI">Twitter</a> • 
                <a href="https://www.linkedin.com/company/telezen-ai-platform/">LinkedIn</a>
              </div>
              <div>You're receiving this email because you signed up for the Telezen AI waitlist.</div>
            </div>
          </div>
        </body>
      </html>
      `
    });

    
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for joining our waitlist! We'll be in touch soon."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
} 