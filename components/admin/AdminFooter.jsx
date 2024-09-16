import React from "react";

const AdminFooter = () => {
  return (
    <div className=" flex justify-center items-center w-full gap-1">
      {" "}
      <span className="text-lg">&#169;</span> Created By{" "}
      <a
        href="https://www.instagram.com/visionweb.devs/"
        target="_blank"
        className="font-semibold underline-offset-2  underline tracking-wider"
      >
        VisionWeb Devs
      </a>
    </div>
  );
};

export default AdminFooter;
