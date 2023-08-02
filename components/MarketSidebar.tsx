import { FC } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import "../styles/market_sidebar.scss";
import TextInput from "./TextInput";
import RadioButton from "./RadioButton";
import ReactSlider from "react-slider";

interface MarketSidebarProps {
  filters?: any;
}

const MarketSidebar: FC<MarketSidebarProps> = ({ filters }) => {
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
        />
        <TextInput type="text" placeholder="Max" symbol="$" />
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
              spanProps={{ style: { marginRight: "1rem" } }}
            />
            <TextInput type="text" placeholder="Max" />
          </div>
        </div>
      </div>
      <Subheader label="Collection" />
      <div style={{ marginBottom: "1.5rem" }}>
        <TextInput type="text" placeholder="Select" />
      </div>
      <Subheader label="Rarity" />
      <div style={{ marginBottom: "1.5rem" }}>
        <TextInput type="text" placeholder="Select" />
      </div>
      <Subheader label="Market" />
      <div style={{ marginBottom: "1.5rem" }}>
        <TextInput type="text" placeholder="Select" />
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
