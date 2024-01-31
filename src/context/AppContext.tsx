import React from 'react';
import { Dispatch, useReducer } from "react";
import { ACTIONS } from '../helpers/enums';

type Action = { type: ACTIONS.SET_FORECAST, payload: string }
| { type: ACTIONS.SET_ONLINE, payload: boolean}

interface Data {
  forecast: string,
  isOnline: boolean,
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case ACTIONS.SET_FORECAST: 
      return {
        ...state,
        forecast: action.payload,
      }
    case ACTIONS.SET_ONLINE: 
      return {
        ...state,
        isOnline: action.payload,
      }
  }
}

type State = {
  state: Data,
  dispatch: Dispatch<Action>,
}

const initialState: State = {
  state: {
    forecast: '',
    isOnline: true,
  },
  dispatch: () => { }
};

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState.state);
  return (
    <StateContext.Provider value={{
      state: {
        ...state,
      },
      dispatch,
    }}>
      {children}
    </StateContext.Provider>
  )
}