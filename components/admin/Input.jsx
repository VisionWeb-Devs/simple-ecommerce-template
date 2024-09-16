import React from "react";

function Input({ label, placeholder, value, setValue, readOnly }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <label className="text-[20px] font-semibold">{label}</label>
      <input
        readOnly={readOnly}
        type="text"
        id="name"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
      />
    </div>
  );
}

export default Input;
