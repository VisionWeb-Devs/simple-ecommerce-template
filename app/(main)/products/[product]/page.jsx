import Quantity from "@/components/home/product/Quantity";
import SimilarItems from "@/components/home/product/SimilarItems";
import { getAdminProduct } from "@/lib/firebase";
import { getImages, addToCart } from "@/lib/googleDriveAdmin";
import Image from "next/image";

export default async function Page({ params }) {
  const product = await getAdminProduct(params.product?.toString());
  if (!product) {
    return <div>Product not found</div>;
  }
  const images = null;
  // const images = await getImages(product.productID);

  return (
    <div className="w-full lg:px-40 md:px-24 px-12 p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 justify-center items-center flex">
          {images && (
            <Image
              src={images.main_image?.webContentLink}
              alt={product.name}
              width={500}
              height={500}
              className="w-[500px] h-auto justify-center items-center"
            />
          )}
        </div>

        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <div className="mb-4">
            {/* <span className="text-gray-500 line-through mr-2">
              {product.price}
            </span> */}
            <span className="text-xl font-bold">{product.price}</span>
            {/* {onSale && (
              <span className="ml-2 bg-black text-white px-2 py-1 text-sm">
                Sale
              </span>
            )} */}
          </div>

          <form className="mb-4" action={addToCart}>
            <h3 className="font-semibold mb-2">SIZE</h3>
            <div className="flex flex-wrap gap-2 select-none">
              {product.variations.length === 1 &&
                product.variations[0].sizes.map((size) => (
                  <div key={size.size} className="relative">
                    <input
                      type="radio"
                      name="product_size"
                      id={`size-${size.size}`}
                      value={size.size}
                      disabled={size.quantity === 0}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={`size-${size.size}`}
                      className={`
                        px-3 py-1 border border-main font-medium
                        peer-checked:bg-main peer-checked:text-white
                        ${
                          size.quantity === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer hover:bg-gray-50"
                        }
                      `}
                    >
                      {size.size}
                    </label>
                  </div>
                ))}
              {product.variations.length !== 1 && <div>Still in dev</div>}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Quantity</h3>
              {/* <Quantity /> */}
              <input
                type="number"
                className="w-16 h-10 border"
                name="quantity"
              />
            </div>

            <button
              className="w-full bg-black text-white py-2 px-4 mb-4"
              type="submit"
            >
              Add to cart
            </button>
          </form>

          <ul className="list-disc list-inside">{product.description}</ul>
        </div>
      </div>
      {/* <SimilarItems /> */}
    </div>
  );
}
