"use client";
import { useEffect } from "react";
import { setUserCookie } from "./actions";

const SetUserCookie = () => {
  useEffect(() => {
    const setUser = async () => {
      await setUserCookie();
    };
    setUser();
  }, []);
  return null;
};
export default SetUserCookie;
