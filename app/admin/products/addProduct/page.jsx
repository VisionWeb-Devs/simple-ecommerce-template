"use client";
import Input from "@/components/admin/Input";
import React, { useRef, useState, useEffect } from "react";
import {
  add_product,
  change_image_variation,
  getImages,
  upload_file,
} from "@/lib/googleDriveAdmin";
import { LucideX } from "lucide-react";
import Image from "next/image";
import { nanoid } from "nanoid";
import { redirect } from "next/dist/server/api-utils";
import { useRouter, useSearchParams } from "next/navigation";

const shirtsOptions = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
];
const pantsOptions = [
  { value: "28", label: "28" },
  { value: "30", label: "30" },
  { value: "32", label: "32" },
  { value: "34", label: "34" },
  { value: "36", label: "36" },
];
const createSlug = (productName) => {
  return productName
    .toLowerCase()
    .replace(/[\s-]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/-$/, "");
};
const format_variation_name = (variation_name) => {
  return variation_name
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^\w_]+/g, "")
    .replace(/_+/g, "_")
    .replace(/_$/, "");
};

const Page = () => {
  const productURL = useSearchParams().get("productURL");
  const router = useRouter();
  useEffect(() => {
    if (productURL) {
      const productData = fetch("/api/productData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productURL: productURL }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.product) {
            setProductData((prev) => ({
              ...prev,
              productID: data.product.productID,
              productName: data.product.name,
              description: data.product.description,
              price: data.product.price,
              productURL: data.product.productURL,
              available: data.product.available,
              variations: data.product.variations,
            }));

            getImages(data.product.productID).then((images) => {
              if (images.length === 0) return;
              setImageURL(images.main_image.webContentLink);
              console.log(images);
              setImages(
                images.images.map((image, index) => ({
                  file: image,
                  response: "image uploaded",
                }))
              );
            });
          } else {
            alert(data.message);
          }
        });
    }
  }, [productURL]);

  const [productData, setProductData] = useState({
    productID: nanoid(),
    productName: "",
    description: "",
    productURL: "",
    price: 0.0,
    available: false,
    variations: [
      {
        variationName: "",
        productType: "",
        sizes: [{ size: "", quantity: "" }],
      },
    ],
  });
  const [confirmProduct, setConfirmProduct] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = React.useState("");
  const [selectOptions, setSelectOptions] = React.useState(shirtsOptions);

  const handleImageChange = async (e) => {
    if (e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files);
    const uniqueFiles = selectedFiles.filter(
      (file) => !images.some((prevFile) => prevFile.file.name === file.name)
    );

    setImageURL(URL.createObjectURL(e.target.files[0]));
    setImages((prevImages) => [
      ...prevImages,
      ...uniqueFiles.map((file) => ({ file, response: "Uploading" })),
    ]);
    const uploadPromise = async (files) => {
      const formData = new FormData();
      formData.set("images", JSON.stringify([]));
      formData.set("files", []);
      files.forEach((file, index) => {
        let image_name = `image_${images.length + index}`;
        const images_array = JSON.parse(formData.getAll("images"));
        images_array.push(image_name);
        formData.set("images", JSON.stringify(images_array));
        formData.append(image_name, file);
      });
      formData.append("product_url", productData.productURL);
      formData.append("productID", productData.productID);

      const response = await upload_file(formData);
      return { files, response };
    };
    setImageURL(URL.createObjectURL(e.target.files[0]));
    await uploadPromise(uniqueFiles).then((uploadedFiles) => {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        uploadedFiles.files.forEach((file, index) => {
          newImages[images.length + index] = {
            file,
            response: uploadedFiles.response,
          };
        });
        return newImages;
      });
    });
  };
  const handleVariationChange = async (file, index, variation) => {
    const uploadPromises = async () => {
      const formData = new FormData();
      formData.append("variation", variation);
      formData.append("index", index);
      formData.append("product_url", productData.productURL);
      formData.append("productID", productData.productID);
      const response = await change_image_variation(formData);
      return { file, response };
    };
    setImages((prevImages) => {
      const newImages = [...prevImages];

      newImages[index] = { ...newImages[index], response: "Changing" };
      return newImages;
    });

    await uploadPromises().then((uploadedFile) => {
      setImages((prevImages) => {
        const newImages = prevImages.map((prevImage) => {
          if (prevImage.file.name === uploadedFile.file.name) {
            return { ...prevImage, response: uploadedFile.response };
          }
          return prevImage;
        });
        return newImages;
      });
    });
  };
  const handleProductTypeChange = (e) => {
    const selectedCategory = e.target.value;
    // setProductType(selectedCategory);
    // setProductData((prev) => ({ ...prev, productType: selectedCategory }));
    if (selectedCategory === "Shirts") {
      setSelectOptions(shirtsOptions);
    } else if (selectedCategory === "Pants") {
      setSelectOptions(pantsOptions);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setConfirmProduct(true);
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
      setConfirmProduct(false);
    });
  };
  if (productURL && productData.productURL !== productURL) {
    return <div>Loading...</div>;
  }
  console.log(images);
  return (
    <div className="py-[24px] px-[40px] w-full text-main">
      <div className="flex flex-col gap-[4px] font-semibold">
        <div className="text-[24px]">Add new Product</div>
        <div className="text-[16px]">
          Admin {">"} All products {">"} Add new product
        </div>
      </div>
      <div className="flex gap-[48px]">
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
              className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px] min-h-[42px] max-h-[500px]"
              value={productData.description}
              onChange={(e) => {
                setProductData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[20px] font-semibold">
              Product Variations
            </label>
            {productData.variations.map((variation, index) => (
              <div
                key={"variation-" + index}
                className="flex flex-col gap-[8px]"
              >
                <div className="flex items-center gap-[8px]" key={index}>
                  <LucideX
                    size={24}
                    color={
                      productData.variations.length === 1
                        ? "#E5E5E5"
                        : "#000000"
                    }
                    onClick={() => {
                      if (productData.variations.length === 1) return;
                      const newVariations = productData.variations.filter(
                        (v, i) => i !== index
                      );
                      setProductData((prev) => ({
                        ...prev,
                        variations: newVariations,
                      }));
                    }}
                  />
                  <input
                    type="text"
                    name={`variationsNames`}
                    placeholder="Variation name"
                    className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px] h-fit"
                    value={variation.variationName}
                    onChange={(e) => {
                      const newVariations = productData.variations.map((v, i) =>
                        i === index
                          ? { ...v, variationName: e.target.value }
                          : v
                      );
                      setProductData((prev) => ({
                        ...prev,
                        variations: newVariations,
                      }));
                    }}
                  />
                  <div className="flex flex-col gap-[8px]">
                    {variation.sizes.map((size, indexx) => (
                      <div className="flex items-center gap-[8px]" key={indexx}>
                        <select
                          name={`productType_${format_variation_name(
                            variation.variationName
                          )}`}
                          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
                          value={variation.productType}
                          onChange={handleProductTypeChange}
                        >
                          <option value="Shirts">Shirts</option>
                          <option value="Pants">Pants</option>
                        </select>
                        <select
                          name={`variationSize_${format_variation_name(
                            variation.variationName
                          )}`}
                          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
                          value={size.size}
                          onChange={(e) => {
                            const newVariations = productData.variations.map(
                              (variation, i) =>
                                i === index
                                  ? {
                                      ...variation,
                                      sizes: variation.sizes.map(
                                        (sizeItem, sizeIndex) =>
                                          sizeIndex === indexx
                                            ? {
                                                ...sizeItem,
                                                size: e.target.value,
                                              }
                                            : sizeItem
                                      ),
                                    }
                                  : variation
                            );
                            setProductData((prev) => ({
                              ...prev,
                              variations: newVariations,
                            }));
                          }}
                        >
                          {selectOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <input
                          name={`variationQuantity_${format_variation_name(
                            variation.variationName
                          )}`}
                          type="text"
                          placeholder="Variation quantity"
                          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
                          value={size.quantity}
                          onChange={(e) => {
                            // const newVariations = productData.variations.map(
                            //   (variationn, vIndex) =>
                            //     vIndex === index
                            //       ? {
                            //           ...variationn,
                            //           sizes: variationn.sizes.map(
                            //             (sizeItem, sIndex) =>
                            //               sIndex === indexx
                            //                 ? {
                            //                     ...sizeItem,
                            //                     quantity: e.target.value,
                            //                   }
                            //                 : sizeItem
                            //           ),
                            //         }
                            //       : variationn
                            // );
                            // setProductData((prev) => ({
                            //   ...prev,
                            //   newVariations,
                            // }));
                            const newVariations = productData.variations.map(
                              (v, vIndex) => {
                                if (vIndex === index) {
                                  return {
                                    ...v,
                                    sizes: v.sizes.map((size, sIndex) => {
                                      if (sIndex === indexx) {
                                        return {
                                          ...size,
                                          quantity: e.target.value,
                                        };
                                      } else {
                                        return size;
                                      }
                                    }),
                                  };
                                } else {
                                  return v;
                                }
                              }
                            );
                            setProductData((prev) => ({
                              ...prev,
                              variations: newVariations,
                            }));
                          }}
                        />
                        <LucideX
                          size={24}
                          color={
                            variation.sizes.length === 1 ? "#E5E5E5" : "#000000"
                          }
                          onClick={() => {
                            if (variation.sizes.length === 1) return;
                            const newVariations = productData.variations.map(
                              (v, vIndex) => {
                                if (vIndex === index) {
                                  return {
                                    ...v,
                                    sizes: variation.sizes.filter(
                                      (sizeItem, sIndex) => sIndex !== indexx
                                    ),
                                  };
                                } else {
                                  return v;
                                }
                              }
                            );
                            console.log("this new: ", newVariations);
                            setProductData((prev) => ({
                              ...prev,
                              variations: newVariations,
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="text-[16px] text-main underline cursor-pointer self-end"
                  type="button"
                  onClick={() => {
                    const newVariations = productData.variations.map((v, i) =>
                      i === index
                        ? {
                            ...v,
                            sizes: [
                              ...v.sizes,
                              v.sizes[v.sizes.length - 1] || {
                                size: "",
                                quantity: "",
                              },
                            ],
                          }
                        : v
                    );
                    setProductData((prev) => ({
                      ...prev,
                      variations: newVariations,
                    }));
                  }}
                >
                  Add size
                </button>
              </div>
            ))}
            <button
              className="text-[16px] text-main underline cursor-pointer"
              type="button"
              onClick={() => {
                if (productData.variations.length === 0) {
                  setProductData((prev) => ({
                    ...prev,
                    variations: [
                      { name: "", sizes: [{ size: "", quantity: "" }] },
                    ],
                  }));
                } else {
                  setProductData((prev) => ({
                    ...prev,
                    variations: [
                      ...prev.variations,
                      prev.variations[prev.variations.length - 1],
                    ],
                  }));
                }
              }}
            >
              Add variation
            </button>
          </div>
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

          <button
            type="submit"
            className="bg-main text-white w-fit px-[16px] py-[8px] disabled:opacity-75 disabled:cursor-not-allowed"
            disabled={
              confirmProduct ||
              images.some(
                (image) =>
                  image.response == "Uploading" || image.response == "Changing"
              )
            }
          >
            Confirm product
          </button>
        </form>
        <div className="flex-1">
          <form
            className="relative min-w-[800] min-h-[600] max-w-full "
            encType="multipart/form-data"
          >
            <div className="min-w-[300px] min-h-[300px] w-full max-h-[500px] bg-gray-50 relative">
              <input
                type="file"
                accept="image/*"
                name="file"
                multiple
                className="cursor-pointer w-full h-full absolute top-0 left-0 opacity-0"
                onChange={handleImageChange}
              />
              {imageURL && (
                <Image
                  src={imageURL}
                  width={800} // Set the natural width of the image
                  height={600} // Set the natural height of the image
                  layout="intrinsic"
                  alt="product"
                  className="min-w-[300px] min-h-[300px] max-w-full max-h-[500px]"
                />
              )}
            </div>
            <div className="flex flex-col gap-[8px] mt-[24px] h-full">
              {images.map((image, index) => (
                <div
                  key={image.file.name}
                  className="flex justify-between items-center px-[16px] py-[8px] bg-gray-50 rounded-[8px] gap-[8px]"
                >
                  <div className="w-[140px] h-[100px] overflow-clip rounded-[8px] border border-gray-50 relative">
                    <Image
                      src={
                        image.file.webContentLink
                          ? image.file.webContentLink
                          : URL.createObjectURL(image.file)
                      }
                      layout="fill" // Fills the container
                      objectFit="cover"
                      alt="product"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="max-w-[200px] overflow-auto hide-scrollbar">
                    {image.file.name}
                  </div>
                  <select
                    name="variation"
                    className="border-[1px] border-main rounded-[4px] px-[16px] py-[8px] text-[16px]"
                    onChange={(e) => {
                      handleVariationChange(image.file, index, e.target.value);
                    }}
                  >
                    {/* {(variations.length === 0 || !variations[0].name) && ( */}
                    <option value="">Select variation</option>
                    {/* )} */}
                    {productData.variations?.map((variation) => {
                      if (!variation.variationName) return null;
                      return (
                        <option
                          key={variation.variationName}
                          className="border-[1px] rounded-[4px] px-[16px] py-[8px] text-[16px]"
                          value={variation.variationName}
                        >
                          {variation.variationName}
                        </option>
                      );
                    })}
                  </select>
                  <div>{image.response}</div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
