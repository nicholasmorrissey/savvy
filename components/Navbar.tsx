import { FC } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

interface NavbarProps {
  smallRes?: boolean;
}

const Navbar: FC<NavbarProps> = ({ smallRes }) => {
  return (
    <div
      style={{
        height: "75px",
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
          alignItems: "flex-end",
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
            height: "60px",
          }}
        >
          Market
        </p>
      </div>
    </div>
  );
};

export default Navbar;
