import { fetchAPI } from "@/lib/api";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const data = await fetchAPI('/api/notes/tree/');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from Django API" }, { status: 500 });
  }
}
