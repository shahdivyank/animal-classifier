import React from "react";

const Button = ({ Icon, text, onClick }) => {
  return (
    <div
      className="flex w-full items-center justify-center h-fit rounded-lg cursor-pointer bg-gray-50 hover:opacity-70 my-4 p-3"
      onClick={onClick}
    >
      <Icon className="text-xl text-black mx-2" />
      <p className="text-sm text-black font-semibold">{text}</p>
    </div>
  );
};

export default Button;
