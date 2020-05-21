import React from "react";

import "./GlobalSpinner.css";

import { useGlobalSpinnerContext } from "./../contexts/GlobalSpinnerContext";

const GlobalSpinner = props => {
  const isGlobalSpinnerOn = useGlobalSpinnerContext();
  return isGlobalSpinnerOn ? (
    <div className="global-spinner-overlay">
      <p>Loading...</p>
    </div>
  ) : null;
};

export default GlobalSpinner;
