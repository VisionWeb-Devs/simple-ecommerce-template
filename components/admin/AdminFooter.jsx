import React from "react";
import Link from "next/link";

const navigationLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Manage Products" },
  { href: "/admin/orders", label: "Orders Management" },
];

const AdminFooter = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-6 px-4 sm:px-6 md:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg text-gray-900 hover:text-black transition-colors duration-200 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-sm">
            © {new Date().getFullYear()} Created by{" "}
          </span>
          <a
            href="https://www.instagram.com/visionweb.devs/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sm hover:text-gray-900 transition-colors duration-200"
          >
            VisionWeb Devs
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
