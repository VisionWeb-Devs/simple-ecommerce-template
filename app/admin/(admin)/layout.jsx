import AdminFooter from "@/components/admin/AdminFooter";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminNavigation from "@/components/admin/AdminNavigation";

export default function AdminLayout({ children }) {
  return (
    <div className="flex w-full h-screen">
      <AdminNavigation />
      <div className="flex w-full h-screen flex-col lg:pl-[250px]">
        <AdminHeader />
        {children}
        <AdminFooter />
      </div>
    </div>
  );
}
