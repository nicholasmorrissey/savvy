import { NextResponse } from "next/server";
import { getSkinFloatRankings } from "../requests";

export const dynamic = "force-dynamic";
export async function POST(req: { json: () => any }) {
  const body = await req.json();
  return getSkinFloatRankings(body.skin_id)
    .then((res) => res)
    .then((data) => NextResponse.json(data));
}
