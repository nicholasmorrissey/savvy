import { FC, useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import styles from "../styles/listing_styles.module.scss";
import Scrollbars from "react-custom-scrollbars-2";
import SortSelect, { Sort } from "./SortSelect";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ScoredListing } from "@/types/Listing";
import { getListingScore } from "@/utils/utils";
import ListingCard from "./ListingCard";
import ListingFilters from "@/types/ListingFilters";

interface MarketListingsProps {
  filters: ListingFilters;
  scoreFocus: "Top floats" | "Stickers";
  smallRes?: boolean;
}

const MarketListings: FC<MarketListingsProps> = ({
  smallRes,
  filters,
  scoreFocus,
}) => {
  const [scoredListings, setScoredListings] = useState<ScoredListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<ScoredListing[]>([]);

  const [sort, setSort] = useState<Sort>(Sort.RatingDsc);

  const sortedListings = () => {
    switch (sort) {
      case Sort.PriceAsc:
        return scoredListings.sort((a, b) =>
          a.price && b.price && a.price > b.price ? 1 : -1
        );
      case Sort.PriceDsc:
        return scoredListings.sort((a, b) =>
          a.price && b.price && a.price > b.price ? -1 : 1
        );
      case Sort.RatingAsc:
        return scoredListings.sort((a, b) =>
          scoreFocus === "Top floats"
            ? a.score.total && b.score.total && a.score.total > b.score.total
              ? 1
              : -1
            : a.score.stickerScore &&
              b.score.stickerScore &&
              a.score.stickerScore > b.score.stickerScore
            ? 1
            : -1
        );
      case Sort.RatingDsc:
        return scoredListings.sort((a, b) =>
          scoreFocus === "Top floats"
            ? a.score.total && b.score.total && a.score.total > b.score.total
              ? -1
              : 1
            : a.score.stickerScore > b.score.stickerScore
            ? -1
            : 1
        );
      case Sort.StickerPriceDsc:
        return scoredListings.sort((a, b) =>
          a.stickerTotal > b.stickerTotal ? -1 : 1
        );
      case Sort.FloatAsc:
        return scoredListings.sort((a, b) =>
          a.float && b.float && a.float > b.float ? 1 : -1
        );
      case Sort.FloatDsc:
        return scoredListings.sort((a, b) =>
          a.float && b.float && a.float > b.float ? -1 : 1
        );
      case Sort.CollectionAsc:
        return scoredListings.sort((a, b) => {
          const collectionADate =
            (a.skins.collections?.collection_date &&
              Date.parse(a.skins.collections?.collection_date)) ??
            0;

          const collectionBDate =
            (b.skins.collections?.collection_date &&
              Date.parse(b.skins.collections?.collection_date)) ??
            0;

          return collectionADate > collectionBDate ? -1 : 1;
        });
      case Sort.CollectionDsc:
        return scoredListings.sort((a, b) => {
          const collectionADate =
            (a.skins.collections?.collection_date &&
              Date.parse(a.skins.collections?.collection_date)) ??
            0;

          const collectionBDate =
            (b.skins.collections?.collection_date &&
              Date.parse(b.skins.collections?.collection_date)) ??
            0;

          return collectionADate > collectionBDate ? 1 : -1;
        });

      default:
        return scoredListings.sort((a, b) => (a.score > b.score ? -1 : 1));
    }
  };

  useEffect(() => {
    fetch("/api/db/listings")
      .then((res) => res.json())
      .then(async (listings) => {
        const scoredListings: ScoredListing[] = [];

        for (const listing of listings) {
          const score = await getListingScore(listing);
          scoredListings.push({
            ...listing,
            score: score,
          });
        }

        setScoredListings(scoredListings);
      });
  }, []);

  useEffect(() => {
    setFilteredListings(filterListings());
  }, [scoredListings, filters, sort, scoreFocus]);

  const filterListings = () => {
    return sortedListings().filter((listing) => {
      const realPrice = listing.price ? listing.price / 100 : 0;

      if (realPrice && filters.minPrice && realPrice < filters.minPrice)
        return false;
      if (realPrice / 100 && filters.maxPrice && realPrice > filters.maxPrice)
        return false;
      if (listing.float && filters.minFloat && listing.float < filters.minFloat)
        return false;
      if (listing.float && filters.maxFloat && listing.float > filters.maxFloat)
        return false;
      if (
        (filters.collections.length > 0 &&
          listing.skins?.collection_id &&
          !filters.collections.includes(listing.skins.collection_id)) ||
        (filters.collections.length > 0 && !listing.skins?.collection_id)
      )
        return false;
      if (
        listing.skins?.quality &&
        filters.rarities.length > 0 &&
        !filters.rarities.includes(listing.skins.quality)
      )
        return false;
      if (
        (sort === Sort.StickerPriceDsc || scoreFocus === "Stickers") &&
        (listing.stickers?.length === 0 || listing.souvenir)
      )
        return false;

      return true;
    });
  };

  return (
    <div
      style={{
        maxWidth: smallRes ? "1280px" : "1560px",
        marginRight: "auto",
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          marginLeft: "0.7rem",
          marginTop: "2rem",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {scoredListings.length > 0 ? (
            <div
              style={{
                backgroundColor: "#3a3a59",
                padding: "0.5rem",
                borderRadius: "100px",
                color: "white",
              }}
            >
              <h3
                style={{
                  paddingLeft: "0.6rem",
                  paddingRight: "0.6rem",
                  margin: "0",
                }}
              >
                {filteredListings.length}
              </h3>
            </div>
          ) : (
            <SkeletonTheme
              baseColor="#26263d"
              highlightColor="#2d2d47"
              borderRadius="30px"
              duration={2}
            >
              <Skeleton width="80px" height="37px" inline />
            </SkeletonTheme>
          )}
          <h2 style={{ marginLeft: "1rem" }}>Items</h2>
        </div>
        <div style={{ flex: 1 }} />
        <SortSelect sort={sort} setSort={setSort} />
      </div>
      <div className={styles.itemsContainer}>
        <Scrollbars
          renderView={(props) => (
            <div
              {...props}
              style={{
                ...props.style,
                display: "block",
                overflow: "scroll",
                marginBottom: "-17px",
                marginRight: "-17px",
              }}
            />
          )}
          renderTrackVertical={(props) => (
            <div
              {...props}
              style={{
                position: "absolute",
                top: "2px",
                bottom: "2px",
                right: "2px",
                width: "5px",
                borderRadius: "3px",
              }}
            />
          )}
          renderThumbVertical={(props) => (
            <div
              {...props}
              style={{
                position: "relative",
                display: "block",
                width: "100%",
                cursor: "pointer",
                backgroundColor: "#6a6a93",
                borderRadius: "10px",
                opacity: 0.4,
              }}
            />
          )}
        >
          {scoredListings.length !== 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {filteredListings.slice(0, 84).map((listing) => (
                <ListingCard
                  listing={listing}
                  key={listing.id}
                  scoreFocus={scoreFocus}
                />
              ))}
            </div>
          ) : (
            <SkeletonTheme
              baseColor="#26263d"
              highlightColor="#2d2d47"
              borderRadius="10px"
              duration={2}
            >
              <Skeleton
                count={150}
                width="200px"
                height="300px"
                inline
                style={{
                  margin: "0.5rem",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                }}
              />
            </SkeletonTheme>
          )}
        </Scrollbars>
      </div>
    </div>
  );
};

export default MarketListings;
