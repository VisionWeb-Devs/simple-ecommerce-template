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
    <div className="w-full px-4 mx-auto mt-6 md:mt-10 min-h-[calc(100vh-373px)] flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Contact</h1>
      <form
        className="space-y-4 w-full max-w-3xl px-4 md:px-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Comment"
          rows={4}
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
          value={formData.comment}
          onChange={handleChange}
        />
        <div className="flex justify-center items-center pt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-black text-white text-lg py-2 px-8 md:px-32 hover:bg-gray-800 transition-colors rounded-md"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
