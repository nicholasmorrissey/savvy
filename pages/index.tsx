import Head from "next/head";
import React, { useState } from "react";
import "../styles/globals.scss";
import "../styles/waves.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { useResizeDetector } from "react-resize-detector";
import MarketSidebar from "@/components/MarketSidebar";
import Navbar from "@/components/Navbar";
import MarketListings from "@/components/MarketListings";
import ListingFilters from "@/types/ListingFilters";

export default function Home() {
  const { width, ref } = useResizeDetector();
  const smallRes = width ? width < 2000 : false;

  const [filters, setFilters] = React.useState<ListingFilters>({
    minPrice: 0.2,
    maxPrice: 15000,
    minFloat: 0,
    maxFloat: 1,
    collections: [],
    rarities: [],
  });

  const [scoreFocus, setScoreFocus] = useState<"Top floats" | "Stickers">(
    "Top floats"
  );

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
        </div>
        <div className="ocean2">
          <div
            className="wave wave2"
            style={{ background: "url('wave.png') repeat-x" }}
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
          <Navbar smallRes={smallRes} />
          <div
            style={{
              flex: 1,
              display: "flex",
              overflow: "hidden",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          >
            <MarketSidebar
              setFilters={setFilters}
              scoreFocus={scoreFocus}
              setScoreFocus={setScoreFocus}
            />
            <MarketListings
              smallRes={smallRes}
              filters={filters}
              scoreFocus={scoreFocus}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
