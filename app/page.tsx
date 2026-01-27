"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🎥 Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/gtm.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 🌑 Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-black/20 to-black/10" />

      {/* 🧊 Content */}
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeIn",
        }}
        className="relative z-20 max-w-7xl mx-auto px-15 min-h-screen flex items-center justify-end max-md:justify-center"
      >
        <div className="max-w-xl backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Go To Market <br />
            Application
          </h1>

          <p className="text-gray-300 mt-5 text-lg">
            Build launch plans, target the right audience and scale faster with
            data-driven go-to-market strategies.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition"
            >
              Get Started
            </Link>

            <Link
              href="#"
              className="border border-white/30 text-white px-8 py-3 rounded-xl text-lg hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
