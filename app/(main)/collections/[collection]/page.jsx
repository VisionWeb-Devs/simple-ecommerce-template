import { Collection } from "@/components/home/collections/collection/Collection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const collections = ["all", "Shirts", "Pants", "Hoodies"];

export default function Page({ params }) {
  const collectionName = params.collection || "all";
  if (
    !collections.some(
      (collection) =>
        collection.toLocaleLowerCase() === collectionName.toLocaleLowerCase()
    )
  ) {
    return (
      <div className="flex-col h-[70vh] bg-gray-100  justify-center items-center w-full py-16 mx-auto lg:px-28 md:px-14 px-9 flex space-y-7">
        <h1 className=" text-3xl font-medium ">Collection not found</h1>
        <div>
          <Link
            href="/collections"
            className="group bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            Go To The Available Collections
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex flex-col flex-grow  w-full lg:px-[116px] md:px-14 px-9 pt-9">
      <h2 className="md:text-4xl text-3xl font-bold text-gray-800 uppercase flex w-full lg:px-48 md:px-14 px-9 pt-9">
        {collectionName}
      </h2>

      <Collection collectionName={collectionName} />
    </div>
  );
}
