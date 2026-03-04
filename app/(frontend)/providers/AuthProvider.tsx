"use client";
import { createContext, useContext } from "react";
import { Categories, UsersDots } from "../lib/taypes";

const AuthContext = createContext<any | null>(null);

export function AuthProvider({
  user,
  category,
  children,
}: {
  user: UsersDots | null;
  category: Categories[] | null;
  children: React.ReactNode;
}) {

  return (
    <AuthContext.Provider value={{ user, category }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
