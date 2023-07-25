import React, { FC } from "react";
import styles from "@/styles/listing_styles.module.scss";
import clsx from "clsx";
import Tilt from "react-parallax-tilt";
import { ScoredListing } from "@/types/Listing";

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
    case "Covert":
      return "rgb(255 0 0 / 58%)";
    case "Classified":
      return "rgb(255 67 242 / 58%)";
    case "Restricted":
      return "rgb(157 0 255 / 42%)";
    case "Mil-Spec Grade":
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
    >
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
            <div className={styles.details}>
              <div className={styles.header}>
                <p className={styles.name}>{listing.skins.name}</p>
                <p className={styles.price}>
                  ${listing.price && listing.price / 100}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <p className={styles.collection}>
                  {listing.skins.collections?.name
                    ? listing.skins.collections.name?.replace("The", "")
                    : ""}
                </p>
                <div style={{ flex: 1 }} />

                <p className={styles.suggestedPrice}>
                  ${listing.market_price && listing.market_price / 100}
                </p>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  {listing.stat_trak && (
                    <p
                      style={{
                        color: "#ff7e23",
                        paddingRight: "0.4rem",
                        fontSize: "0.8em",
                        paddingBottom: "0.3rem",
                        fontWeight: "bold",
                      }}
                    >
                      {listing.stat_trak ? "StatTrak™" : ""}
                    </p>
                  )}
                  <div className={styles.subCategoryContainer}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p className={styles.subCategory}>
                        {listing.skins.weapon}
                      </p>
                    </div>
                  </div>
                  <div className={styles.wearContainer}>
                    {listing.float_rank && listing.float_rank > 0 ? (
                      <div
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
                    style={{
                      fontSize: "1.4em",
                      fontWeight: "bold",
                      opacity: 0.75,
                      textShadow: "0px 0px 3px black",
                      color: listing.score
                        ? scoreColor(listing.score)
                        : "white",
                    }}
                  >
                    {listing.score}
                  </div>
                </div>
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
