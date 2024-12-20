import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
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

const getLatestProducts = async () => {
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
  if (!cartDoc.exists()) return [];

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
        product_url: product.productURL,
        quantity: doc.quantity,
        size: doc.product_size,
        image: main_image,
        product_variation: doc.product_variation,
      };
    })
  );

  return cartItems;
};

const getOrderDetails = async (orderId) => {
  const orderRef = doc(db, "orders", orderId);
  const orderDoc = await getDoc(orderRef);
  if (!orderDoc.exists()) return null;

  const order = orderDoc.data();

  const order_details = {
    order_id: order.order_id,
    created_at: order.created_at,
    order_subtotal: order.order_subtotal,
    order_total: order.order_total,
    payment_method: "Cash on delivery",
    order_items: order.order_items.map((item) => ({
      product_name: item.product_name,
      quantity: item.quantity,
      size: item.size,
      product_variation: item.product_variation,
      price: item.price,
      total: item.total,
    })),
    shipping: order.shipping,
    orders_status: order.orders_status,
    street: order.user.address.street,
    firstname: order.user.firstname,
    lastname: order.user.lastname,
    phone_number: order.user.phone_number,
  };
  return order_details;
};

const getCategoriesProducts = async (collectionName) => {
  const products = [];
  const q = query(
    collection(db, "products"),
    limit(12),
    where("available", "==", true),
    where("productCategory", "==", collectionName.toLowerCase())
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  return products;
};
const getAllProducts = async () => {
  const q = query(
    collection(db, "products"),
    // limit(3),
    where("available", "==", true)
  );
  const querySnapshot = await getDocs(q);

  const products = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      doc = doc.data();
      const images = await getImages(doc.productID);
      const main_image = images.main_image;
      return {
        name: doc.name,
        price: doc.price,
        salePrice: doc.salePrice,
        id: doc.productID,
        product_url: doc.productURL,
        productCategory: doc.productCategory,
        image: main_image.webContentLink,
      };
    })
  );
  return products || [];
};

const getOrders = async (lastOrder, pageSize) => {
  const orders = [];
  const ordersRef = collection(db, "orders");
  const snapshot = await getCountFromServer(ordersRef);
  const totalOrders = snapshot.data().count;
  if (totalOrders === 0) {
    return [];
  }
  let q = lastOrder
    ? query(
        ordersRef,
        orderBy("created_at", "desc"),
        startAfter(lastOrder),
        limit(pageSize)
      )
    : query(ordersRef, orderBy("created_at", "desc"), limit(pageSize));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return [];
  }
  querySnapshot.forEach((doc) => {
    orders.push(doc.data());
  });
  return orders;
};
const getOrderInfo = async (orderId) => {
  const orderRef = doc(db, "orders", orderId);
  const orderDoc = await getDoc(orderRef);
  if (!orderDoc.exists()) return null;

  const order = orderDoc.data();

  return order;
};

const updateOrderSatus = async (orderId, status) => {
  const orderRef = doc(db, "orders", orderId);
  if (!(await getDoc(orderRef)).exists()) {
    return false;
  }
  await updateDoc(orderRef, {
    order_status: status,
  });
  return true;
};

export {
  db,
  authenticatAdmin,
  getAdminProduct,
  getAdminProducts,
  getLatestProducts,
  getCheckout,
  getOrderDetails,
  getCategoriesProducts,
  getAllProducts,
  getOrders,
  getOrderInfo,
  updateOrderSatus,
  auth,
};
