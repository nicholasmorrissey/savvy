import { NextRequest, NextResponse } from "next/server";
import { getSkinCollection } from "../requests";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const body = await req.json();
  return getSkinCollection(body.collection_id)
    .then((res) => res)
    .then((data) => NextResponse.json(data));
}
