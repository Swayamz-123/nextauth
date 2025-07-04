
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Validate input
    if (  !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User doesnt exists" },
        { status: 400 }
    );
}
 const comparepassword = await bcrypt.compare(password,existingUser.password)
 if(!comparepassword){
    return NextResponse.json({
        message:"Invalid password"
    },
    { status :400})
 }
 
  const payLoaddata={
    id:existingUser._id,
    username:existingUser.username,
    email:existingUser.email

  }
    
  const getToken =  jwt.sign(payLoaddata,process.env.TOKEN_SECRET!,{expiresIn:"1d"});
  const response= NextResponse.json({
    message:"Login Succesfully"
  })
  response.cookies.set("token",getToken,{httpOnly:true})
  return response

    

   
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: error.message || "Login Error" },
      { status: 500 }
    );
  }
}
