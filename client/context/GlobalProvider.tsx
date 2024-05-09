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

export type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  createdAt: string;
};

export type Ingredient = {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  isComplete: boolean;
  createdAt: Date;
  userId: string;
};

type GlobalState = {
  currentUser: User | null;
  ingredients: Ingredient[];
  recipes: Recipe[];
  userId: string;
  isLogged: boolean;
  loading: boolean;
};

type Action =
  | { type: "SET_CURRENT_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_USER_ID"; payload: string }
  | { type: "SET_IS_LOGGED"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CURRENT_INGREDIENTS"; payload: Ingredient[] }
  | { type: "ADD_TO_CURRENT_INGREDIENTS"; payload: Ingredient }
  | { type: "DELETE_ONE_INGREDIENT"; payload: string }
  | { type: "SET_CURRENT_RECIPE"; payload: Recipe[] }
  | { type: "ADD_TO_CURRENT_RECIPES"; payload: Recipe }
  | { type: "REMOVE_FROM_CURRENT_RECIPES"; payload: string }
  | { type: "UPDATE_RECIPE_IF_FAVORITE"; payload: string }
  | { type: "UPDATE_RECIPE_IF_COMPLETED"; payload: string };

const initialState: GlobalState = {
  currentUser: null,
  ingredients: [],
  recipes: [],
  userId: "",
  isLogged: false,
  loading: false,
};

const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

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
        ingredients: [],
        recipes: [],
      };
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_IS_LOGGED":
      return { ...state, isLogged: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_CURRENT_INGREDIENTS":
      return { ...state, ingredients: action.payload };
    case "ADD_TO_CURRENT_INGREDIENTS":
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case "DELETE_ONE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "SET_CURRENT_RECIPE":
      return { ...state, recipes: action.payload };
    case "ADD_TO_CURRENT_RECIPES":
      return { ...state, recipes: [...state.recipes, action.payload] };
    case "REMOVE_FROM_CURRENT_RECIPES":
      return {
        ...state,
        recipes: state.recipes.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_RECIPE_IF_FAVORITE":
      return {
        ...state,
        recipes: state.recipes.map((item) =>
          item.id === action.payload
            ? { ...item, isFavorite: !item.isFavorite }
            : item
        ),
      };
    case "UPDATE_RECIPE_IF_COMPLETED":
      return {
        ...state,
        recipes: state.recipes.map((item) =>
          item.id === action.payload
            ? { ...item, isComplete: !item.isComplete }
            : item
        ),
      };
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

export const useGlobal = () => useContext(GlobalContext);
