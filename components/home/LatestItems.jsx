import Link from "next/link";
import ProductCard from "./product/ProductCard";
import { getImages } from "@/lib/googleDriveAdmin";

export const LatestItems = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/getLatestProducts`,
    {
      cache: "no-store",
    }
  );
  const { body } = await res.json();
  const products = body;
  if (!products) return <div>No products To display.</div>;

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto lg:px-28 md:px-14 px-9">
        <div className="flex items-center justify-between mb-12">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-800">
            Top Selling Items
          </h2>
          <Link
            href="/collections"
            className="text-gray-700 md:text-lg text-sm hover:text-black transition-colors duration-300"
          >
            View All Items &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map(async (product) => {
            const images = await getImages(product.productID);
            const image = images.main_image?.webContentLink;
            return (
              <ProductCard
                key={product.productID}
                product={{ ...product, main_image: image }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestItems;
