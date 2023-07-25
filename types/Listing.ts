import { Json } from "./supabase";

export default interface Listing {
  exterior: string | null;
  finish: number | null;
  float: number | null;
  float_rank: number | null;
  id?: number;
  image: string | null;
  market_hash_name: string | null;
  marketplace_url: string | null;
  pattern: number | null;
  price: number | null;
  skin_id: number;
  stat_trak: boolean | null;
  steam_id: string | null;
  steam_link: string | null;
  stickers: Json[] | null;
  skinport_id: number | null;
  market_price: number | null;
  date_ingested: number | null;
}

export interface EntrichedListing extends Listing {
  skins: {
    name: string | null;
    weapon: string | null;
    quality: string | null;
    collections: { name: string | null };
  };
}

export interface ScoredListing extends EntrichedListing {
  score: number;
}
