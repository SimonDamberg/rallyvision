"use client";

import { useEffect, useState } from "react";
import { DataItem } from "../types";

interface NowPlayingProps {
  latest: DataItem;
}

const isSweden = (country: string) => country.toLowerCase() === "sweden";

const getCountryFlag = (countryName: string) => {
  const flags: { [key: string]: string } = {
    Norway: "🇳🇴",
    Luxembourg: "🇱🇺",
    Estonia: "🇪🇪",
    Israel: "🇮🇱",
    Lithuania: "🇱🇹",
    Spain: "🇪🇸",
    Ukraine: "🇺🇦",
    "United Kingdom": "🇬🇧",
    Austria: "🇦🇹",
    Iceland: "🇮🇸",
    Latvia: "🇱🇻",
    Netherlands: "🇳🇱",
    Finland: "🇫🇮",
    Italy: "🇮🇹",
    Poland: "🇵🇱",
    Germany: "🇩🇪",
    Greece: "🇬🇷",
    Armenia: "🇦🇲",
    Switzerland: "🇨🇭",
    Malta: "🇲🇹",
    Portugal: "🇵🇹",
    Denmark: "🇩🇰",
    Sweden: "🇸🇪",
    France: "🇫🇷",
    "San Marino": "🇸🇲",
    Albania: "🇦🇱",

    // Add more countries as needed
  };
  return flags[countryName] || "🏳️";
};

export default function NowPlaying({ latest }: NowPlayingProps) {
  const [prevPerformance, setPrevPerformance] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const currentPerformance = `${latest.performance.song}-${latest.performance.artist}-${latest.performance.country}`;

    if (prevPerformance !== null && prevPerformance !== currentPerformance) {
      // Play sound effect
      const audio = new Audio("/notification.mp3");
      audio.play().catch((e) => console.log("Audio play failed:", e));

      // Trigger animation
      setIsNew(true);
      setTimeout(() => setIsNew(false), 1000);
    }
    setPrevPerformance(currentPerformance);
  }, [latest.performance]);

  return (
    <div
      className={`w-full p-8 shadow-xl transition-all ${
        isSweden(latest.performance.country)
          ? "bg-[#006AA7] text-[#FECC02]"
          : "bg-rally text-white"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-500 ${
          isNew ? "scale-105 translate-y-1" : ""
        }`}
      >
        <div className="text-2xl font-bold tracking-widest opacity-90">LÅT</div>
        <div
          className={`text-6xl font-black mt-4 ${isNew ? "animate-pulse" : ""}`}
        >
          <span className="text-7xl">
            {getCountryFlag(latest.performance.country)}
          </span>{" "}
          {latest.performance.song} - {latest.performance.artist}
        </div>
      </div>
    </div>
  );
}
