import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // from your NextAuth setup
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ GET all tasks for logged-in user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("Mahathidb");

    const user = await db.collection("users").findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tasks = await db
      .collection("tasks")
      .find({ userId: new ObjectId(user._id) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ POST create new task
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, dueDate } = await request.json();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Mahathidb");

    const user = await db.collection("users").findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const result = await db.collection("tasks").insertOne({
      title,
      description: description || "",
      dueDate: dueDate || null,
      status: "pending",
      userId: new ObjectId(user._id),
      createdAt: new Date(),
    });

    const newTask = await db.collection("tasks").findOne({ _id: result.insertedId });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
