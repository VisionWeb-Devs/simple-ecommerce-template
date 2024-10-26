import React from "react";
import { KeyRound, LogOut, User, Bell } from "lucide-react";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";

const AdminHeader = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };
  const username = auth.currentUser.email.slice(
    0,
    auth.currentUser.email.indexOf("@")
  );

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-full">
          <div className="flex items-center space-x-6">
            <Link
              href="/admin/change-password"
              className="group flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              <KeyRound className="w-5 h-5" />
              <span className="hidden sm:inline">Change Password</span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-900"></span>
            </Link>

            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-5 h-5" />
              <span className="text-lg font-semibold  ">{username}</span>
            </div>

            <button
              onClick={handleSignOut}
              className="group flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium text-sm focus:outline-none"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-900"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
