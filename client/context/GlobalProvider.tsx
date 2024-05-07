import axios from "@/api/axios";
import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
  useState,
} from "react";

// Define your user type based on the Prisma User model
type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  createdAt: string;
};

// Define your global state type
type GlobalState = {
  currentUser: User | null;
  userId: string;
  isLogged: boolean;
  loading: boolean;
  // You can add more properties to your global state as needed
};

// Define actions
type Action =
  | { type: "SET_CURRENT_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_USER_ID"; payload: string }
  | { type: "SET_IS_LOGGED"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean };

// Define initial state
const initialState: GlobalState = {
  currentUser: null,
  userId: "",
  isLogged: false,
  loading: false,
};

// Create context
const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define reducer function
const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return {
        currentUser: null,
        isLogged: false,
        userId: "",
        loading: false,
      };
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_IS_LOGGED":
      return { ...state, isLogged: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const res = await axios.post("/user", {
          userId: state.userId,
        });
        console.log(res.data);
        dispatch({ type: "SET_CURRENT_USER", payload: res.data });
        if (res.data) {
          dispatch({ type: "SET_IS_LOGGED", payload: true });
          dispatch({ type: "SET_USER_ID", payload: res.data.id });
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use global state and dispatch
export const useGlobal = () => useContext(GlobalContext);
