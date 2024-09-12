import AdminFooter from "@/components/admin/AdminFooter";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminNavigation from "@/components/admin/AdminNavigation";

export default function AdminLayout({ children }) {
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
