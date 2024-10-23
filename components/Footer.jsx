import React from "react";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import main_logo from "../assets/visionlogo.png";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-black text-white py-4 px-4 sm:px-6 md:px-8 lg:px-20 w-full">
      <div className="mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4 text-sm sm:text-base">
          <p>©{currentYear} Online Store</p>
        </div>
        <div className="order-first sm:order-none mb-4 sm:mb-0">
          <Image
            src={main_logo}
            width={150}
            height={38}
            alt="logo"
            className="w-auto h-auto"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-5">
            <Link
              href="https://www.facebook.com/"
              className="text-white hover:text-gray-300 target:_blank"
              target="_blank"
            >
              <Facebook size={50} />
            </Link>
            <Link
              href="https://www.instagram.com/"
              className="text-white hover:text-gray-300 "
              target="_blank"
            >
              <Instagram size={50} />
            </Link>
            <Link
              href="https://tiktok.com/"
              className="text-white hover:text-gray-300 target:_blank"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
              >
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center mt-4">
        <p className="text-xs sm:text-sm">
          © {currentYear}, created By visionwebDevs
        </p>
      </div>
    </footer>
  );
};
