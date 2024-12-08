"use client";

import React, { useState, useEffect, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../navbar/page";

export default function MusicPlayer() {
  const [musicList, setMusicList] = useState<string[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch music files from the /api/music endpoint
  useEffect(() => {
    const fetchMusicFiles = async () => {
      const response = await fetch("/api/music");
      const data: string[] = await response.json();
      setMusicList(data);
    };

    fetchMusicFiles();
  }, []);

  // Play/Pause functionality
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle progress bar updates based on current time
  const handleProgress = () => {
    const audio = audioRef.current;
    if (audio) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage);
    }
  };

  // Seek audio to a specific time based on progress bar input
  const seekAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const time = (Number(event.target.value) / 100) * audio.duration;
      audio.currentTime = time;
      setProgress(Number(event.target.value));
    }
  };

  // Play next song in the list
  const nextSongHandler = () => {
    if (musicList.length === 0) return;

    const nextIndex = (currentSongIndex + 1) % musicList.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(false);
    setTimeout(() => audioRef.current?.play(), 0);
    setIsPlaying(true);
  };

  if (musicList.length === 0) {
    return <p className="text-white text-center">Loading songs...</p>;
  }

  const currentSong = musicList[currentSongIndex];

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col items-center justify-center px-4">
      {/* Navbar */}
      <Navbar />

      {/* Music Player */}
      <div
        className="relative bg-gray-800 p-6 rounded-lg shadow-2xl shadow-purple-600 w-full max-w-xs sm:max-w-sm flex flex-col items-center 
        transform scale-105 transition-transform duration-300 ease-in-out"
      >
        {/* Album Cover */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-700 rounded-lg mb-4">
          <img
            src={"/default-cover.jpg"} // Use a default cover or you can modify this if albumCover is available
            alt="Album Cover"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Song Title and Artist */}
        <div className="text-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">{currentSong.split("/").pop()}</h2>
          {/* Using the file name for simplicity */}
          <p className="text-sm">Artist Unknown</p>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center p-4 justify-center space-x-4 mb-4">
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

          <button
            onClick={nextSongHandler}
            className="text-xl sm:text-2xl p-2 sm:p-4"
          >
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
            onChange={seekAudio}
            className="w-3/4 hover:cursor-pointer accent-purple-600"
          />
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={currentSong}
          onTimeUpdate={handleProgress}
          onEnded={nextSongHandler}
        />
      </div>
    </div>
  );
}
