import { motion } from "framer-motion";
import React from "react";

export const FramerSpinner = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-[100%] w-[100%] flex flex-col items-center justify-center bg-black/70 z-[999999]">
      <motion.div
        className="lg:w-[10rem] lg:h-[10rem] w-[5rem] h-[5rem] bg-gradient-to-br from-green-300 from-10%  to-emerald-500 to-90%"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
        exit={{
          scale: 0,
          opacity: 0,
          transition: {
            duration: 0.25,
            ease: "easeIn",
          },
        }}
      ></motion.div>
    </div>
  );
};
