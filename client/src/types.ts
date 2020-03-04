import { useAuth } from "./hooks/auth.hook";

export type TAuth = Omit<
  ReturnType<typeof useAuth>,
  "isAuthenticated" | "ready"
>;

export type TLink = {
  from: string;
  to: string;
  random: string;
  date: string;
  clicks: number;
  owner: string;
  _id: string;
};
