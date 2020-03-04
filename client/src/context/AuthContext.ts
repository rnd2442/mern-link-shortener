import { createContext } from "react";
import { TAuth } from "../types";

function noop() {}

export const AuthContext = createContext<TAuth>({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
});
