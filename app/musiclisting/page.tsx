"use client";

import React, { useEffect, useState, useRef } from "react";

export default function MusicListing() {
  const [musicList, setMusicList] = useState<string[]>([]); // List of music files
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null); // Track the index of the currently playing song
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // State to manage play/pause
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element

  // Fetch music files from the /api/music endpoint
  useEffect(() => {
    const fetchMusicFiles = async () => {
      const response = await fetch("/api/music");
      const data: string[] = await response.json();
      setMusicList(data);
    };

    fetchMusicFiles();
  }, []);

  // Function to handle play/pause functionality
  const handlePlayPause = (index: number) => {
    if (currentTrackIndex !== index) {
      // If the new track is selected, play it
      if (audioRef.current) {
        audioRef.current.src = musicList[index];
        audioRef.current.play();
      }
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    } else {
      // If the current track is clicked, toggle play/pause
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-2 py-6">
      {/* Header Section */}
      <h1 className="text-2xl font-bold mb-6">My Playlist</h1>

      {/* Music List Section */}
      <div className="w-full max-w-xl mt-8">
        <ul className="space-y-4">
          {musicList.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-purple-600 transition-shadow duration-300"
            >
              <div>
                <h2 className="text-lg font-medium">Track {index + 1}</h2>
                <p className="text-sm text-gray-400">{file.split("/").pop()}</p>
              </div>

              {/* Play/Pause Button */}
              <button
                className="p-2 bg-purple-600 text-white rounded"
                onClick={() => handlePlayPause(index)}
              >
                {currentTrackIndex === index && isPlaying ? (
                  <span>Pause</span> // Display "Pause" if the track is currently playing
                ) : (
                  <span>Play</span> // Display "Play" if the track is not currently playing
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)} // Stop playing when track ends
        onPause={() => setIsPlaying(false)} // Update state when paused
        onPlay={() => setIsPlaying(true)} // Update state when playing
      />
    </div>
  );
}
