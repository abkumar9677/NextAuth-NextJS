import User from "@/models/userSchema";
import { connect } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    console.log("reqBody", reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "user already exits" },
        { status: 400 }
      );
    }
    // const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser, "newUser");

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message + "twenty" },
      { status: 500 }
    );
  }
}
