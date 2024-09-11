import "./globals.css";
import { Assistant } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const assistant = Assistant({
  subsets: ["latin"],
});
// push test
export const metadata = {
  title: "VisionWeb Devs",
  description: "A simple ecommerce template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={assistant.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
