import client from "@/lib/db";

export async function GET(request) {
  const database = client.db("products");
  const collection = database.collection("test-collection");

  // Query the collection (e.g., get all documents)
  const data = await collection.find({}).toArray();
  return new Response(JSON.stringify(data[0].message), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
