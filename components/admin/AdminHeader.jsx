import { KeyRound, LogOut } from "lucide-react";
import React from "react";

const AdminHeader = () => {
  return (
    <div className="flex w-full h-[100px] justify-end items-center px-[60px] gap-7 uppercase text-lg border-b-[1px] select-none shadow-bottom">
      <a
        href="#"
        class="group text-black justify-center items-center transition font-semibold duration-300"
      >
        <span className="flex items-center justify-center gap-3">
          Change password
          <KeyRound className="cursor-pointer" />
        </span>

        <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
      </a>
      <a
        href="#"
        class="group text-black  justify-center items-center transition font-semibold duration-300"
      >
        <span className="flex items-center justify-center gap-3">
          Log out <LogOut />
        </span>

        <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
      </a>
    </div>
  );
};

export default AdminHeader;
