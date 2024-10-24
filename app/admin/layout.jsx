"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminFooter from "@/components/admin/AdminFooter";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminNavigation from "@/components/admin/AdminNavigation";

const AdminLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen max-w-[1920px] mx-auto bg-gray-50">
      <div
        className={`
        fixed lg:sticky top-0
        transition-all duration-300 ease-in-out
        h-screen
        ${isNavExpanded ? "w-64" : "w-20"}
        z-40
      `}
      >
        <AdminNavigation
          isExpanded={isNavExpanded}
          onToggle={() => setIsNavExpanded(!isNavExpanded)}
        />
      </div>

      <div
        className={`
        flex-1
        transition-all duration-300 ease-in-out
        min-h-screen
        w-full
        lg:w-[calc(100%-${isNavExpanded ? "16rem" : "5rem"})]
      `}
      >
        <AdminHeader
          isNavExpanded={isNavExpanded}
          onNavToggle={() => setIsNavExpanded(!isNavExpanded)}
        />
        <main className="flex-1 max-w-full overflow-x-auto">
          <div className="max-w-[1600px] mx-[5px]">{children}</div>
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
