import { getUserCookie } from "@/lib/actions";
import { addToCart } from "@/lib/googleDriveAdmin";

const CartForm = ({ product, userId }) => {
  return (
    <form className="mb-4" action={addToCart}>
      <h3 className="font-semibold mb-2">SIZE</h3>
      <div className="flex flex-wrap gap-2 select-none">
        {product.variations.length === 1 &&
          product.variations[0].sizes.map((size, index) => (
            <div key={size.size} className="relative">
              <input
                type="radio"
                name="product_size"
                id={`size-${size.size}`}
                value={size.size}
                disabled={size.quantity === 0}
                className="peer hidden"
                required={index === 0}
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
          min="1"
          defaultValue="1"
        />
      </div>
      <input type="hidden" name="product_url" value={product.productURL} />
      <input type="hidden" name="product_id" value={product.productID} />
      <input type="hidden" name="user_id" value={userId} />

      <button
        className="w-full bg-black text-white py-2 px-4 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        // disabled={pending}
      >
        {/* {pending ? "Loading..." : "Add to cart"} */}
        Add to cart
      </button>
    </form>
  );
};
export default CartForm;
