export default interface MarketPrice {
  Market_Listing_ID: string;
  created_at: string;
  Skin_Base_Id: string | null;
  Skin_Link: string | null;
  price: number | null;
  Market_Name: string | null;
  Wear: string | null;
}
