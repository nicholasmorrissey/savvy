import { EnrichedListing } from "../types/Listing";

export const getListingScore = async (listing: EnrichedListing) => {
  function calculateFloatMultiplier(
    floatValue: number,
    floatRange: number[],
    originalRange: number[]
  ) {
    const [minFloat, maxFloat] = floatRange;
    const [originalMinFloat, originalMaxFloat] = originalRange;

    // Calculate the actual top and bottom of the cut-off range
    const actualTop =
      originalMaxFloat > 0 && originalMaxFloat < maxFloat
        ? originalMaxFloat
        : maxFloat;
    const actualBottom =
      originalMaxFloat < 1 && originalMinFloat > minFloat
        ? originalMinFloat
        : minFloat;

    // Calculate the normalized float value within the actual float range
    const normalizedFloatValue =
      (floatValue - actualBottom) / (actualTop - actualBottom);

    // Ensure the floatRangeMultiplier is within the range [0, 1]
    const floatRangeMultiplier = Math.max(Math.min(normalizedFloatValue, 1), 0);

    return floatRangeMultiplier;
  }

  const ranges = [
    { name: "Factory New", min: 0.0, max: 0.07 },
    { name: "Minimal Wear", min: 0.07, max: 0.15 },
    { name: "Field-Tested", min: 0.15, max: 0.38 },
    { name: "Well-Worn", min: 0.38, max: 0.45 },
    { name: "Battle-Scarred", min: 0.45, max: 1.0 },
  ];

  // Find the matching range based on the float value
  const matchedRange = ranges.find(
    (range) => listing.float && listing.float <= range.max
  );

  const floatRangeMultiplier = calculateFloatMultiplier(
    listing.float ?? 0,
    [matchedRange?.min ?? 0, matchedRange?.max ?? 1],
    [listing.skins.min_float ?? 0, listing.skins.max_float ?? 1]
  );

  const priceDifference =
    listing.market_price && listing.price
      ? Math.round((listing.market_price / listing.price) * 1000)
      : 0;

  let floatRankMultiplier = 1;
  if (listing.float_rank && listing.float_rank !== -1) {
    if (listing.float_rank >= 50) {
      floatRankMultiplier = 3;
    } else if (listing.float_rank >= 25) {
      floatRankMultiplier = 4;
    } else if (listing.float_rank >= 15) {
      floatRankMultiplier = 5;
    } else if (listing.float_rank >= 10) {
      floatRankMultiplier = 6;
    } else if (listing.float_rank >= 5) {
      floatRankMultiplier = 7;
    } else if (listing.float_rank >= 3) {
      floatRankMultiplier = 8;
    } else if (listing.float_rank === 2) {
      floatRankMultiplier = 10;
    } else if (listing.float_rank === 1) {
      floatRankMultiplier = 12;
    }
  }

  // const year = listing.skins.collections?.collection_date?.slice(-4) ?? "";

  // let collectionDateMultiplier = 1;
  // switch (year) {
  //   case "2013":
  //     collectionDateMultiplier = 1.2;
  //     break;
  //   case "2014":
  //     collectionDateMultiplier = 1.2;
  //     break;
  //   case "2015":
  //     collectionDateMultiplier = 1.2;
  //     break;
  //   case "2016":
  //     collectionDateMultiplier = 1.15;
  //     break;
  //   case "2017":
  //     collectionDateMultiplier = 1.15;
  //     break;
  //   case "2018":
  //     collectionDateMultiplier = 1.1;
  //     break;
  //   case "2019":
  //     collectionDateMultiplier = 1;
  //     break;
  //   case "2020":
  //     collectionDateMultiplier = 1;
  //     break;
  //   case "2021":
  //     collectionDateMultiplier = 1;
  //     break;
  //   default:
  //     collectionDateMultiplier = 1;
  // }

  // const statTrakMultiplier = listing.stat_trak ? 1.1 : 1;

  const minScore = priceDifference;
  const maxScore = -priceDifference;
  const baseMultiplier = (maxScore - minScore) / 2;
  const floatRangeScore = minScore + floatRangeMultiplier * 2 * baseMultiplier;

  const stickerPriceDifference =
    listing.price && listing.stickerTotal
      ? Math.round((listing.stickerTotal / listing.price) * 10000)
      : 0;

  const stickersScore = stickerPriceDifference;

  // const floatRangeScore =
  //   -priceDifference +
  //   floatRangeMultiplier * (priceDifference - -priceDifference);

  // const floatRangeScore = priceDifference * (floatRangeMultiplier ?? 0);

  const floatRankScore =
    priceDifference * floatRankMultiplier - priceDifference;

  const score = floatRankScore + priceDifference + floatRangeScore;

  return {
    total: score,
    stickerScore: stickersScore,
    priceDifference: priceDifference,
    floatRank: floatRankScore,
    // collectionDate:
    //   priceDifference * collectionDateMultiplier - priceDifference,
    // statTrak: priceDifference * statTrakMultiplier - priceDifference,
    collectionDate: 0,
    statTrak: 0,
    floatRangeMultiplier: floatRangeScore,
  };
};
