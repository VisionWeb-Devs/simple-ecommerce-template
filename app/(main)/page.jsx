import { Categories } from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import { TopSelling } from "@/components/home/TopSelling";

export default function Home() {
  return (
    <div>
      <Hero />
      <TopSelling />
      <Categories />
    </div>
  );
}
