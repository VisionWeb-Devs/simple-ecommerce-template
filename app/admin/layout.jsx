"use client";
import AdminFooter from "@/components/admin/AdminFooter";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);
  const handlesignout = async () => {
    await auth.signOut();
    router.push("/login");
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <button onClick={handlesignout}>signout</button>
      <AdminNavigation />
      <div>
        <AdminHeader />
        {children}
        <AdminFooter />
      </div>
    </div>
  );
}
