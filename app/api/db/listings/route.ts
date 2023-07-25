import { NextResponse } from "next/server";
import { getAllListings } from "../requests";

export const dynamic = "force-dynamic";

export async function GET() {
  return getAllListings()
    .then((res) => res)
    .then((data) => NextResponse.json(data));
}
