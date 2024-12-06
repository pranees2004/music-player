"use client";

import React, { useState } from "react";
import { RiArrowDownDoubleFill } from "react-icons/ri";

export default function MusicListing() {
  const [isIconExpanded, setIsIconExpanded] = useState(false);

  const toggleIcon = () => {
    setIsIconExpanded(!isIconExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-2 py-6">
      {/* Header Section */}
     

      {/* Music List Section */}
      <div className="w-full  justify-center items-center max-w-xl mt-8 ">
        <ul className="space-y-2 items-center justify-center">
          {[
            { title: "Song 1", artist: "Artist 1" },
            { title: "Song 2", artist: "Artist 2" },
            { title: "Song 3", artist: "Artist 3" },
            { title: "Song 4", artist: "Artist 4" },
          ].map((track, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-purple-600  transition-shadow duration-300"
            >
              <div>
                <h2 className="text-lg font-medium">{track.title}</h2>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
            
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
