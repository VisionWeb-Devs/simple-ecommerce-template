"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full  mx-auto mt-10  h-[calc(100vh-373px)] items-center flex flex-col ">
      <h1 className="text-3xl font-bold mb-20">Contact</h1>
      <form className="space-y-4 w-1/2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 ">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border border-gray-300 p-2 w-full"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            className="border border-gray-300 p-2 w-full"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          className="border border-gray-300 p-2 w-full"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Comment"
          rows={4}
          className="border border-gray-300 p-2 w-full"
          value={formData.comment}
          onChange={handleChange}
        ></textarea>
        <div className="flex w-full justify-center items-center">
          <button
            type="submit"
            className="bg-black text-white text-lg py-2 px-32 hover:bg-gray-800 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
