import { EnrichedListing } from "../types/Listing";

export const getListingScore = async (listing: EnrichedListing) => {
  function calculateFloatMultiplier(floatValue, floatRange, originalRange) {
    const [minFloat, maxFloat] = floatRange;
    const [originalMinFloat, originalMaxFloat] = originalRange;

    // Calculate the distance from the top and bottom of the range
    const distanceToTop = maxFloat - floatValue;
    const distanceToBottom = floatValue - minFloat;

    // Calculate the maximum distance within the range
    const maxDistance = Math.max(distanceToTop, distanceToBottom);

    // Calculate the actual top and bottom of the cut-off range
    const actualTop = originalMaxFloat - (originalMaxFloat - maxFloat);
    const actualBottom = originalMinFloat + (minFloat - originalMinFloat);

    // Calculate the percentage of the cut-off range remaining
    const rangePercentageRemaining =
      (floatValue - actualBottom) / (actualTop - actualBottom);
    const invertedPercentage = 1 - rangePercentageRemaining;

    // Calculate the base multiplier based on the distance to the top or bottom
    const baseMultiplier = maxDistance / Math.max(maxFloat - minFloat, 0.0001);

    // Calculate the cutoff-adjusted multiplier
    const cutoffMultiplier = (baseMultiplier * 0.6 - 0.3) * invertedPercentage;

    console.log({
      floatValue,
      floatRange,
      originalRange,
      distanceToTop,
      distanceToBottom,
      maxDistance,
      actualTop,
      actualBottom,
      rangePercentageRemaining,
      invertedPercentage,
      baseMultiplier,
      cutoffMultiplier,
    });
    return cutoffMultiplier;
  }

  const ranges = [
    { name: "Factory New", min: 0.0, max: 0.07 },
    { name: "Minimal Wear", min: 0.07, max: 0.15 },
    { name: "Field-Tested", min: 0.15, max: 0.38 },
    { name: "Well-Worn", min: 0.38, max: 0.45 },
    { name: "Battle-Scarred", min: 0.45, max: 1.0 },
  ];

  // Find the matching range based on the float value
  const matchedRange = ranges.find((range) => listing.float <= range.max);

  const floatRangeMultiplier = calculateFloatMultiplier(
    listing.float,
    [matchedRange.min, matchedRange.max],
    [listing.skins.min_float, listing.skins.max_float]
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

  const floatRangeScore = priceDifference * floatRangeMultiplier;
  const floatRankScore =
    priceDifference * floatRankMultiplier - priceDifference;

  const score = floatRankScore + priceDifference + floatRangeScore;

  console.log(floatRangeScore);

  return {
    total: score,
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
