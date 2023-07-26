import { Json } from "./supabase";

export default interface FloatRank {
  a: string | null;
  csgofloat_id: number | null;
  d: string | null;
  float_id: number;
  float_value: number | null;
  paint_seed: number | null;
  s: string | null;
  skin_id: number;
  souvenir: boolean | null;
  stattrak: boolean | null;
  stickers: Json[] | null;
  updated: string | null;
}
