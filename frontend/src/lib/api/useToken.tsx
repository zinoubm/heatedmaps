"use client";

import { useState } from "react";

type UseToken = {
  getToken: () => string | null;
  setToken: (token: string) => void;
  deleteToken: () => void;
  isAuthenticated: () => boolean;
};

function useToken(): UseToken {
  const [token, setTokenState] = useState<string | null>("token");

  const getToken = () => {
    return token === "null" ? null : token;
  };

  const setToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    setTokenState(null);
  };

  const isAuthenticated = () => {
    return token !== null && token !== "null" && token !== "";
  };

  return {
    getToken,
    setToken,
    deleteToken,
    isAuthenticated,
  };
}

export default useToken;
