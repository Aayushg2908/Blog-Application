import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import blogModel from "@/lib/models/blog.model";

export async function POST(request: NextRequest) {
  connectToDB();
  try {
    const { title, description, content, image, user, author } = await request.json();
    if (!title || !description || !content || !image) {
      return NextResponse.json({
        error: "Please fill all fields",
        status: 409,
      });
    }
    const newBlog = new blogModel({ title, description, content, image, user, author });
    await newBlog.save();

    return NextResponse.json({
      error: "Blog Created successfully",
      status: 200,
      newBlog,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
