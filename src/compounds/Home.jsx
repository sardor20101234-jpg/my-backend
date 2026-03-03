import React from "react";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row justify-center items-center px-10 bg-gradient-to-b from-[#F8E7F6] via-[#E0D7F9] to-[#f3f4f6]">
      {/* Left text */}
      <div className="flex-1 text-left max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight"
        >
          Transform Learning with <span className="text-indigo-600">Agiedus</span>
        </motion.h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700">
          Interactive courses, live animations, AI-driven progress tracking, and a global student network.
        </p>
      </div>
      {/* Right logo */}
      <motion.img
        src={Logo}
        alt="Agiedus"
        className="w-[340px] md:w-[450px]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
}
