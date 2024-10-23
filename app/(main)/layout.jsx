import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SetUserCookie from "@/lib/SetUserCookie";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SetUserCookie />
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
