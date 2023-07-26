import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/listing_styles.module.scss";
import React from "react";
import { ScoredListing } from "../types/Listing";
import { getListingScore } from "../utils/utils";
import ListingCard from "@/components/ListingCard";
import "../styles/globals.scss";
import Select from "react-select";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const [scoredListings, setScoredListings] = useState<ScoredListing[]>([]);

  const [sort, setSort] = useState<
    | "priceAsc"
    | "priceDsc"
    | "ratingAsc"
    | "ratingDsc"
    | "floatAsc"
    | "floatDsc"
  >("ratingDsc");

  const sortOptions = [
    { value: "priceAsc", label: "Lowest Price" },
    { value: "priceDsc", label: "Highest Price" },
    { value: "ratingAsc", label: "Lowest Rating" },
    { value: "ratingDsc", label: "Highest Rating" },
    { value: "floatAsc", label: "Lowest Float" },
    { value: "floatDsc", label: "Highest Float" },
  ];

  const sortedListings = () => {
    switch (sort) {
      case "priceAsc":
        return scoredListings.sort((a, b) =>
          a.price && b.price && a.price > b.price ? 1 : -1
        );
      case "priceDsc":
        return scoredListings.sort((a, b) =>
          a.price && b.price && a.price > b.price ? -1 : 1
        );
      case "ratingAsc":
        return scoredListings.sort((a, b) =>
          a.score.total && b.score.total && a.score.total > b.score.total
            ? 1
            : -1
        );
      case "ratingDsc":
        return scoredListings.sort((a, b) =>
          a.score.total && b.score.total && a.score.total > b.score.total
            ? -1
            : 1
        );
      case "floatAsc":
        return scoredListings.sort((a, b) =>
          a.float && b.float && a.float > b.float ? 1 : -1
        );
      case "floatDsc":
        return scoredListings.sort((a, b) =>
          a.float && b.float && a.float > b.float ? -1 : 1
        );
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
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "rgb(27 27 41)",
                  color: "white",
                  border: 0,
                  minHeight: 0,
                  boxShadow: "none",
                }),
                container: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "rgb(27 27 41)",
                  color: "white",
                  marginRight: "0.5rem",
                  border: 0,
                }),
                valueContainer: (baseStyles, state) => ({
                  ...baseStyles,
                  paddingTop: 0,
                  paddingBottom: 0,
                }),
                singleValue: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "#696995",
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "rgb(27 27 41)",
                  color: "white",
                }),
                indicatorSeparator: (baseStyles, state) => ({
                  ...baseStyles,
                  display: "none",
                }),
                indicatorsContainer: (baseStyles, state) => ({
                  ...baseStyles,
                  alignSelf: "center",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "rgb(27 27 41)",
                  "&:hover": {
                    backgroundColor: "#44446d",
                  },
                }),
                dropdownIndicator: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "#696995",
                  paddingTop: 0,
                  paddingBottom: 0,
                }),
              }}
              options={sortOptions}
              onChange={(e) => e && setSort(e.value as any)}
              value={
                sortOptions.find((option) => option.value === sort) ??
                sortOptions[0]
              }
              placeholder="Select an option"
            />
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
