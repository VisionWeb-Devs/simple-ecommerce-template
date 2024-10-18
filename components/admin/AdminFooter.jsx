import React from "react";
import Link from "next/link";

const AdminFooter = () => {
  return (
    <footer className="w-full bg-gray-100 py-6 px-4 sm:px-6 md:px-8 lg:px-20 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
      <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <Link
          href="/admin"
          className="text-sm sm:text-base text-black hover:underline"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/products"
          className="text-sm sm:text-base text-black hover:underline"
        >
          Manage Products
        </Link>
        <Link
          href="/admin/orders"
          className="text-sm sm:text-base text-black hover:underline"
        >
          Orders Management
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm sm:text-base">
          &#169; {new Date().getFullYear()}
        </span>
        <span className="text-sm sm:text-base">Created By</span>
        <a
          href="https://www.instagram.com/visionweb.devs/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-2 tracking-wider text-sm sm:text-base"
        >
          VisionWeb Devs
        </a>
      </div>
    </footer>
  );
};

export default AdminFooter;
