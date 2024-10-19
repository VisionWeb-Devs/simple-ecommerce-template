import ProductImages from "@/components/home/product/ProductImages";
import SimilarItems from "@/components/home/product/SimilarItems";
import { getUserCookie } from "@/lib/actions";
import { getAdminProduct } from "@/lib/firebase";
import { getImages, addToCart } from "@/lib/googleDriveAdmin";

export default async function Page({ params }) {
  const product = await getAdminProduct(params.product?.toString());
  if (!product) {
    return <div>Product not found</div>;
  }
  const userId = await getUserCookie();
  const images = await getImages(product.productID);
  return (
    <div className="w-full lg:px-40 md:px-24 px-12 p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <ProductImages images={images} productName={product.name} />

        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          {product.salePrice || product.salePrice > 0 ? (
            <div className="mb-6 flex gap-4">
              <span className="text-2xl font-bold">
                {product.salePrice} DZD
              </span>
              <span className="text-lg line-through font-semibold text-gray-500">
                {product.price} DZD
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold">{product.price} DZD</span>
          )}

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
                    <input
                      type="hidden"
                      name="product_url"
                      value={product.productURL}
                    />
                    <input
                      type="hidden"
                      name="product_id"
                      value={product.productID}
                    />
                    <input type="hidden" name="user_id" value={userId} />
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

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Quantity</h2>
              <input
                type="number"
                min="1"
                name="quantity"
                defaultValue="1"
                className="border border-gray-300 px-3 py-2 w-20 sele"
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
      <SimilarItems />
    </div>
  );
}
