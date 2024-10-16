"use server";
import { google } from "googleapis";
import fs from "fs";
import { Readable } from "stream";
import { redirect } from "next/navigation";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const serviceAccount = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
  private_key_id: process.env.ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.ADMIN_PRIVATE_KEY,
  client_email: process.env.ADMIN_CLIENT_EMAIL,
  client_id: process.env.ADMIN_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.ADMIN_CLIENT,
  universe_domain: "googleapis.com",
};
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// Function to find folder by name
async function findFolderByName(productURL) {
  const res = await drive.files.list({
    q: `name = '${productURL}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false and '1QjF3IJ3cQFVKwKE7Ult87oOi_tMGqrA4' in parents`,
    fields: "files(id, name)",
  });

  return res.data.files.length ? res.data.files[0] : null;
}
// const variation = formData.get("variation");
// const file = formData.get("file");
// const index = formData.get("index");

async function uploadImages(formData) {
  const product_url = formData.get("product_url");
  const product_id = formData.get("product_id");
  const images_names = JSON.parse(formData.getAll("images"));
  const images = images_names.map((image_name) => {
    return formData.get(image_name);
  });

  let existingFolder = await findFolderByName(product_id);
  if (!existingFolder) {
    const res = await drive.files.create({
      requestBody: {
        name: product_id,
        mimeType: "application/vnd.google-apps.folder",
        parents: ["1QjF3IJ3cQFVKwKE7Ult87oOi_tMGqrA4"],
      },
      fields: "id",
    });
    existingFolder = res.data;
  }

  for (let i = 0; i < images.length; i++) {
    const image_name = images_names[i];
    const image = images[i];

    const buffer = Buffer.from(await image.arrayBuffer());
    const bufferStream = new Readable();
    bufferStream._read = () => {};
    bufferStream.push(buffer);
    bufferStream.push(null);
    const res = await drive.files.create({
      requestBody: {
        name: image_name,
        mimeType: image.mimeType,
        parents: [existingFolder.id],
      },
      media: {
        mimeType: image.mimeType,
        body: bufferStream,
      },
    });
  }
  return "images uploaded";
}

async function findFileByNameInFolder(fileName, folderId) {
  const res = await drive.files.list({
    q: `name = '${fileName}' and '${folderId}' in parents and trashed = false`,
    fields: "files(id, name)",
    pageSize: 10,
  });

  return res.data.files.length ? res.data.files[0] : null;
}

async function change_image_variation(formData) {
  const variation = formData.get("variation");
  const product_id = formData.get("product_id");
  const image_name = formData.get("image_name");

  const parent_folder = await findFolderByName(product_id);
  const image_file = await findFileByNameInFolder(image_name, parent_folder.id);

  if (image_file) {
    const splitted_name = image_name.split("_");
    let new_name = image_name;
    if (splitted_name.some((namee) => namee == "main")) {
      new_name = `${image_name.split("_").slice(0, 3).join("_")}_${variation}`;
    } else {
      new_name = `${image_name.split("_").slice(0, 2).join("_")}_${variation}`;
    }
    const res = await drive.files.update({
      fileId: image_file.id,
      requestBody: {
        name: new_name.toLocaleLowerCase(),
      },
    });
    return {
      name: new_name.toLocaleLowerCase(),
      status: "image changed",
    };
  } else {
    return { name: "error", status: "image not found" };
  }
}
async function change_main_image(formData) {
  const product_id = formData.get("product_id");
  const image_name = formData.get("image_name");
  const new_name = formData.get("new_name");
  const main_name = formData.get("main_name");

  const parent_folder = await findFolderByName(product_id);
  const image_file = await findFileByNameInFolder(image_name, parent_folder.id);
  const main_file = await findFileByNameInFolder(main_name, parent_folder.id);

  if (image_file && main_file) {
    const res = await drive.files.update({
      fileId: image_file.id,
      requestBody: {
        name: new_name.toLocaleLowerCase(),
      },
    });
    const res2 = await drive.files.update({
      fileId: main_file.id,
      requestBody: {
        name: main_name
          .split("_")
          .slice(1, main_name.length)
          .join("_")
          .toLocaleLowerCase(),
      },
    });

    return {
      name: new_name.toLocaleLowerCase(),
      status: "image changed",
    };
  } else {
    return { name: "error", status: "image not found" };
  }
}

function formatFormData(formData) {
  const formattedData = {
    name: formData.get("name"),
    productURL: formData.get("productURL"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")),
    salePrice: parseFloat(formData.get("salePrice")),
    productID: formData.get("product_id"),
    available: formData.get("available") === "on",
    variations: [],
  };

  const variationNames = formData
    .getAll("variationsNames")
    .map((name) => name.toLocaleLowerCase());

  variationNames.forEach((name) => {
    const productTypeKey = `productType_${name}`;
    const sizeKey = `variationSize_${name}`;
    const quantityKey = `variationQuantity_${name}`;

    const productTypes = formData.getAll(productTypeKey);
    const variationSizes = formData.getAll(sizeKey);
    const variationQuantities = formData.getAll(quantityKey);

    const zipped = productTypes.map((type, index) => [
      type,
      variationSizes[index],
      variationQuantities[index],
    ]);
    formattedData.variations.push({
      variationName: name.charAt(0).toUpperCase() + name.slice(1),
      productType: productTypes[0] || "",
      sizes: [],
    });
    zipped.forEach(([type, size, quantity]) => {
      formattedData.variations[formattedData.variations.length - 1].sizes.push({
        size,
        quantity: parseInt(quantity, 10),
      });
    });
  });
  return formattedData;
}
async function truncate_collection(collectionn) {
  let snapshot = await getDocs(collection(db, collectionn));
  snapshot.docs.map(async (docc) => {
    const ref = doc(db, collectionn, docc.id);
    await deleteDoc(ref);
  });
}
async function add_product(formData) {
  // await truncate_collection("products");
  const data = formatFormData(formData);
  try {
    const docRef = doc(db, "products", data.productID);
    await setDoc(docRef, data);
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      error: "Error creating a product with this name. Please try another one.",
    };
  }
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const products = snapshot.docs.map((doc) => doc.data());
    // console.log(
    //   "products: ",
    //   products.filter((product) => product.productURL === data.productURL)
    //   // products
    // );
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      error: "Error getting the product. Please try again.",
    };
  }

  return { status: "success", message: "Product added successfully." };
}

const getImages = async (productId) => {
  const folder = await findFolderByName(productId);
  if (!folder) {
    return { images: [] };
  }
  const res = await drive.files.list({
    q: `'${folder.id}' in parents and trashed = false`,
    fields: "files(id, name, mimeType, webContentLink)",
  });
  if (res.data.files.length === 0) {
    return { images: [] };
  }
  return {
    main_image: {
      id: res.data.files[0].id,
      name: res.data.files[0].name,
      mimeType: res.data.files[0].mimeType,
      webContentLink: res.data.files[0].webContentLink,
    },
    images: res.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      webContentLink: file.webContentLink,
    })),
  };
};
const delete_image = async (formData) => {
  const product_id = formData.get("product_id");
  const image_name = formData.get("image_name");
  const parent_folder = await findFolderByName(product_id);
  const image_file = await findFileByNameInFolder(image_name, parent_folder.id);
  if (image_file) {
    await drive.files.delete({
      fileId: image_file.id,
    });
    return "image deleted";
  } else {
    return "image not found";
  }
};
export {
  add_product,
  change_image_variation,
  change_main_image,
  getImages,
  uploadImages,
  delete_image,
};
