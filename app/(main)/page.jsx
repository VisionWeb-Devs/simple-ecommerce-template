"use client";
import { Categories } from "@/components/home/Categories";
import { TopSelling } from "@/components/home/TopSelling";
// import { useEffect, useState } from "react";

export default function Home() {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function test() {
  //     const response = await fetch("/api/test", {
  //       method: "GET",
  //     });
  //     const message = await response.json();
  //     if (message) {
  //       setLoading(false);
  //     }
  //   }
  //   test();
  // }, []);
  // if (loading) return <div>Loading...</div>;
  return (
    <div>
      {!loading && (
        <>
          <TopSelling />
          <Categories />
        </>
      )}
    </div>
  );
}
