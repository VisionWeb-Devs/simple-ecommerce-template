import { auth, authenticatAdmin } from "@/lib/firebase";
import { serialize } from "cookie";
import { onAuthStateChanged } from "firebase/auth";

export async function POST(request) {
  const params = await request.json();
  const { email, password } = params;
  const authResponse = await authenticatAdmin(email, password);
  if (authResponse.error) {
    return new Response(JSON.stringify({ error: authResponse.error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const token = await authResponse.user.getIdToken();
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Login successful" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
}
// import { authenticatAdmin } from "@/lib/firebase";
// import { serialize } from "cookie"; // Import cookie serializer

// export async function POST(request) {
//   const { email, password } = await request.json();

//   // Authenticate user with Firebase (on the server)
//   const firebaseResponse = await authenticatAdmin(email, password);

//   if (firebaseResponse.error) {
//     return new Response(JSON.stringify({ error: firebaseResponse.error }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   // Get the token (JWT) from Firebase response
//   const token = await firebaseResponse.user.getIdToken();

//   // Set cookie with the Firebase token (HTTP-only, Secure, SameSite)
//   const cookie = serialize("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // Secure only in production
//     sameSite: "strict", // Protect against CSRF attacks
//     maxAge: 60 * 60 * 24 * 7, // Token valid for 1 week
//     path: "/", // Cookie valid for the whole app
//   });

//   // Return response with the cookie set in the headers
//   return new Response(JSON.stringify({ message: "Login successful" }), {
//     status: 200,
//     headers: {
//       "Set-Cookie": cookie, // Set cookie in response
//       "Content-Type": "application/json",
//     },
//   });
// }
