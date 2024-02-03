import connectDb from "@/libs/connectDb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectDb();
  const topic = await Topic.findById(id);

  return NextResponse.json({ topic }, { status: 200 });
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { title, description } = await request.json();
    await connectDb();
    await Topic.findByIdAndUpdate(id, { title, description });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectDb();
    await Topic.findByIdAndDelete(id);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
