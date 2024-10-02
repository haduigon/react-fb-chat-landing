import React from 'react';
import { Dispatch, useReducer } from "react";
import { ACTIONS, QUIZ_ACTIONS } from '../helpers/enums';
import { InputFileds } from '../helpers/types';

type Action = { type: ACTIONS.SET_FORECAST, payload: string }
| { type: ACTIONS.SET_ONLINE, payload: boolean}
// | { type: ACTIONS.SET_NAME, payload: string}

interface Data {
  forecast: string,
  isOnline: boolean,
  // name: string,
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
    // case ACTIONS.SET_NAME: 
    //   return {
    //     ...state,
    //     name: action.payload,
    //   }
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
    // name: '',
  },
  dispatch: () => { }
};

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
}

type QuizAction = {
  type: QUIZ_ACTIONS.SET_FIELD; fieldName: keyof InputFileds; payload: string | boolean
}

type QuizState = {
  state: InputFileds,
  dispatch: Dispatch<QuizAction>
}

const quizInitialState: QuizState = {
  state: {
  name: '',
  day: '',
  month: '',
  year: '',
  isMarried: '',
  partnerDay: '',
  partnerMonth: '',
  partnerYear: '',
  childDay: '',
  childMonth: '',
  childYear: '',
  hasChildren: '',
  futureChild: '',
  futureChildName: '',
  },
  dispatch: () => { },
}

function quizReducer(state: InputFileds, action: QuizAction) {
  switch (action.type) {
    case QUIZ_ACTIONS.SET_FIELD: {
      return {
        ...state, 
        [action.fieldName]: action.payload,
      }
    }
  }
}

export const QuizContext = React.createContext<QuizState>(quizInitialState);

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

export const QuizContextProvider: React.FC<Props> = ({ children }) => {
  
  const [state, dispatch] = useReducer(quizReducer, quizInitialState.state);
  
  return (
    <QuizContext.Provider value={{
      state: {
        ...state,
      },
      dispatch,
    }}>
      {children}
    </QuizContext.Provider>
  )
}