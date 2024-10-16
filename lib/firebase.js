import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, "=>", doc.data());
  // });
  querySnapshot.forEach((doc) => {
    product = doc.data();
  });
  return product;
};

export { db, getAdminProducts, authenticatAdmin, getAdminProduct, auth };
