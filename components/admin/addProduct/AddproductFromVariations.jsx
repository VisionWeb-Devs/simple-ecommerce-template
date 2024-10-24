"use client";
import { LucideX } from "lucide-react";

const format_variation_name = (variation_name) => {
  return variation_name
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^\w_]+/g, "")
    .replace(/_+/g, "_")
    .replace(/_$/, "");
};

const AddproductFromVariations = ({
  productData,
  setProductData,
  product_types,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-lg md:text-xl font-semibold">
        Product Variations
      </label>
      {productData.variations.map((variation, index) => (
        <div key={`variation-${index}`} className="flex flex-col gap-4">
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            key={index}
          >
            <div className="flex justify-center items-center sm:w-full md:justify-start md:items-start md:w-10 mx-3 gap-4">
              <p className="flex md:hidden text-black text-lg">
                Delete variation
              </p>
              <LucideX
                size={24}
                color={
                  productData.variations.length === 1 ? "#E5E5E5" : "#000000"
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
                className="cursor-pointer  sm:w-auto"
              />
            </div>
            <input
              type="text"
              name={`variationsNames`}
              placeholder="Variation name"
              className="border border-gray-700 bg-black text-white text-center rounded px-3 py-2 text-sm w-full sm:w-auto"
              value={variation.variationName || ""}
              onChange={(e) => {
                const newVariations = productData.variations.map((v, i) =>
                  i === index ? { ...v, variationName: e.target.value } : v
                );
                setProductData((prev) => ({
                  ...prev,
                  variations: newVariations,
                }));
              }}
            />
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              {variation.sizes.map((size, indexx) => (
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
                  key={indexx}
                >
                  <select
                    name={`productType_${format_variation_name(
                      variation.variationName
                    )}`}
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-auto"
                    value={variation.productType}
                    onChange={(e) => {
                      const newVariations = productData.variations.map(
                        (variationn, vIndex) =>
                          vIndex === index
                            ? {
                                ...variationn,
                                productType: e.target.value,
                              }
                            : variationn
                      );
                      setProductData((prev) => ({
                        ...prev,
                        variations: newVariations,
                      }));
                    }}
                  >
                    {product_types.map((type) => (
                      <option key={type.name} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name={`variationSize_${format_variation_name(
                      variation.variationName
                    )}`}
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-auto"
                    value={variation.sizes[indexx].size}
                    onChange={(e) => {
                      const newVariations = productData.variations.map(
                        (v, vIndex) => {
                          if (vIndex === index) {
                            return {
                              ...v,
                              sizes: v.sizes.map((size, sIndex) => {
                                if (sIndex === indexx) {
                                  return {
                                    ...size,
                                    size: e.target.value,
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
                  >
                    {product_types
                      .filter((type) => type.name === variation.productType)
                      .map((type) => {
                        return type.choices.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.value}
                          </option>
                        ));
                      })}
                  </select>
                  <input
                    name={`variationQuantity_${format_variation_name(
                      variation.variationName
                    )}`}
                    type="text"
                    placeholder="Quantity"
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-auto"
                    value={size.quantity || 0}
                    onChange={(e) => {
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
                  <div className="flex justify-center items-center w-full gap-4">
                    <p className="flex md:hidden text-black text-lg">
                      Delete Size
                    </p>
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
                        setProductData((prev) => ({
                          ...prev,
                          variations: newVariations,
                        }));
                      }}
                      className="cursor-pointer  sm:w-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="text-sm text-main  cursor-pointer self-end"
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
            <span className="text-lg hover:underline font-semibold ">
              Add size
            </span>
          </button>
        </div>
      ))}
      <button
        className="text-sm text-main  cursor-pointer"
        type="button"
        onClick={() => {
          if (productData.variations.length === 0) {
            setProductData((prev) => ({
              ...prev,
              variations: [{ name: "", sizes: [{ size: "", quantity: "" }] }],
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
        <span className="text-lg hover:underline font-semibold">
          Add variation
        </span>
      </button>
    </div>
  );
};

export default AddproductFromVariations;
