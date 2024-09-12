"use client";
import { useState } from "react";

const page = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center text-main">
      <div className="flex flex-col gap-[24px] max-w-[500px]">
        <div className="font-semibold">
          <div className="text-[48px]">Login</div>
          <div className="text-[16px] opacity-75">
            forgot password? contact us +213799902523
          </div>
        </div>
        <input
          placeholder="Email"
          name="email"
          type="email"
          className="py-[10px] px-[16px] text-[16px] border border-main border-opacity-75 focus-visible:rounded-none"
          onChange={handleChange}
          value={loginData.email}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          className="py-[10px] px-[16px] text-[16px] border border-main border-opacity-75 focus-visible:rounded-none"
          onChange={handleChange}
          value={loginData.password}
        />
        <button className="py-[10px] px-[16px] bg-main text-white text-[18px] font-medium text-left">
          LOGIN
        </button>
        <div className="text-[16px] font-semibold">
          <span className="opacity-75">
            By clicking 'Log In' you agree to our website
          </span>{" "}
          <span className="underline">Terms & Conditions.</span>
        </div>
      </div>
    </div>
  );
};

export default page;
