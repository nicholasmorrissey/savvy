import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getAllListings() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("listings")
    .select("*, skins(name, weapon, quality, collections(name))");

  return data;
}
