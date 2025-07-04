import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    const users = await User.find({
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    for (const user of users) {
      const isMatch = await bcryptjs.compare(user._id.toString(), token);
      if (isMatch) {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
          message: "Password updated successfully",
          success: true,
        }, { status: 200 });
      }
    }

    return NextResponse.json({
      error: "Invalid or expired token",
    }, { status: 401 });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}
