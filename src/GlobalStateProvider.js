import React, { useReducer, createContext, useContext } from 'react';

const initialState = {
  groupBy: 'status', // Default grouping
  sortBy: 'priority', // Default sorting
};


// Reducer function to handle state updates
function globalStateReducer(state, action) {
  switch (action.type) {
    case 'SET_GROUP_BY':
      return { ...state, groupBy: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

// context for global state
const GlobalStateContext = createContext();

// Context Provider component
export function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);
  
  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// Custom hook to access the global state
export function useGlobalState() {
  return useContext(GlobalStateContext);
}
