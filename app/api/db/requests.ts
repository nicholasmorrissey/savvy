import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function getAllListings() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("listings")
    .select(
      "*, skins(name, weapon, quality, min_float, max_float, secondary_skin_id, collection_id, collections(name, collection_image, collection_date))"
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

export async function getListingPrices(
  secondary_skin_id: string,
  exterior: string,
  stat_trak: boolean
) {
  const jonnyBase = createClient(
    "https://rhxzjzaunjteiwuaticu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoeHpqemF1bmp0ZWl3dWF0aWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1MDQxODYsImV4cCI6MjAwNjA4MDE4Nn0.k2QzwuPEm_pmRbDdXNAdrNrOC2JCMFEc-TKC6kXfB3E",
    { auth: { persistSession: false } }
  );

  let parsedExterior;

  switch (exterior) {
    case "Factory New":
      parsedExterior = "factory-new";
      break;
    case "Minimal Wear":
      parsedExterior = "minimal-wear";
      break;
    case "Field-Tested":
      parsedExterior = "field-tested";
      break;
    case "Well-Worn":
      parsedExterior = "well-worn";
      break;
    case "Battle-Scarred":
      parsedExterior = "battle-scarred";
      break;
  }

  parsedExterior = stat_trak ? `stattrak-${parsedExterior}` : parsedExterior;

  const { data, error } = await jonnyBase
    .from("CsGoGG_Markets")
    .select()
    .eq("Skin_Base_Id", secondary_skin_id)
    .eq("Wear", parsedExterior);

  const parsedData = data
    ? data.map((item) => {
        return {
          ...item,
          price: item.Price ? Number(item.Price.slice(1)) : null,
        };
      })
    : [];

  return parsedData;
}

export async function getAllCollections() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("collections").select();

  return data;
}
