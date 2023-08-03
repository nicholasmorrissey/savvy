import { FC, useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import "../styles/market_sidebar.scss";
import TextInput from "./TextInput";
import RadioButton from "./RadioButton";
import ReactSlider from "react-slider";
import ListingFilters from "@/types/ListingFilters";
import MultiSelect from "./MultiSelect";
import Collection from "@/types/Collection";

interface MarketSidebarProps {
  setFilters: React.Dispatch<React.SetStateAction<ListingFilters>>;
}

const MarketSidebar: FC<MarketSidebarProps> = ({ setFilters }) => {
  const priceStart = 0.02;
  const priceEnd = 15000;
  const priceRange = priceEnd - priceStart;
  const priceExponetialFactor = 6;

  const [minPrice, setMinPrice] = useState<number | null>(priceStart);
  const [maxPrice, setMaxPrice] = useState<number | null>(priceEnd);

  const [minFloat, setMinFloat] = useState<number | null>(0);
  const [maxFloat, setMaxFloat] = useState<number | null>(1);

  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);

  const [collections, setCollections] = useState<Collection[]>([]);

  const calculateExponentialPrice = (price: any) => {
    const scaledPrice = Math.pow(price / 1000, priceExponetialFactor);

    return priceStart + scaledPrice * priceRange;
  };

  const reverseExponentialSliderValue = (price: any) => {
    const priceRelative = price - priceStart;

    const scaledValue = Math.pow(
      priceRelative / priceRange,
      1 / priceExponetialFactor
    );

    // Map the scaled value from [0, 1] to [0, 1000] for the slider
    const sliderValue = Math.round(scaledValue * 1000);

    return sliderValue;
  };

  useEffect(() => {
    fetch("/api/db/collections")
      .then((res) => res.json())
      .then((data) =>
        setCollections(
          data?.map((c: Collection) => ({
            value: c.collection_id,
            label: c.name,
            collection_date: c.collection_date,
          }))
        )
      );
  }, []);

  useEffect(() => {
    setFilters({
      minPrice,
      maxPrice,
      minFloat,
      maxFloat,
      collections: selectedCollections,
      rarities: selectedRarities,
    });
  }, [
    minPrice,
    maxPrice,
    minFloat,
    maxFloat,
    selectedCollections,
    selectedRarities,
  ]);

  return (
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
      <Header label="Rating Focus" />
      <ul style={{ marginBottom: "1.5rem" }}>
        <li
          style={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RadioButton label="Top floats" />
        </li>
        <li
          style={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RadioButton label="Trade ups" />
        </li>
      </ul>
      <Header label="Filters" />
      <Subheader label="Price" />
      <div style={{ marginTop: "0.5rem", marginBottom: "0.2rem" }}>
        <ReactSlider
          // className="horizontal-slider"
          thumbClassName="floatThumb"
          trackClassName={"floatTrack"}
          max={1000}
          value={[
            reverseExponentialSliderValue(minPrice),
            reverseExponentialSliderValue(maxPrice),
          ]}
          defaultValue={[0, 1000]}
          ariaLabel={["Lower thumb", "Upper thumb"]}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => (
            <div {...props} style={{ ...props.style, outline: 0 }}>
              <div style={{ width: 0, position: "relative" }}>
                <div className="floatMarker" />
              </div>
            </div>
          )}
          pearling
          withTracks
          onChange={(value, index) => {
            const price = calculateExponentialPrice(
              index === 0 ? value[0] : value[1]
            );

            const formattedPrice =
              price < 1
                ? Number(price.toFixed(4))
                : price < 20
                ? Number(price.toFixed(2))
                : Math.round(price);

            if (index === 0) {
              setMinPrice(formattedPrice);
            } else {
              setMaxPrice(formattedPrice);
            }
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              height: "0.7rem",
              background: "linear-gradient(to right, #23233d, #5656b3)",
              borderRadius: "20px",
              width: "100%",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "1.5rem",
        }}
      >
        <TextInput
          type="text"
          placeholder="Min"
          spanProps={{ style: { marginRight: "1rem" } }}
          symbol="$"
          value={minPrice && minPrice !== priceStart ? minPrice : ""}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <TextInput
          type="text"
          placeholder="Max"
          symbol="$"
          value={maxPrice && maxPrice !== priceEnd ? maxPrice : ""}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>
      <Subheader label="Float" />
      <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
        <ReactSlider
          // className="horizontal-slider"
          thumbClassName="floatThumb"
          trackClassName={"floatTrack"}
          defaultValue={[0, 100]}
          ariaLabel={["Lower thumb", "Upper thumb"]}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => (
            <div {...props} style={{ ...props.style, outline: 0 }}>
              <div style={{ width: 0, position: "relative" }}>
                <div className="floatMarker" />
              </div>
            </div>
          )}
          pearling
          withTracks
          onChange={(value, index) =>
            index === 0
              ? setMinFloat(value[0] / 100)
              : setMaxFloat(value[1] / 100)
          }
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <div
            className="floatBar"
            style={{ marginBottom: "1rem", height: "0.7rem" }}
          >
            <div className="factoryNew" />
            <div className="minimalWear" />
            <div className="fieldTested" />
            <div className="wellWorn" />
            <div className="battleScarred" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginTop: "0.2rem",
            }}
          >
            <TextInput
              type="text"
              placeholder="Min"
              value={minFloat && minFloat > 0.01 ? minFloat : ""}
              spanProps={{ style: { marginRight: "1rem" } }}
            />
            <TextInput
              type="text"
              placeholder="Max"
              value={maxFloat && maxFloat !== 1 ? maxFloat : ""}
            />
          </div>
        </div>
      </div>
      <Subheader label="Collection" />
      <div style={{ marginBottom: "1.5rem" }}>
        <MultiSelect
          options={collections.sort((a, b) => {
            const collectionADate =
              (a.collection_date && Date.parse(a.collection_date)) ?? 0;

            const collectionBDate =
              (b.collection_date && Date.parse(b.collection_date)) ?? 0;

            return collectionADate > collectionBDate ? -1 : 1;
          })}
          onChange={(newValue: any) => {
            setSelectedCollections([...newValue].map((option) => option.value));
          }}
          placeholder="Select a collection"
        />
      </div>
      <Subheader label="Rarity" />
      <div style={{ marginBottom: "1.5rem" }}>
        <MultiSelect
          options={[
            { label: "Consumer Grade", value: "Consumer Grade" },
            { label: "Industrial Grade", value: "Industrial Grade" },
            { label: "Mil-Spec", value: "Mil-Spec" },
            { label: "Restricted", value: "Restricted" },
            { label: "Classified", value: "Classified" },
            { label: "Covert", value: "Covert" },
          ]}
          onChange={(newValue: any) => {
            setSelectedRarities([...newValue].map((option) => option.value));
          }}
          placeholder="Select a rarity"
        />
      </div>
    </div>
  );
};

const Header: FC<{ label: string }> = ({ label }) => {
  return (
    <>
      <h3
        style={{
          fontWeight: "normal",
          marginTop: 0,
          marginBottom: "1rem",
          color: "#6a6a93",
        }}
      >
        {label}
      </h3>
      <div
        style={{
          borderTop: "1px solid #6a6a93",
          marginBottom: "1.5rem",
          opacity: 0.2,
        }}
      />
    </>
  );
};

const Subheader: FC<{ label: string }> = ({ label }) => {
  return (
    <p
      style={{
        color: "#6a6a93",
        fontSize: "1em",
        marginBottom: "1rem",
      }}
    >
      {label}
    </p>
  );
};

export default MarketSidebar;
