import { Photo } from "@/lib/photos";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<Photo | { error: string }>> {
  // const { id } = await params;
  // const apiKey = process.env.PEXELS_API_KEY!;
  // const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
  //   headers: {
  //     Authorization: apiKey,
  //   },
  // });
  // if (!res.ok)
  //   return NextResponse.json(
  //     { error: "Failed to fetch photo details" },
  //     { status: res.status }
  //   );
  // const data = await res.json();
  // return NextResponse.json(data);
}
