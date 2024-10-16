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
    <div className="flex flex-col gap-[8px] w-full">
      <label className="text-[20px] font-semibold">Product Variations</label>
      {productData.variations.map((variation, index) => (
        <div key={"variation-" + index} className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]" key={index}>
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
            />
            <input
              type="text"
              name={`variationsNames`}
              placeholder="Variation name"
              className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px] h-fit"
              value={variation.variationName}
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
            <div className="flex flex-col gap-[8px]">
              {variation.sizes.map((size, indexx) => (
                <div className="flex items-center gap-[8px]" key={indexx}>
                  <select
                    name={`productType_${format_variation_name(
                      variation.variationName
                    )}`}
                    className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
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
                    {product_types.map((type) => {
                      return (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name={`variationSize_${format_variation_name(
                      variation.variationName
                    )}`}
                    className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
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
                    placeholder="Variation quantity"
                    className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
                    value={size.quantity}
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
                  <LucideX
                    size={24}
                    color={variation.sizes.length === 1 ? "#E5E5E5" : "#000000"}
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
        Add variation
      </button>
    </div>
  );
};

export default AddproductFromVariations;
