import { NextRequest, NextResponse } from "next/server";
import { getListingPrices } from "../requests";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const body = await req.json();
  return getListingPrices(body.secondary_skin_id, body.exterior, body.stat_trak)
    .then((res) => res)
    .then((data) => NextResponse.json(data));
}
