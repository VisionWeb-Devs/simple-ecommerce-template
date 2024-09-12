import AdminFooter from "@/components/admin/AdminFooter";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { headers } from "next/headers";

export default function AdminLayout({ children }) {
  const headersList = headers();
  const pathname = headersList.get("referer") || "";
  if (pathname.includes("/login")) {
    return <div>{children}</div>;
  }
  return (
    <div>
      <AdminNavigation />
      <div>
        <AdminHeader />
        {children}
        <AdminFooter />
      </div>
    </div>
  );
}
