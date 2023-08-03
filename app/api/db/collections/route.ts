import { NextResponse } from "next/server";
import { getAllCollections } from "../requests";

export const dynamic = "force-dynamic";
export async function GET() {
  return getAllCollections()
    .then((res) => res)
    .then((data) => NextResponse.json(data));
}
