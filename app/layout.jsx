import "./globals.css";
import { Assistant } from "next/font/google";

const assistant = Assistant({
  subsets: ["latin"],
});

export const metadata = {
  title: "VisionWeb Devs",
  description: "A simple ecommerce template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={assistant.className}>
      <body>{children}</body>
    </html>
  );
}
