"use server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
async function setUserCookie() {
  const cookieStore = cookies();
  let userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    userId = uuidv4();
    // cookies().set("user_id", userId, {
    //   path: "/", // cookie available on the entire site
    //   maxAge: 12 * 60 * 60 * 24 * 30, // cookie expires in 1 year
    // });
  }
  return userId;
}
async function getUserCookie() {
  const cookieStore = cookies();
  let userId = cookieStore.get("user_id")?.value;
  return userId;
}

export { getUserCookie, setUserCookie };
