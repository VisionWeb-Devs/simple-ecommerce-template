"use client";
import {
  change_image_variation,
  change_main_image,
  delete_image,
  uploadImages,
} from "@/lib/googleDriveAdmin";
import { LucideX } from "lucide-react";
import Image from "next/image";

const AddProductImagesFrom = ({ images, setImages, productData, loading }) => {
  const handleImageUpload = async (e) => {
    if (e.target.files.length === 0) return;

    let new_images = Array.from(e.target.files);

    new_images = new_images.map((image, index) => {
      let skipTaken = 0;
      while (
        images.some((img) =>
          img.file.name.includes(`_${images.length + index + skipTaken}`)
        )
      ) {
        skipTaken++;
      }
      return images.length === 0 && index === 0
        ? {
            file: new File(
              [image],
              `main_image_${images.length + index + skipTaken}`
            ),
            status: "uploading...",
          }
        : {
            file: new File(
              [image],
              `image_${images.length + index + skipTaken}`
            ),
            status: "uploading...",
          };
    });
    setImages((prev) => [...prev, ...new_images]);
    const formData = new FormData();
    formData.set("images", JSON.stringify([]));
    new_images.map((img) => {
      const image_name = img.file.name;
      const images_array = JSON.parse(formData.getAll("images"));
      images_array.push(image_name);
      formData.set("images", JSON.stringify(images_array));
      formData.set(image_name, img.file);
    });
    formData.append("product_url", productData.productURL);
    formData.append("product_id", productData.productID);
    const res = await uploadImages(formData);

    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (
          new_images.some((newImage) => newImage.file.name === image.file.name)
        ) {
          image.status = res;
        }
        return image;
      });
    });
  };
  const handleVariationChange = async (file, index, variation) => {
    const uploadPromises = async () => {
      const formData = new FormData();
      formData.append("variation", variation);
      formData.append("product_id", productData.productID);
      formData.append("image_name", file.name);
      const { name, status } = await change_image_variation(formData);
      let newFile = file;
      if (file && file instanceof File) {
        newFile = new File([file], name);
      } else {
        file.name = name;
        newFile = file;
      }
      return { file: newFile, status };
    };
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = { ...newImages[index], status: "Changing" };
      return newImages;
    });

    await uploadPromises().then((uploadedFile) => {
      setImages((prevImages) => {
        const newImages = prevImages.map((prevImage) => {
          if (prevImage.file.name == file.name) {
            return { ...uploadedFile, status: uploadedFile.status };
          }
          return prevImage;
        });
        return newImages;
      });
    });
  };

  const handleRemoveImage = async (e, image) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("product_id", productData.productID);
    formData.set("image_name", image.file.name);
    const res = await delete_image(formData);
    if (res === "image deleted") {
      setImages((prev) => prev.filter((prevImage) => prevImage != image));
    }
  };
  const handleMainImageChange = async (e, image, index) => {
    if (image.file.name.includes("main_")) {
      return;
    }
    const formData = new FormData();
    formData.set("product_id", productData.productID);
    formData.set("image_name", image.file.name);
    formData.set(
      "main_name",
      images.filter((img) => img.file.name.includes("main_"))[0].file.name
    );
    const newImages = images.map((img, i) => {
      let newFile;
      if (img.file.name.includes("main_")) {
        if (img.file && img.file instanceof File) {
          newFile = new File(
            [img.file],
            `${img.file.name
              .split("_")
              .slice(1, img.file.name.length)
              .join("_")}`
          );
        } else {
          img.file.name = `${img.file.name
            .split("_")
            .slice(1, img.file.name.length)
            .join("_")}`;
          newFile = img.file;
        }
        return { file: newFile, status: "image changed" };
      } else if (i === index) {
        if (img.file && img.file instanceof File) {
          newFile = new File([img.file], `main_${img.file.name}`);
        } else {
          img.file.name = `main_${img.file.name}`;
          newFile = img.file;
        }
        return { file: newFile, status: "image changed" };
      }
      return img;
    });
    formData.set("new_name", newImages[index].file.name);
    const res = await change_main_image(formData);
    if (res.status === "image changed") {
      setImages(newImages);
    } else {
      alert("Error changing main image");
    }
  };
  return (
    <form
      className="relative min-w-[800] min-h-[600] max-w-full flex-1"
      encType="multipart/form-data"
    >
      <div className="min-w-[300px] min-h-[300px] w-full max-h-[500px] bg-gray-50 relative">
        <input
          type="file"
          accept="image/*"
          name="file"
          multiple
          className="cursor-pointer w-full h-full absolute top-0 left-0 opacity-0 z-40"
          onChange={handleImageUpload}
        />
        {images.length && (
          <Image
            src={
              images.find((image) => {
                return image.file.name.includes("main_");
              })?.file instanceof File
                ? URL.createObjectURL(
                    images.find((image) => {
                      return image.file.name.includes("main_");
                    }).file
                  )
                : images.find((image) => {
                    return image.file.name.includes("main_");
                  })?.file?.webContentLink
            }
            fill
            objectFit="cover"
            className="object-cover"
            sizes="100%"
            alt="product"
            priority={false}
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
                alt="product"
                fill
                className="object-cover"
                sizes="100%"
              />
            </div>
            <div className="max-w-[200px] overflow-auto hide-scrollbar">
              {image.file.name}
            </div>
            <select
              name="variation"
              className="border-[1px] border-main rounded-[4px] px-[16px] py-[8px] text-[16px]"
              defaultValue={
                productData.variations
                  ?.filter((variation) =>
                    image.file.name.includes(
                      variation.variationName.toLowerCase()
                    )
                  )
                  .map((variation) => variation.variationName)[0]
              }
              onChange={(e) => {
                handleVariationChange(image.file, index, e.target.value);
              }}
            >
              <option value="">Select variation</option>
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
            <input
              type="checkbox"
              checked={image.file.name.includes("main_")}
              name="main"
              onChange={(e) => handleMainImageChange(e, image, index)}
            />
            <div>{image.status}</div>
            <LucideX
              size={24}
              color={
                image.file.name.includes("main_") || loading
                  ? "#E5E5E5"
                  : "#000000"
              }
              className={
                image.file.name.includes("main_") || loading
                  ? "cursor-not-allowed"
                  : ""
              }
              onClick={(e) =>
                image.file.name.includes("main_") || loading
                  ? null
                  : handleRemoveImage(e, image)
              }
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default AddProductImagesFrom;
