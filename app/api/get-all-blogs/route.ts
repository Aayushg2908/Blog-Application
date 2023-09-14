import blogModel from "@/lib/models/blog.model";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";

export async function GET() {
  connectToDB();
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return NextResponse.json({
        message: "No Blogs Found",
        status: 400,
      });
    }

    return NextResponse.json({
      message: "All blogs",
      status: 200,
      blogs,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Some error occurred",
      status: 500,
    });
  }
}