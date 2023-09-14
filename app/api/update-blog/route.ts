import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import blogModel from "@/lib/models/blog.model";

export async function PUT(request: NextRequest) {
  connectToDB();
  try {
    const { title, description, content, image, id } = await request.json();

    if (!title || !description || !content || !image) {
      return NextResponse.json({
        error: "All fields are required",
        status: 409,
      });
    }

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { $set: { title, description, content, image } },
      { new: true }
    );
    if (!blog) {
      return NextResponse.json({
        error: "Blog not found",
        status: 404,
      });
    }
    return NextResponse.json({
      message: "Blog updated successfully",
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
