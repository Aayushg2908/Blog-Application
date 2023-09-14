import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import blogModel from "@/lib/models/blog.model";

export async function POST(request: NextRequest) {
  connectToDB();
  try {
    const { id } = await request.json();

    const blog = await blogModel.findById(id);
    if (!blog) {
      return NextResponse.json({
        error: "Blog not found",
        status: 404,
      });
    }
    return NextResponse.json({
      message: "Blog found",
      status: 200,
      blog,
    });

  } catch (error) {
    return NextResponse.json({
      error: "Some error occurred",
      status: 500,
    });
  }
}
