import { Categories } from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import { TopSelling } from "@/components/home/TopSelling";

export default async function Home() {
  return (
    <div className="bg-gray-100 ">
      <Hero />
      <TopSelling />
      <Categories />
    </div>
  );
}
