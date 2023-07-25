import { NextResponse } from "next/server";
import { getAllListings } from "../requests";

export async function GET() {
  return getAllListings()
    .then((res) => res)
    .then((data) => NextResponse.json(data));
}
