import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/listing_styles.module.scss";
import React from "react";
import { ScoredListing } from "../types/Listing";
import { getListingScore } from "../utils/utils";
import ListingCard from "@/components/ListingCard";
import "../styles/globals.scss";
import "../styles/waves.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SortSelect, { Sort } from "@/components/SortSelect";
import Scrollbars from "react-custom-scrollbars-2";
import TextInput from "@/components/TextInput";
import wave from "../public/wave.png";
import Logo from "/Savvy.png";
import Image from "next/image";
import { useResizeDetector } from "react-resize-detector";

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

  const { width, ref } = useResizeDetector();

  const smallRes = width && width < 2000;

  console.log(smallRes);

  // console.log(smallRes);

  return (
    <div>
      <Head>
        <title>Savvy</title>
        <link rel="icon" type="image/x-icon" href="savvy_favi.png"></link>
      </Head>
      <main
        style={{
          height: "100vh",
          position: "absolute",
          left: 0,
          right: 0,
          overflow: "hidden",
        }}
        ref={ref}
      >
        <div className="ocean">
          <div
            className="wave"
            style={{ background: "url('wave.png') repeat-x" }}
          ></div>
          <div
            className="wave wave2"
            style={{ background: "url('wave.png') repeat-x", opacity: 0.8 }}
          ></div>
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 100,
          }}
        >
          <div
            style={{
              height: "60px",
              display: "flex",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          >
            <div
              style={{
                width: "350px",
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "2.5rem",
                justifyContent: "center",
              }}
            >
              <img
                src="/savvy.png"
                style={{
                  height: "4rem",
                  marginLeft: "1rem",
                  position: "relative",
                  bottom: "-16px",
                }}
              />
            </div>
            <div
              style={{
                width: smallRes ? "1280px" : "1560px",
                display: "flex",
                alignItems: "center",
                marginRight: "auto",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                  borderBottom: "4px solid #6a6a93",
                  height: "100%",
                }}
              >
                Market
              </p>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              overflow: "hidden",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          >
            <div
              style={{
                width: "350px",
                display: "flex",
                marginLeft: "auto",
                marginTop: "2rem",
                marginRight: "1rem",
                marginBottom: "2rem",
                borderRadius: "20px",
                border: "2px solid rgb(43 43 65)",
                backgroundColor: "#161623",
                padding: "2rem",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  fontWeight: "normal",
                  marginTop: 0,
                  marginBottom: "1rem",
                  color: "#6a6a93",
                }}
              >
                Rating Focus
              </h3>
              <div
                style={{
                  borderTop: "1px solid #6a6a93",
                  marginBottom: "1.5rem",
                  opacity: 0.2,
                }}
              />
              <ul>
                <li
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "5px",
                      border: "1px solid rgb(84 84 117)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "10px",
                        backgroundColor: "rgb(106, 106, 147)",
                      }}
                    />
                  </div>
                  <span style={{ color: "#6a6a93", paddingLeft: "1rem" }}>
                    Top floats
                  </span>
                </li>
                <li
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "5px",
                      border: "1px solid rgb(84 84 117)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "10px",
                        backgroundColor: "inherit",
                      }}
                    />
                  </div>
                  <span style={{ color: "#6a6a93", paddingLeft: "1rem" }}>
                    Trade ups
                  </span>
                </li>
              </ul>
              <h3
                style={{
                  fontWeight: "normal",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#6a6a93",
                }}
              >
                Filters
              </h3>
              <div
                style={{
                  borderTop: "1px solid #6a6a93",
                  marginBottom: "1.5rem",
                  opacity: 0.2,
                }}
              />
              <p
                style={{
                  color: "#6a6a93",
                  fontSize: "1em",
                  marginBottom: "1rem",
                }}
              >
                Price
              </p>
              <div
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <TextInput
                  type="text"
                  placeholder="Min"
                  spanProps={{ style: { marginRight: "1rem" } }}
                  symbol="$"
                />
                <TextInput type="text" placeholder="Max" symbol="$" />
              </div>
              <p
                style={{
                  color: "#6a6a93",
                  fontSize: "1em",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                Float
              </p>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className={styles.floatBar}
                  style={{ marginBottom: "1rem", height: "0.7rem" }}
                >
                  <div className={styles.factoryNew} />
                  <div className={styles.minimalWear} />
                  <div className={styles.fieldTested} />
                  <div className={styles.wellWorn} />
                  <div className={styles.battleScarred} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "0.5rem",
                  }}
                >
                  <TextInput
                    type="text"
                    placeholder="Min"
                    spanProps={{ style: { marginRight: "1rem" } }}
                  />
                  <TextInput type="text" placeholder="Max" />
                </div>
              </div>
            </div>
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
                        {scoredListings.length}
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
                  <h2 style={{ marginLeft: "1rem" }}>Listings</h2>
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
                      {sortedListings()
                        .slice(0, 84)
                        .map((listing) => (
                          <ListingCard listing={listing} key={listing.id} />
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
                        style={{ margin: "0.5rem" }}
                      />
                    </SkeletonTheme>
                  )}
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
