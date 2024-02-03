import connectDb from "@/libs/connectDb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    await connectDb();
    await Topic.create({ title, description });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
  return NextResponse.json({ message: "Topic created" }, { status: 201 });
}

export async function GET() {
  await connectDb();
  const topics = await Topic.find();
  return NextResponse.json({ topics }, { status: 200 });
}
