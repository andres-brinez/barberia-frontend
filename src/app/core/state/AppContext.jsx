import { createContext, useReducer } from "react";

// Estado inicial
const initialState = {
  isUserLogged: false,
  token: "",
  email: "",
  userName: "",
  roles: [],
  
};

// Se crea el contexto
const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGGED":
      return { ...state, isUserLogged: true, email: action.payload.email, userName: action.payload.userName, roles: action.payload.roles, token: action.payload.token };
    case "USER_LOGGED_OUT":
      return { ...state, isUserLogged: false, userName: "", roles: [], email: "", token: "" };
    
    default:
      return state;
  }
};

// Proveedor del contexto
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };