/*
Consuming Context in a Nice Way
To consume spinner context values in any component, we have to import the context directly as well as the useContext hook. We can make it a bit less tedious by using a wrapper for the useContext hook call. Head to the GlobalSpinnerContext.js file. We will not be exporting Context values directly anymore, but instead custom functions to consume contexts.
*/

/*
We don’t have to import useContext and spinner Contexts directly anymore. Instead, we have an interface to consume these values. There is another useful improvement we can make. useContext should only be called inside a Context.Provider. To ensure we don’t make the mistake of using a context outside of a Provider, we can check if there is any context value.
*/

import React, { useState, createContext, useContext } from "react";

const GlobalSpinnerContext = createContext();
const GlobalSpinnerActionsContext = createContext();

/*
export const useGlobalSpinnerContext = () => {
  const context = useContext(GlobalSpinnerContext);
  if (context === undefined) {
    throw new Error("useGlobalSpinnerContext must be called within GlobalSpinnerContextProvider");
  };
  return context;
};

export const useGlobalSpinnerActionsContext = () =>{
  const context = useContext(GlobalSpinnerActionsContext);
  if (context === undefined) {
    throw new Error("useGlobalSpinnerActionsContext must be called within GlobalSpinnerContextProvider");
  };
  return context;
};
*/

// reusable factory function
/* eslint-disable */
const useContextFactory = (name, context) => {
  return () => {
    const ctx = useContext(context);

    if (ctx === undefined) {
      throw new Error(
        `use${name} must be called within GlobalSpinnerContextProvider`
      );
    }
    return ctx;
  };
};
/* eslint-disable */

export const useGlobalSpinnerContext = useContextFactory(
  "GlobalSpinnerContext",
  GlobalSpinnerContext
);
export const useGlobalSpinnerActionsContext = useContextFactory(
  "ClobalSpinnerActionsContext",
  GlobalSpinnerActionsContext
);

const GlobalSpinnerContextProvider = props => {
  const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false);

  return (
    <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
      <GlobalSpinnerActionsContext.Provider value={setGlobalSpinner}>
        {props.children}
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContextProvider;

/*
All context consumers are re-rendered whenever a value passed to the Provider changes. This means that if we change visibility of the spinner or a parent component re-renders, both GlobalSpinner and RandomComments components will re-render. This is because we are creating a new inline object for the Provider value. One way to fix this is to use useMemo hook which would memoize the value object. It would only be re-created when isGlobalSpinnerOn value changes.
*/

/*
mport React, { useState, createContext, useMemo } from "react";

export const GlobalSpinnerContext = createContext();

const GlobalSpinnerContextProvider = props => {
  const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false);

  const value = useMemo(
    () => ({
      isGlobalSpinnerOn,
      setGlobalSpinner
    }),
    [isGlobalSpinnerOn]
  );

  return (
    <GlobalSpinnerContext.Provider value={ value }>
      {props.children}
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContextProvider;
*/

/*
This fixes the issue of re-creating a new object on every render and thus re-rendering all consumers.

Avoiding Re-rendering of All Context Consumers
As we have it now, a new value object will be created whenever spinner visibility changes. However, while the GlobalSpinner component relies on the isGlobalSpinnerOn, it does not rely on the setGlobalSpinner function. Likewise, RandomComments requires access to the setGlobalSpinner function only. Therefore, it does not make sense to have RandomComments re-render every time the spinner visibility changes, as the component does not directly depend on it. Therefore, to avoid this issue we can create another context to separate isGlobalSpinnerOn and setGlobalSpinner.
*/

/*
import React, { useState, createContext } from "react";

export const GlobalSpinnerContext = createContext();
export const GlobalSpinnerActionsContext = createContext();

const GlobalSpinnerContextProvider = props => {
  const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false);

  return (
    <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
      <GlobalSpinnerActionsContext.Provider value={setGlobalSpinner}>
        {props.children}
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContextProvider;
*/
