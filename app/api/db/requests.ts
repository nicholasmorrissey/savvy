import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getAllListings() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("listings")
    .select(
      "*, skins(name, weapon, quality, min_float, max_float, collection_id, collections(name, collection_image, collection_date))"
    )
    .is("archived_date", null);

  return data;
}

export async function getSkinFloatRankings(skin_id: number) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("floats")
    .select()
    .eq("skin_id", skin_id)
    .order("float_value", { ascending: true });

  return data;
}

export async function getSkinCollection(collection_id: number) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("skins")
    .select()
    .eq("collection_id", collection_id);

  return data;
}

export async function getAllCollections() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("collections").select();

  return data;
}
