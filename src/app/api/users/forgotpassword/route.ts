import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        error: "User does not exist with this email",
      }, { status: 400 });
    }

    await sendEmail({ email: user.email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Password reset email sent successfully",
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      error: "There was an error while sending email",
      message: error.message,
    }, { status: 500 });
  }
}
