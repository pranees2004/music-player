"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Join() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-xs p-6">
        <Link href="/musicplayer">
          <button
            className="relative inline-flex w-full text-sm font-bold sm:text-base rounded-full  border-2 border-transparent transition-transform transform-gpu hover:scale-105 focus:scale-95 outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none px-4 py-2 sm:py-2 sm:px-5
            text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse
            hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50
            justify-center items-center text-center"
            style={{
              textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
              boxShadow: darkMode
                ? "0px 0px 15px rgba(255, 255, 255, 0.7)"
                : "0px 0px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span className="sparkles">JOIN</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
