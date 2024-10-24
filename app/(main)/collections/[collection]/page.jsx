import { Collection } from "@/components/home/collections/collection/Collection";

const collections = ["all", "Shirts", "Pants", "Hoodies"];

export default function Page({ params }) {
  const collectionName = params.collection || "all";
  if (
    !collections.some(
      (collection) =>
        collection.toLocaleLowerCase() === collectionName.toLocaleLowerCase()
    )
  ) {
    return <h1 className="h-full">Collection not found</h1>;
  }

  return (
    <div className="bg-gray-100 flex-1 flex flex-col flex-grow w-full lg:px-28 md:px-14 px-9 pt-4">
      <h2 className="text-4xl font-bold text-gray-800 uppercase flex w-full lg:px-48 md:px-14 px-9 pt-4">
        {collectionName}
      </h2>

      <Collection collectionName={collectionName} />
    </div>
  );
}
