"use client";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleSubmit = async () => {
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setBtnLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      const user = userCredential.user;
      if (user) {
        setSuccess("Login successful");
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      }
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Email not associated with any account");
      }
      if (error.code === "auth/invalid-credential") {
        setError("Invalid credentials");
      }
      console.error(error);
    }

    setBtnLoading(false);
    // const data = await response.json();

    // if (data.error) {
    //   setError(data.error.code.replace("auth/", ""));
    //   return;
    // }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center text-main">
      <div className="flex flex-col gap-[24px] max-w-[500px]">
        <div className="font-semibold">
          <div className="text-[48px]">Login</div>
          <div className="text-[16px] opacity-75">
            forgot password? contact us +213799902523
          </div>
        </div>
        <input
          placeholder="Email"
          name="email"
          type="email"
          className="py-[10px] px-[16px] text-[16px] border border-main border-opacity-75 focus-visible:rounded-none"
          onChange={handleChange}
          value={loginData.email}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          className="py-[10px] px-[16px] text-[16px] border border-main border-opacity-75 focus-visible:rounded-none"
          onChange={handleChange}
          value={loginData.password}
        />
        {error && (
          <div className="text-[16px] text-red-500 font-semibold">{error}</div>
        )}
        {success && (
          <div className="text-[16px] text-green-500 font-semibold">
            {success}
          </div>
        )}
        <button
          className="py-[10px] px-[16px] bg-main text-white text-[18px] font-medium text-left"
          onClick={handleSubmit}
          disabled={btnLoading}
        >
          LOGIN
        </button>
        <div className="text-[16px] font-semibold">
          <span className="opacity-75">
            By clicking 'Log In' you agree to our website
          </span>{" "}
          <span className="underline">Terms & Conditions.</span>
        </div>
      </div>
    </div>
  );
};

export default page;
