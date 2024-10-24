import { Collection } from "@/components/home/collections/collection/Collection";

export default function Page({ params }) {
  const collectionName = params.collection || "All Products";

  return (
    <div className="bg-gray-100 flex flex-col flex-grow w-full lg:px-28 md:px-14 px-9 pt-4">
      <h2 className="text-4xl font-bold text-gray-800 uppercase flex w-full lg:px-48 md:px-14 px-9 pt-4">
        {collectionName}
      </h2>

      <Collection category={collectionName} />
    </div>
  );
}
