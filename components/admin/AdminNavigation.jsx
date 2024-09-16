"use client";
import React, { useState } from "react";
import {
  Home,
  Package,
  FileText,
  ChevronDown,
  ChevronUp,
  Menu,
} from "lucide-react";
import logo from "./../../assets/main_logo.png";
import { usePathname, useRouter } from "next/navigation";

const CategoryList = ({ categories }) => {
  return (
    <ul className="flex flex-col w-full tracking-wide">
      {categories.map((category, index) => (
        <li
          key={index}
          style={{ transitionDelay: `${index * 100}ms` }}
          className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 transition-opacity duration-500 animate-fadeIn select-none cursor-pointer "
        >
          <span>{category.name}</span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">
            {category.count.toString().padStart(2, "0")}
          </span>
        </li>
      ))}
    </ul>
  );
};

const SidebarItem = ({ icon, text, link }) => {
  const path = usePathname();
  const isActive = path === link;
  const activeLink = "bg-main text-white";
  const inactiveLink =
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-[1px] border-main";
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(link);
      }}
      className={`flex items-center mx-[24px] px-4 py-3 font-semibold text-[15px] ${
        isActive ? activeLink : inactiveLink
      }`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </div>
  );
};

const AdminNavigation = () => {
  const [toggleCategory, setToggleCategory] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categories = [
    { name: "Category 1", count: 21 },
    { name: "Category 2", count: 32 },
    { name: "Category 3", count: 13 },
    { name: "Category 4", count: 14 },
    { name: "Category 5", count: 6 },
    { name: "Category 6", count: 11 },
  ];

  function handleToggleCategory() {
    setToggleCategory(!toggleCategory);
  }

  function handleToggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  console.log("hello");
  return (
    <div className=" ">
      <button
        onClick={handleToggleMenu}
        className="lg:hidden top-6 left-4  p-2 bg-white rounded-md shadow-md"
      >
        <Menu size={24} />
      </button>
      <div
        className={`w-72 lg:w-[250px] h-screen bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0  top-0 left-0 `}
      >
        <div className="px-4 pt-4 flex justify-center items-center w-[60%] mx-auto">
          <img
            src={logo.src}
            alt="Site Logo"
            className="mb-8 object-cover select-none "
          />
        </div>

        <nav className="space-y-3 select-none">
          <SidebarItem
            icon={<Home size={20} />}
            text="DASHBOARD"
            link="/admin"
          />
          <SidebarItem
            icon={<Package size={20} />}
            text="ALL PRODUCTS"
            link="/admin/products"
          />
          <SidebarItem
            icon={<FileText size={20} />}
            text="ORDER LIST"
            link="/admin/orders"
          />
        </nav>
        <div>
          <div className="mt-8 px-4 pt-4 flex justify-between">
            <h3 className="text-lg font-bold text-gray-600">Categories</h3>
            <button
              className="flex cursor-pointer"
              onClick={handleToggleCategory}
            >
              {toggleCategory ? <ChevronDown /> : <ChevronUp />}
            </button>
          </div>
          <div
            className={
              toggleCategory
                ? "hidden"
                : "flex px-4 py-3 font-semibold text-[17px]"
            }
          >
            <CategoryList categories={categories} />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="  bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={handleToggleMenu}
        ></div>
      )}
      <div
        className={`flex-1 ${isMenuOpen ? "lg:ml-72" : ""} overflow-x-hidden`}
      ></div>
    </div>
  );
};

export default AdminNavigation;
