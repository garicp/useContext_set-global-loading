import React from "react";

import GlobalSpinner from "./components/GlobalSpinner";
import GlobalSpinnerContextProvider from "./contexts/GlobalSpinnerContext";
import RandomComments from "./components/RandomComments";

import "./App.css";

const App = () => {
  return (
    <GlobalSpinnerContextProvider>
      <div className="App">
        <div className="App-header">
          <h1>useContext Hook Practice</h1>
          <GlobalSpinner />
          <RandomComments />
        </div>
      </div>
    </GlobalSpinnerContextProvider>
  );
};

export default App;
