import { Categories } from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import { TopSelling } from "@/components/home/TopSelling";
import { getUserCookie } from "@/lib/actions";

export default async function Home() {
  await getUserCookie();

  return (
    <div>
      <Hero />
      <TopSelling />
      <Categories />
    </div>
  );
}
