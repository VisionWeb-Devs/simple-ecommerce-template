import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getImages } from "./googleDriveAdmin";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  authDomain: process.env.NEXT_PUBLIC_PROJECT_ID + ".firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_PROJECT_ID + ".appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

const authenticatAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return { user };
  } catch (error) {
    return { error };
  }
};
const getAdminProducts = async () => {
  const products = [];
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  return products;
};

const getAdminProduct = async (productURL) => {
  let product = null;
  // const querySnapshot = await getDocs(collection(db, "products"));
  const productQuery = query(
    collection(db, "products"),
    where("productURL", "==", productURL)
  );

  const querySnapshot = await getDocs(productQuery);

  querySnapshot.forEach((doc) => {
    product = doc.data();
  });
  return product;
};

const getTopSelling = async () => {
  const products = [];
  const q = query(
    collection(db, "products"),
    limit(4),
    where("available", "==", true)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  return products;
};

const getCheckout = async (userId) => {
  const cartRef = doc(db, "cart", userId);
  const cartDoc = await getDoc(cartRef);

  let cartItems = [];
  const products = cartDoc.data().products;

  cartItems = await Promise.all(
    products.map(async (doc) => {
      const product = await getAdminProduct(doc.product_url);
      const images = await getImages(doc.product_id);
      const main_image = images.main_image;
      return {
        name: product.name,
        price: product.salePrice !== 0 ? product.salePrice : product.price,
        id: product.productID,
        quantity: doc.quantity,
        size: doc.product_size,
        image: main_image,
      };
    })
  );

  return cartItems;
};

export {
  db,
  authenticatAdmin,
  getAdminProduct,
  getAdminProducts,
  getTopSelling,
  getCheckout,
  auth,
};
