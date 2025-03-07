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

    // Here you would typically save the email to your database
    // For now, we'll just log it and return a success response
    console.log(`New waitlist signup: ${email}`);

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