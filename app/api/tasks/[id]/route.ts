import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ PUT — Update task
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 👈 FIX: must await params

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, dueDate, status } = await request.json();

    const client = await clientPromise;
    const db = client.db("Mahathidb");

    const user = await db.collection("users").findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (status !== undefined) updateData.status = status;

    const result = await db.collection("tasks").findOneAndUpdate(
      {
        _id: new ObjectId(id),
        userId: new ObjectId(user._id),
      },
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!result || !result.value) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(result.value);
  } catch (error) {
    console.error("Update task error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ DELETE — Remove task
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 👈 FIXED HERE TOO

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

    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(user._id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
