"use client";
import React from "react";
import { motion } from "framer-motion";
import { TShirt, ShoppingBag } from "lucide-react";

const Loading = () => {
  const fashionIcons = ["TShirt", "ShoppingBag"];

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative">
        {fashionIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              x: [0, 100 * Math.cos(index * ((2 * Math.PI) / 3)), 0],
              y: [0, 100 * Math.sin(index * ((2 * Math.PI) / 3)), 0],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
              delay: index * 0.5,
            }}
          >
            <Icon size={64} color="white" />
          </motion.div>
        ))}

        <motion.div
          className="w-40 h-40 bg-white rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0 0 rgba(255, 255, 255, 0.7)",
              "0 0 0 20px rgba(255, 255, 255, 0)",
              "0 0 0 0 rgba(255, 255, 255, 0.7)",
            ],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <motion.span
            className="text-3xl font-bold text-black text-center"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
          >
            Fashion
            <br />
            Loading
          </motion.span>
        </motion.div>
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              scale: 0,
            }}
            animate={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              scale: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
