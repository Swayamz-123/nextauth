import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"; // ✅ Make sure this is imported

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Token received:", token);

    // Find all users with non-expired verify tokens
    const users = await User.find({ verifyTokenExpiry: { $gt: Date.now() } });

    for (const user of users) {
      const isMatch = await bcryptjs.compare(user._id.toString(), token);
      if (isMatch) {
        // ✅ Token matches this user
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
          message: "Email verified successfully",
          success: true,
        });
      }
    }

    // ❌ No matching user found
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  } catch (error: any) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
