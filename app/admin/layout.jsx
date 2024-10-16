"use client";
import AdminFooter from "@/components/admin/AdminFooter";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:flex min-h-screen ">
      <div className="flex w-[250px] h-0">
        <AdminNavigation />
      </div>

      <div className="lg:flex-1 flex flex-col min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex-grow ">{children}</div>
        <AdminFooter />
      </div>
    </div>
  );
}
