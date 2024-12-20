import { Categories } from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import Informations from "@/components/home/Informations";
import LatestItems from "@/components/home/LatestItems";

export default async function Home() {
  return (
    <div className="bg-gray-100 ">
      <Hero />
      <LatestItems />
      <Categories />
      <Informations />
    </div>
  );
}
