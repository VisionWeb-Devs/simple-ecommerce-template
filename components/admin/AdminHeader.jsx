import { auth } from "@/lib/firebase";
import { KeyRound, LogOut } from "lucide-react";
import React from "react";

const AdminHeader = () => {
  const handlesignout = async () => {
    await auth.signOut();
    window.href = "/login";
  };
  return (
    <div className="flex w-full h-[100px] justify-end items-center px-[60px] gap-7 uppercase text-lg border-b-[1px] select-none shadow-bottom">
      <a
        href="#"
        className="group text-black justify-center items-center transition font-semibold duration-300"
      >
        <span className="flex items-center justify-center gap-3">
          Change password
          <KeyRound className="cursor-pointer" />
        </span>

        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
      </a>
      <a
        href="#"
        className="group text-black  justify-center items-center transition font-semibold duration-300"
      >
        <button
          className="flex items-center justify-center gap-3"
          onClick={handlesignout}
        >
          Log out <LogOut />
        </button>

        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
      </a>
    </div>
  );
};

export default AdminHeader;
