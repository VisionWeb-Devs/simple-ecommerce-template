import db from "@/lib/db";
import { listFolders } from "@/lib/googleDrive";
import { collection, getDocs } from "firebase/firestore";

export async function GET(request) {
  try {
    // // Reference a specific collection (replace 'your-collection' with your actual collection name)
    // const querySnapshot = await getDocs(collection(db, "test"));

    // // Loop through and log each document in the collection
    // const docs = [];
    // querySnapshot.forEach((doc) => {
    //   docs.push(doc.data());
    // });
    const files = await listFolders();

    return new Response(JSON.stringify(files), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error getting collections: ", error);
    return new Response("Error getting collections", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
