import { Copyright } from "lucide-react";
import React from "react";

const AdminFooter = () => {
  return (
    <div className=" flex justify-center items-center w-full gap-1">
      {" "}
      <span className="text-lg">&#169;</span> Created By{" "}
      <span className="font-semibold">VisionWeb Devs</span>
    </div>
  );
};

export default AdminFooter;
