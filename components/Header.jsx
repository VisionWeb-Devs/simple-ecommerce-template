"use client";
import React, { useState } from "react";
import { Search, ShoppingBag, X, Menu } from "lucide-react";
import Image from "next/image";
import main_logo from "../assets/main_logo.png";
import Link from "next/link";

export const Header = ({}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const handleSearchChange = (e) => setSearchBarValue(e.target.value);
  return (
    <header className="bg-white border-b border-gray-200">
      <div
        className={`fixed left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out z-50 ${
          isSearchOpen ? "top-0" : "-top-24"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow mr-2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={searchBarValue}
            onChange={handleSearchChange}
          />
          <button
            onClick={toggleSearch}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            aria-label="Close search"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between p-4">
        <div className="flex items-center space-x-8">
          <Link href={"/"} alt="home">
            <Image src={main_logo} alt="logo" width={100} />
          </Link>
          <nav>
            <ul className="flex space-x-4 text-xl">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/pullover-hoodies"
                  className="text-gray-600 hover:text-black"
                >
                  HOODIES
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/pants"
                  className="text-gray-600 hover:text-black"
                >
                  PANTS
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/shorts"
                  className="text-gray-600 hover:text-black"
                >
                  SHORTS
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-black"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleSearch} className="text-gray-600">
            <Search />
          </button>
          <Link href={"/cart"}>
            <ShoppingBag className="text-gray-600" />
          </Link>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-between items-center p-4">
          <button onClick={toggleMenu} className="text-gray-600 z-50">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <Link href={"/"} alt="home">
            <div className="cursor-pointer">
              <Image src={main_logo} alt="logo" width={100} />
            </div>
          </Link>
          <div className="flex items-center space-x-7">
            <button onClick={toggleSearch} className="text-gray-600">
              <Search />
            </button>
            <Link href={"/cart"}>
              <ShoppingBag className="text-gray-600" />
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center">
            <nav className="text-center">
              <ul className="space-y-6">
                <li>
                  <Link href="/" className="block text-2xl text-gray-800">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/pullover-hoodies"
                    className="block text-2xl text-gray-800"
                  >
                    HOODIES
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/pants"
                    className="block text-2xl text-gray-800"
                  >
                    PANTS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/shorts"
                    className="block text-2xl text-gray-800"
                  >
                    SHORTS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block text-2xl text-gray-800"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
