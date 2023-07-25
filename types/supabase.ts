export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          collection_id: number;
          name: string;
        };
        Insert: {
          collection_id?: number;
          name: string;
        };
        Update: {
          collection_id?: number;
          name?: string;
        };
        Relationships: [];
      };
      floats: {
        Row: {
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
        };
        Insert: {
          a?: string | null;
          csgofloat_id?: number | null;
          d?: string | null;
          float_id?: number;
          float_value?: number | null;
          paint_seed?: number | null;
          s?: string | null;
          skin_id: number;
          souvenir?: boolean | null;
          stattrak?: boolean | null;
          stickers?: Json[] | null;
          updated?: string | null;
        };
        Update: {
          a?: string | null;
          csgofloat_id?: number | null;
          d?: string | null;
          float_id?: number;
          float_value?: number | null;
          paint_seed?: number | null;
          s?: string | null;
          skin_id?: number;
          souvenir?: boolean | null;
          stattrak?: boolean | null;
          stickers?: Json[] | null;
          updated?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "floats_skin_id_fkey";
            columns: ["skin_id"];
            referencedRelation: "skins";
            referencedColumns: ["skin_id"];
          }
        ];
      };
      listings: {
        Row: {
          date_ingested: number | null;
          exterior: string | null;
          finish: number | null;
          float: number | null;
          float_rank: number | null;
          image: string | null;
          listing_id: number;
          market_hash_name: string | null;
          market_price: number | null;
          marketplace_url: string | null;
          pattern: number | null;
          price: number | null;
          skin_id: number | null;
          skinport_id: number | null;
          souvenir: boolean | null;
          stat_trak: boolean | null;
          steam_id: string | null;
          steam_link: string | null;
          stickers: Json[] | null;
        };
        Insert: {
          date_ingested?: number | null;
          exterior?: string | null;
          finish?: number | null;
          float?: number | null;
          float_rank?: number | null;
          image?: string | null;
          listing_id?: number;
          market_hash_name?: string | null;
          market_price?: number | null;
          marketplace_url?: string | null;
          pattern?: number | null;
          price?: number | null;
          skin_id?: number | null;
          skinport_id?: number | null;
          souvenir?: boolean | null;
          stat_trak?: boolean | null;
          steam_id?: string | null;
          steam_link?: string | null;
          stickers?: Json[] | null;
        };
        Update: {
          date_ingested?: number | null;
          exterior?: string | null;
          finish?: number | null;
          float?: number | null;
          float_rank?: number | null;
          image?: string | null;
          listing_id?: number;
          market_hash_name?: string | null;
          market_price?: number | null;
          marketplace_url?: string | null;
          pattern?: number | null;
          price?: number | null;
          skin_id?: number | null;
          skinport_id?: number | null;
          souvenir?: boolean | null;
          stat_trak?: boolean | null;
          steam_id?: string | null;
          steam_link?: string | null;
          stickers?: Json[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "listings_skin_id_fkey";
            columns: ["skin_id"];
            referencedRelation: "skins";
            referencedColumns: ["skin_id"];
          }
        ];
      };
      skins: {
        Row: {
          collection_id: number | null;
          name: string;
          quality: string | null;
          skin_id: number;
          steam_url: string | null;
          weapon: string | null;
        };
        Insert: {
          collection_id?: number | null;
          name: string;
          quality?: string | null;
          skin_id?: number;
          steam_url?: string | null;
          weapon?: string | null;
        };
        Update: {
          collection_id?: number | null;
          name?: string;
          quality?: string | null;
          skin_id?: number;
          steam_url?: string | null;
          weapon?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "skins_collection_id_fkey";
            columns: ["collection_id"];
            referencedRelation: "collections";
            referencedColumns: ["collection_id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
