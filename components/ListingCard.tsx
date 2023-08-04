import React, { FC, use, useState } from "react";
import styles from "@/styles/listing_styles.module.scss";
import clsx from "clsx";
import Tilt from "react-parallax-tilt";
import { ScoredListing } from "@/types/Listing";
import { Tooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FloatRank from "@/types/FloatRank";
import Skin from "@/types/Skin";
import MarketPrice from "@/types/MarketPrice";

const exteriorAbbreviation = (exterior: string) => {
  switch (exterior) {
    case "Factory New":
      return "FN";
    case "Minimal Wear":
      return "MW";
    case "Field-Tested":
      return "FT";
    case "Well-Worn":
      return "WW";
    case "Battle-Scarred":
      return "BS";
    default:
      return "";
  }
};
const rarityBackgroundClass = (rarity: string) => {
  switch (rarity) {
    case "Covert":
      return styles.covertBackground;
    case "Classified":
      return styles.classifiedBackground;
    case "Restricted":
      return styles.restrictedBackground;
    case "Mil-Spec":
      return styles.milSpecBackground;
    case "Industrial Grade":
      return styles.industrialBackground;
    case "Consumer Grade":
      return styles.consumerBackground;
    default:
      return "";
  }
};

const rarityBorderClass = (rarity: string) => {
  switch (rarity) {
    case "Covert":
      return styles.covertBorder;
    case "Classified":
      return styles.classifiedBorder;
    case "Restricted":
      return styles.restrictedBorder;
    case "Mil-Spec":
      return styles.milSpecBorder;
    case "Industrial Grade":
      return styles.industrialBorder;
    case "Consumer Grade":
      return styles.consumerBorder;
    default:
      return "";
  }
};

const rarityColor = (rarity: string) => {
  switch (rarity) {
    case "Contraband":
      return "orange";
    case "Covert":
      return "rgb(255 0 0 / 58%)";
    case "Classified":
      return "rgb(255 67 242 / 58%)";
    case "Restricted":
      return "rgb(157 0 255 / 42%)";
    case "Mil-Spec":
      return "rgb(0 20 255 / 56%)";
    case "Industrial Grade":
      return "rgb(33 132 255 / 57%)";
    case "Consumer Grade":
      return "rgb(159 159 159 / 42%)";
    default:
      return "";
  }
};

const scoreColor = (score: number) => {
  if (score > 300) {
    return "rgb(9 213 81)";
  } else if (score > 200) {
    return "rgb(216 255 0)";
  } else if (score > 100) {
    return "rgb(255 129 0)";
  } else if (score > 50) {
    return "rgb(255 77 23)";
  }
};

interface ListingCardProps {
  listing: ScoredListing;
}

const ListingCard: FC<ListingCardProps> = ({ listing }) => {
  const [hovered, setHovered] = useState(false);
  const [floatRankings, setFloatRankings] = useState<FloatRank[]>([]);
  const [collectionSkins, setCollectionSkins] = useState<Skin[]>([]);
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [noPrices, setNoPrices] = useState(false);

  const rank = listing.float_rank ?? -1;

  const fetchRankings = async () => {
    if (floatRankings?.length > 0) return;
    await fetch("/api/db/floats", {
      method: "POST",
      body: JSON.stringify({
        skin_id: listing.skin_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFloatRankings(data);
      });
  };

  const fetchCollection = async () => {
    if (floatRankings?.length > 0) return;
    await fetch("/api/db/collection", {
      method: "POST",
      body: JSON.stringify({
        collection_id: listing.skins.collection_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCollectionSkins(data);
      });
  };

  const fetchPrices = async () => {
    if (floatRankings?.length > 0) return;
    await fetch("/api/db/prices", {
      method: "POST",
      body: JSON.stringify({
        secondary_skin_id: listing.skins.secondary_skin_id,
        exterior: listing.exterior,
        stat_trak: listing.stat_trak,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || data?.length === 0) setNoPrices(true);
        setPrices(data);
      });
  };

  const minFloatWidth = (listing.skins?.min_float ?? 0) * 100;
  const maxFloatWidth = (1 - (listing.skins?.max_float ?? 1)) * 100;
  const floatRange = 100 - (maxFloatWidth - minFloatWidth);

  const scoreCard = ReactDOMServer.renderToStaticMarkup(
    <div style={{ width: "220px", padding: "0.5rem" }}>
      <p style={{ fontWeight: "bold", paddingBottom: "1rem" }}>
        Rating breakdown
      </p>
      {listing.score.priceDifference !== 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <p style={{ opacity: 0.5 }}>Price difference</p>
          <span style={{ flex: 1 }} />
          <p style={{ color: "#2da156", fontWeight: "bold" }}>
            +{Math.round(listing.score.priceDifference)}
          </p>
        </div>
      )}
      {listing.score.floatRank !== 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <p style={{ opacity: 0.5 }}>Float ranking</p>
          <span style={{ flex: 1 }} />
          <p style={{ color: "#2da156", fontWeight: "bold" }}>
            +{Math.round(listing.score.floatRank)}
          </p>
        </div>
      )}
      {listing.score.collectionDate !== 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <p style={{ opacity: 0.5 }}>Collection age</p>
          <span style={{ flex: 1 }} />
          <p style={{ color: "#2da156", fontWeight: "bold" }}>
            +{Math.round(listing.score.collectionDate)}
          </p>
        </div>
      )}
      {listing.score.statTrak !== 0 && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ opacity: 0.5 }}>StatTrak</p>
          <span style={{ flex: 1 }} />
          <p style={{ color: "#2da156", fontWeight: "bold" }}>
            +{Math.round(listing.score.statTrak)}
          </p>
        </div>
      )}
      {listing.score.floatRangeMultiplier >= 1 && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ opacity: 0.5 }}>Position in float range</p>
          <span style={{ flex: 1 }} />
          <p style={{ color: "#2da156", fontWeight: "bold" }}>
            +{Math.round(listing.score.floatRangeMultiplier)}
          </p>
        </div>
      )}
    </div>
  );

  const rankings = ReactDOMServer.renderToStaticMarkup(
    <div
      style={{
        width: "240px",
        padding: "0.5rem",
        paddingTop: 0,
      }}
    >
      {floatRankings.length > 0 ? (
        floatRankings
          .map((ranking: FloatRank, index) => {
            const opacity =
              index === rank - 2 || index === listing.float_rank
                ? 0.8
                : index === rank - 3 || index === rank + 1
                ? 0.6
                : index === rank - 4 || index === rank + 2
                ? 0.4
                : index === rank - 5 || index === rank + 3
                ? 0.2
                : 1;
            return (
              <div
                key={ranking.csgofloat_id}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "0.4rem",
                  color: index === rank - 1 ? "#8b8bdf" : "white",
                  fontWeight: index === rank - 1 ? "bold" : "normal",
                  opacity: opacity,
                }}
              >
                <p style={{ marginRight: "1rem" }}>#{index + 1}</p>
                <span style={{ flex: 1 }} />
                <p style={{ justifySelf: "flex-end" }}>
                  {ranking?.float_value?.toFixed(20)}
                </p>
              </div>
            );
          })
          .slice(rank - 5 <= 0 ? 0 : rank - 5, rank + 4 >= 200 ? 200 : rank + 4)
      ) : (
        <SkeletonTheme
          baseColor="#353535"
          highlightColor="#494949"
          borderRadius="10px"
          duration={2}
        >
          <Skeleton
            count={10}
            width="220px"
            height="10px"
            inline
            style={{ marginTop: "0.4rem" }}
          />
        </SkeletonTheme>
      )}
    </div>
  );

  const collection = ReactDOMServer.renderToStaticMarkup(
    <div
      style={{
        width: "500px",
        paddingBottom: "1rem",
      }}
    >
      <div
        style={{
          marginBottom: "1rem",
          marginTop: "0.5rem",
          display: "flex",
          alignItems: "center",
          paddingLeft: "0.6rem",
        }}
      >
        <p style={{ fontWeight: "bold" }}>{listing.skins.collections?.name}</p>
        <div
          style={{
            backgroundColor: "rgb(51 51 77)",
            padding: "0.2rem",
            borderRadius: "100px",
            color: "white",
            marginLeft: "0.5rem",
          }}
        >
          <p
            style={{
              paddingLeft: "0.4rem",
              paddingRight: "0.4rem",
              fontWeight: "bold",
              fontSize: "1em",
            }}
          >
            {collectionSkins.length}
          </p>
        </div>
        <div style={{ flex: 1 }} />
        <p style={{ color: "#8b8bdf", opacity: 0.8 }}>
          {listing.skins.collections?.collection_date}
        </p>
      </div>
      {collectionSkins.length > 0 ? (
        collectionSkins.map((skin: Skin, index) => {
          return (
            <div
              key={skin.skin_id}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0.2rem",
                paddingBottom: "0.2rem",
                paddingLeft: "0.6rem",
                paddingRight: "0.6rem",
                backgroundColor: index % 2 === 0 ? "#212121" : "inherit",
              }}
            >
              <p
                style={{ marginRight: "1rem", flexBasis: "25%", opacity: 0.4 }}
              >
                {skin.weapon}
              </p>
              <p
                style={{
                  color: skin.skin_id === listing.skin_id ? "#8b8bdf" : "white",
                  fontWeight:
                    skin.skin_id === listing.skin_id ? "bold" : "normal",
                }}
              >
                {skin.name}
              </p>
              <span style={{ flex: 1 }} />

              <p
                style={{
                  justifySelf: "flex-end",
                  color: "white",
                  opacity: 0.4,
                  paddingLeft: "0.4rem",
                  paddingRight: "0.4rem",
                }}
              >
                {skin.quality}
              </p>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: skin.quality
                    ? rarityColor(skin.quality)
                    : "black",
                  borderRadius: "100px",
                  marginLeft: "0.5rem",
                }}
              />
            </div>
          );
        })
      ) : (
        <SkeletonTheme
          baseColor="#353535"
          highlightColor="#494949"
          borderRadius="10px"
          duration={2}
        >
          <Skeleton
            count={10}
            width="100%"
            height="10px"
            inline
            style={{ marginTop: "0.4rem" }}
          />
        </SkeletonTheme>
      )}
    </div>
  );

  const priceCard = ReactDOMServer.renderToStaticMarkup(
    <div
      style={{
        width: "250px",
        paddingBottom: "1rem",
        paddingTop: "0.7rem",
      }}
    >
      <p
        style={{
          fontWeight: "bold",
          paddingBottom: "1rem",
          paddingLeft: "0.6rem",
        }}
      >
        Market prices
      </p>
      {prices?.length > 0 ? (
        [
          ...prices,
          {
            Market_Listing_ID: "0",
            Market_Name: "Item price",
            price: listing.price && listing.price / 100,
            created_at: "",
            Skin_Base_Id: "0",
            Skin_Link: "",
            Wear: "",
          },
        ]
          .sort((a, b) => (a.price && b.price && a.price < b.price ? -1 : 1))
          .map((price: MarketPrice, index) => {
            return (
              <div
                key={price.Market_Listing_ID}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0.4rem",
                  paddingBottom: "0.2rem",
                  paddingLeft: "0.6rem",
                  paddingRight: "0.6rem",
                  backgroundColor: index % 2 === 0 ? "#212121" : "inherit",
                }}
              >
                <p
                  style={{
                    marginRight: "1rem",
                    opacity: price.Market_Name === "Item price" ? 1 : 0.4,
                    color: price.Market_Name === "Item price" ? "#8b8bdf" : "",
                    fontWeight:
                      price.Market_Name === "Item price" ? "bold" : "",
                  }}
                >
                  {price.Market_Name}
                </p>
                <div style={{ flex: 1 }} />
                <p
                  style={{
                    color: price.Market_Name === "Item price" ? "#8b8bdf" : "",
                    fontWeight:
                      price.Market_Name === "Item price" ? "bold" : "",
                  }}
                >
                  ${price.price?.toFixed(2)}
                </p>
              </div>
            );
          })
      ) : noPrices ? (
        <p style={{ paddingLeft: "0.6rem", opacity: 0.4 }}>No prices found</p>
      ) : (
        <SkeletonTheme
          baseColor="#353535"
          highlightColor="#494949"
          borderRadius="10px"
          duration={2}
        >
          <Skeleton
            count={1}
            width="100%"
            height="10px"
            inline
            style={{ marginTop: "0.4rem" }}
          />
        </SkeletonTheme>
      )}
    </div>
  );

  return (
    <div
      style={{
        margin: "0.8rem",
        width: "230px",
        minWidth: "230px",
        maxWidth: "230px",
        height: "330px",
        minHeight: "330px",
        maxHeight: "330px",
        borderRadius: "10px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <>
          <Tooltip
            id="score"
            place="right"
            style={{
              zIndex: 100,
              backgroundColor: "#1a1a1a",
            }}
            opacity={1}
          />
          <Tooltip
            id="ranking"
            place="left"
            style={{
              zIndex: 100,
              backgroundColor: "#1a1a1a",
            }}
            opacity={1}
          />
          <Tooltip
            id="collection"
            place="left"
            style={{
              zIndex: 100,
              backgroundColor: "#1a1a1a",
            }}
            opacity={1}
          />
          <Tooltip
            id="prices"
            place="right"
            style={{
              zIndex: 100,
              backgroundColor: "#1a1a1a",
            }}
            opacity={1}
          />
        </>
      )}
      <Tilt
        scale={1.05}
        glareEnable={true}
        glareBorderRadius="10px"
        glareColor={
          listing.skins.quality ? rarityColor(listing.skins.quality) : "white"
        }
        glareMaxOpacity={0.3}
        transitionSpeed={200}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        style={{ height: "100%" }}
      >
        <div
          className={clsx(
            styles.border,
            listing.skins.quality && rarityBorderClass(listing.skins.quality),
            listing.stat_trak && styles.stattrakBorder
          )}
          onClick={() =>
            window.open(
              `https://skinport.com/item/${listing.marketplace_url}/${listing.skinport_id}`,
              "_blank"
            )
          }
        >
          <div
            className={clsx(
              styles.container,
              listing.skins.quality &&
                rarityBackgroundClass(listing.skins.quality)
            )}
          >
            <div className={styles.imageContainer}>
              <img
                src={`https://steamcommunity-a.akamaihd.net/economy/image/${listing.image}`}
                className={styles.image}
              />
            </div>
            <div
              style={{
                position: "absolute",
                right: "15px",
                top: "15px",
                width: "70px",
                height: "52px",
              }}
              data-tooltip-id="prices"
              data-tooltip-html={priceCard}
              onMouseEnter={() => fetchPrices()}
            />
            <div className={styles.details}>
              <div className={styles.header}>
                <p className={styles.name}>{listing.skins.name}</p>
                <p className={styles.price}>
                  ${listing.price && listing.price / 100}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div className={styles.subCategoryContainer}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className={styles.subCategory}>{listing.skins.weapon}</p>
                  </div>
                </div>

                <div style={{ flex: 1 }} />
                <p className={styles.suggestedPrice}>
                  ${listing.market_price && listing.market_price / 100}
                </p>
              </div>
              {listing.stat_trak && (
                <p
                  style={{
                    color: "#ff7e23",
                    fontSize: "0.8em",
                    paddingTop: "0.3rem",
                    fontWeight: "bold",
                  }}
                >
                  {listing.stat_trak ? "StatTrak™" : ""}
                </p>
              )}
              <div style={{ flex: 1 }} />
              <img
                data-tooltip-id="collection"
                data-tooltip-html={collection}
                src={listing.skins.collections?.collection_image ?? ""}
                style={{
                  maxHeight: "55px",
                  maxWidth: "55px",
                  marginTop: "0.2rem",
                }}
                onMouseEnter={() => fetchCollection()}
              />
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <div className={styles.wearContainer}>
                    {listing.float_rank && listing.float_rank > 0 ? (
                      <div
                        data-tooltip-id="ranking"
                        data-tooltip-html={rankings}
                        onMouseEnter={() => fetchRankings()}
                        style={{
                          opacity: 0.9,
                          marginRight: "0.5rem",
                          display: "flex",
                          alignItems: "flex-end",
                          lineHeight: "0.9em",
                        }}
                      >
                        <p
                          style={{
                            color: "gold",
                            fontSize: "1em",
                            textShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
                          }}
                        >
                          #
                        </p>
                        <p
                          style={{
                            color: "gold",
                            paddingLeft: "0.2rem",
                            fontSize: "1.1em",
                            fontWeight: "bold",
                            lineHeight: "0.9em",
                            textShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
                          }}
                        >
                          {listing.float_rank &&
                            listing.float_rank > 0 &&
                            listing.float_rank}
                        </p>
                      </div>
                    ) : (
                      <p className={styles.exterior}>
                        {listing.exterior &&
                          exteriorAbbreviation(listing.exterior)}
                      </p>
                    )}

                    <p className={styles.float}>{listing.float?.toFixed(9)}</p>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      textAlign: "right",
                      fontSize: "0.8em",
                      paddingBottom: "0.2rem",
                      opacity: 0.4,
                      textShadow: "0px 0px 3px black",
                      color: "white",
                    }}
                  >
                    Rating
                  </p>
                  <div
                    data-tooltip-id="score"
                    data-tooltip-html={scoreCard}
                    style={{
                      fontSize: "1.4em",
                      fontWeight: "bold",
                      opacity: 0.75,
                      textShadow: "0px 0px 3px black",
                      color: listing.score
                        ? scoreColor(listing.score.total)
                        : "white",
                    }}
                  >
                    {Math.round(listing.score.total)}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: 0, position: "relative", width: "100%" }}>
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  height: "0.5rem",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "black",
                    opacity: 0.7,
                    width: `${Math.round(minFloatWidth)}%`,
                    height: "100%",
                    borderRadius: "20px 0 0 20px",
                  }}
                />
                <div
                  style={{
                    opacity: 0,
                    width: `${Math.round(floatRange)}%`,
                    height: "100%",
                  }}
                />
                <div
                  style={{
                    backgroundColor: "black",
                    opacity: 0.7,
                    width: `${Math.round(maxFloatWidth)}%`,
                    height: "100%",
                    borderRadius: "0 20px 20px 0",
                  }}
                />
              </div>
            </div>
            <div className={styles.floatBarContainer}>
              <div
                style={{
                  width: 0,
                  left: `${listing.float && Math.round(listing.float * 100)}%`,
                  position: "relative",
                }}
              >
                <div className={styles.floatMarker} />
              </div>
              <div className={styles.floatBar}>
                <div className={styles.factoryNew} />
                <div className={styles.minimalWear} />
                <div className={styles.fieldTested} />
                <div className={styles.wellWorn} />
                <div className={styles.battleScarred} />
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default ListingCard;
