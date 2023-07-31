import { EnrichedListing } from "../types/Listing";

export const getListingScore = async (listing: EnrichedListing) => {
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

  const year = listing.skins.collections?.collection_date?.slice(-4) ?? "";

  let collectionDateMultiplier = 1;
  switch (year) {
    case "2013":
      collectionDateMultiplier = 2;
      break;
    case "2014":
      collectionDateMultiplier = 1.8;
      break;
    case "2015":
      collectionDateMultiplier = 1.6;
      break;
    case "2016":
      collectionDateMultiplier = 1.4;
      break;
    case "2017":
      collectionDateMultiplier = 1.2;
      break;
    case "2018":
      collectionDateMultiplier = 1.1;
      break;
    case "2019":
      collectionDateMultiplier = 1;
      break;
    case "2020":
      collectionDateMultiplier = 1;
      break;
    case "2021":
      collectionDateMultiplier = 1;
      break;
    default:
      collectionDateMultiplier = 1;
  }

  const statTrakMultiplier = listing.stat_trak ? 1.2 : 1;

  const score =
    priceDifference *
    floatRankMultiplier *
    collectionDateMultiplier *
    statTrakMultiplier;

  return {
    total: score,
    priceDifference: priceDifference,
    floatRank: priceDifference * floatRankMultiplier - priceDifference,
    collectionDate:
      priceDifference * collectionDateMultiplier - priceDifference,
    statTrak: priceDifference * statTrakMultiplier - priceDifference,
  };
};
