import React from "react";

export const ServiceLogo = () => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/logo.png`}
      alt="logo"
      style={{ width: 35, marginRight: 10 }}
    />
  );
};
