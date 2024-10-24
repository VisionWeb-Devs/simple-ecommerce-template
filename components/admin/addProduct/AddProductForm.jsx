"use client";
import { add_product } from "@/lib/googleDriveAdmin";
import { useRouter } from "next/navigation";
import AddproductFromVariations from "./AddproductFromVariations";

const createSlug = (productName) => {
  return productName
    .toLowerCase()
    .replace(/[\s-]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/-$/, "");
};

const AddProductForm = ({
  productData,
  setProductData,
  product_types,
  loading,
  setLoading,
}) => {
  const router = useRouter();
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.set("product_id", productData.productID);
    await add_product(formData).then((res) => {
      if (res.status == "success") {
        alert("Product added successfully");
        if (productURL !== productData.productURL) {
          router.push(
            `/admin/products/addProduct?productURL=${productData.productURL}`
          );
        }
      } else {
        alert(res.error);
      }
      setLoading(false);
    });
  };

  const handleDeleteProduct = async (productID) => {
    setLoading(true);
    await fetch("/api/deleteProduct", {
      method: "POST",
      body: JSON.stringify({ productID: productID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert(data.message);
          router.push("/admin/products");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <form
      onSubmit={handleAddProduct}
      className="flex-1 flex flex-col gap-[24px]"
    >
      <div className="flex flex-col gap-[10px]">
        <label htmlFor="name" className="text-[20px] font-semibold">
          Product name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder={"Product name here"}
          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
          value={productData.productName}
          onChange={(e) => {
            setProductData((prev) => ({
              ...prev,
              productName: e.target.value,
              productURL: createSlug(e.target.value),
            }));
          }}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label htmlFor="productURL" className="text-[20px] font-semibold">
          Product URL
        </label>
        <input
          readOnly
          type="text"
          id="productURL"
          name="productURL"
          placeholder="This is how the URL for the product will look like"
          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
          value={productData.productURL}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label htmlFor="description" className="text-[20px] font-semibold">
          Product description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Product description here"
          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px] min-h-[100px] max-h-[500px]"
          value={productData.description}
          onChange={(e) => {
            setProductData((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        />
      </div>
      <AddproductFromVariations
        productData={productData}
        setProductData={setProductData}
        product_types={product_types}
      />
      <div className="flex flex-col gap-[10px]">
        <label htmlFor="price" className="text-[20px] font-semibold">
          Product Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder={"Product price here"}
          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
          value={productData.price}
          onChange={(e) => {
            setProductData((prev) => ({
              ...prev,
              price: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        <label htmlFor="salePrice" className="text-[20px] font-semibold">
          Product Sale Price
        </label>
        <input
          type="text"
          id="salePrice"
          name="salePrice"
          placeholder={"Product sale price here"}
          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
          value={productData.salePrice}
          onChange={(e) => {
            setProductData((prev) => ({
              ...prev,
              salePrice: e.target.value,
            }));
          }}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label htmlFor="available" className="text-[20px] font-semibold">
          Available for sale
        </label>
        <div className="flex items-center gap-[10px]">
          <input
            type="checkbox"
            id="available"
            name="available"
            className="w-[20px] h-[20px]"
            checked={productData.available}
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                available: !prev.available,
              }));
            }}
          />
          <label htmlFor="available" className="text-[16px]">
            Yes
          </label>
        </div>
      </div>
      <div className="flex gap-5">
        <div
          className="bg-red-600 text-white w-fit px-[16px] py-[8px] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          onClick={() => handleDeleteProduct(productData.productID)}
          disabled={loading}
        >
          Delete product
        </div>
        <button
          type="submit"
          className="bg-main text-white w-fit px-[16px] py-[8px] disabled:opacity-75 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Confirm product
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
