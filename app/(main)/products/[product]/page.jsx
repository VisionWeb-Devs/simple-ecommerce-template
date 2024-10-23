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

        <div className="md:w-1/2 relative">
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
            <h3 className="font-semibold mb-2">VARIATION</h3>
            <div className="flex flex-wrap gap-2 select-none relative">
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

              {product.variations.map((variation) => (
                <div key={variation.variationName}>
                  <input
                    type="radio"
                    name="product_variation"
                    id={`variation-${variation.variationName}`}
                    value={variation.variationName}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`variation-${variation.variationName}`}
                    className={`px-3 py-1 border border-main font-medium peer-checked:bg-main peer-checked:text-white cursor-pointer hover:bg-gray-50`}
                  >
                    {variation.variationName}
                  </label>
                  <div className="absolute h-[56px] left-0 flex-col hidden peer-checked:flex mt-[4px]">
                    <div
                      htmlFor={`variation-${variation.variationName}`}
                      className="font-semibold mb-2"
                    >
                      SIZE
                    </div>
                    <div
                      className="flex gap-2"
                      htmlFor={`variation-${variation.variationName}`}
                    >
                      {variation.sizes.map((size) => (
                        <div key={size.size + variation.variationName}>
                          <input
                            type="radio"
                            name="product_size"
                            id={`size-${size.size}-${variation.variationName}`}
                            value={size.size}
                            disabled={size.quantity === 0}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={`size-${size.size}-${variation.variationName}`}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6 mt-[60px]">
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
