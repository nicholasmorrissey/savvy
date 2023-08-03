export default interface ListingFilters {
  minPrice: number | null;
  maxPrice: number | null;
  minFloat: number | null;
  maxFloat: number | null;
  collections: number[];
  rarities: string[];
}
