import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/listing_styles.module.scss";
import React from "react";
import { ScoredListing } from "../types/Listing";
import { getListingScore } from "../utils/utils";
import ListingCard from "@/components/ListingCard";
import "../styles/globals.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SortSelect, { Sort } from "@/components/SortSelect";

export default function Home() {
  const [scoredListings, setScoredListings] = useState<ScoredListing[]>([]);

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
          a.score.total && b.score.total && a.score.total > b.score.total
            ? 1
            : -1
        );
      case Sort.RatingDsc:
        return scoredListings.sort((a, b) =>
          a.score.total && b.score.total && a.score.total > b.score.total
            ? -1
            : 1
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
          scoredListings.push({ ...listing, score: score });
        }

        setScoredListings(scoredListings);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Skins</title>
      </Head>
      <main>
        <div
          style={{
            maxWidth: "1534px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              marginLeft: "0.7rem",
              marginTop: "3rem",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: "#3a3a59",
                  padding: "0.5rem",
                  borderRadius: "100px",
                  color: "white",
                }}
              >
                <h2 style={{ paddingLeft: "0.7rem", paddingRight: "0.7rem" }}>
                  {scoredListings.length}
                </h2>
              </div>
              <h1 style={{ marginLeft: "1rem" }}>Listings</h1>
            </div>
            <div style={{ flex: 1 }} />
            <SortSelect sort={sort} setSort={setSort} />
          </div>
          <div className={styles.itemsContainer}>
            {scoredListings.length !== 0 ? (
              sortedListings()
                .slice(0, 150)
                .map((listing) => (
                  <ListingCard listing={listing} key={listing.id} />
                ))
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
                  style={{ margin: "0.5rem" }}
                />
              </SkeletonTheme>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
