import React from "react";
import { Truck, ArrowLeftRight, Coins } from "lucide-react";

const InfoCard = ({ icon: Icon, text }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm">
    <div className="mb-4 bg-gray-50 p-4 rounded-full">
      <Icon size={32} className="text-black" />
    </div>
    <p className="text-gray-800 text-lg font-medium text-center">{text}</p>
  </div>
);

const Informations = () => {
  const infoItems = [
    {
      icon: Truck,
      text: "Fastest domicile and stop desk shipping services",
    },
    {
      icon: ArrowLeftRight,
      text: "Return request processing takes 3-5 days",
    },
    {
      icon: Coins,
      text: "Pay by cash on delivery or BARIDI Mob",
    },
  ];

  return (
    <div className="container mx-auto lg:px-28 md:px-14 px-9 py-8 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold  text-gray-900 mb-12">
          Shipping & Payment Information
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {infoItems.map((item, index) => (
            <InfoCard key={index} icon={item.icon} text={item.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Informations;
