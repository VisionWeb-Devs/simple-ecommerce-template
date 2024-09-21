import { getApp, getApps, initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
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
  console.log(products);
  console.log(products[0].variations);
  return products;
};

export { db, getAdminProducts, authenticatAdmin, auth };
