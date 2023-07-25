import Listing from "../types/Listing";

export const getListingScore = async (listing: Listing) => {
  const priceDifference =
    listing.market_price && listing.price
      ? Math.round((listing.market_price / listing.price) * 1000)
      : 0;

  let floatRankMultiplier = 1;
  if (listing.float_rank && listing.float_rank !== -1) {
    if (listing.float_rank > 10) {
      floatRankMultiplier = 1;
    } else if (listing.float_rank >= 5) {
      floatRankMultiplier = 4;
    } else if (listing.float_rank === 3) {
      floatRankMultiplier = 6;
    } else if (listing.float_rank === 2) {
      floatRankMultiplier = 8;
    } else if (listing.float_rank === 1) {
      floatRankMultiplier = 10;
    }
  }

  const score = priceDifference * floatRankMultiplier;

  return score;
};
