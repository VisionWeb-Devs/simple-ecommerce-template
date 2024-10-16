import React from "react";

const AdminFooter = () => {
  return (
    <div className=" flex justify-center items-center  gap-1  py-4 px-4 sm:px-6 md:px-8 lg:px-20 w-full">
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
