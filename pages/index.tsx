import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/listing_styles.module.scss";
import React from "react";
import { ScoredListing } from "../types/Listing";
import { getListingScore } from "../utils/utils";
import ListingCard from "@/components/ListingCard";
import "../styles/globals.scss";

export default function Home() {
  const [scoredListings, setScoredListings] = useState<ScoredListing[]>([]);

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
        <div className={styles.itemsContainer}>
          {scoredListings
            .sort((a, b) => (a.score > b.score ? -1 : 1))
            .slice(0, 150)
            .map((listing) => (
              <ListingCard listing={listing} key={listing.id} />
            ))}
        </div>
      </main>
    </div>
  );
}
