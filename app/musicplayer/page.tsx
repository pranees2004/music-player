"use client";

import React, { useState } from "react";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true); // Dark mode toggle

  // Dummy song data
  const song = {
    title: "NaNaNa",
    artist: "Nami",
    albumCover: "path/to/album-cover.jpg", // Replace with the actual image path
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(event.target.value));
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } h-screen flex flex-col items-center justify-center px-4`}
    >
      {/* Music Player */}
      <div
  className="relative bg-gray-800 p-6 rounded-lg shadow-2xl shadow-purple-600 w-full max-w-xs sm:max-w-sm flex flex-col items-center 
    transform scale-105 transition-transform duration-300 ease-in-out"
>

        {/* Button positioned in the top-left corner */}
        <div className="p-8 ">
          <button className="absolute top-2 left-2 sm:top-4 sm:left-4 p-1 sm:p-2 bg-purple-600 text-white rounded-full z-10">
            <RiArrowDownDoubleFill className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <div className="absolute bottom-[28rem] left-0 w-full h-[1px] bg-white"></div>
        </div>

        {/* Album Cover */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-700 rounded-lg mb-4">
          <img
            src={song.albumCover}
            alt="Album Cover"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Song Title and Artist */}
        <div className="text-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">{song.title}</h2>
          <p className="text-sm">{song.artist}</p>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center p-4 justify-center space-x-4 mb-4">
          {/* Heart Icon */}
          <button className="text-xl p-2 sm:p-4">
            <i className="fas fa-heart"></i>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="p-4 sm:p-8 bg-purple-600 text-white h-14 sm:h-16 w-14 sm:w-16 rounded-full flex items-center justify-center
            hover:bg-purple-500 focus:ring-4 focus:ring-purple-300"
          >
            {isPlaying ? (
              <i className="fas fa-pause text-2xl sm:text-3xl"></i>
            ) : (
              <i className="fas fa-play text-2xl sm:text-3xl"></i>
            )}
          </button>

          {/* Forward Button */}
          <button className="text-xl sm:text-2xl p-2 sm:p-4">
            <i className="fas fa-forward"></i>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex flex-col items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgress}
            className="w-3/4 hover:cursor-pointer accent-purple-600"
          />
        </div>

        {/* Controls for "Up Next" and "Users" */}
        <div className="w-full flex flex-col sm:flex-row justify-between text-xs sm:text-sm mt-4">
          <button className="text-blue-500 mb-2 sm:mb-0 hover:underline">
            Up Next
          </button>
          <button className="text-blue-500 hover:underline">Users</button>
        </div>
      </div>
    </div>
  );
}