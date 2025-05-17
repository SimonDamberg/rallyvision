"use client";

import { useEffect, useState } from "react";
import { DataItem } from "../types";
import { mapPenalty } from "../utils";
import confetti from "canvas-confetti";
import Image from "next/image";

interface LatestEventProps {
  event: DataItem;
}

const isSweden = (country: string) => country.toLowerCase() === "sweden";

export default function LatestEvent({ event }: LatestEventProps) {
  const [isNew, setIsNew] = useState(false);
  const [prevId, setPrevId] = useState<number | null>(null);

  useEffect(() => {
    if (prevId !== null && prevId !== event.id) {
      setIsNew(true);

      // Regular confetti effects
      const prideColors = [
        "#FF0018", // Red
        "#FFA52C", // Orange
        "#FFFF41", // Yellow
        "#008018", // Green
        "#0000F9", // Blue
        "#86007D", // Purple
      ];

      // Left burst
      confetti({
        particleCount: 250,
        spread: 90,
        origin: { x: 0.2, y: 0.6 },
        colors: prideColors,
        gravity: 0.8,
        scalar: 2,
      });

      // Right burst
      setTimeout(() => {
        confetti({
          particleCount: 250,
          spread: 90,
          origin: { x: 0.8, y: 0.6 },
          colors: prideColors,
          gravity: 0.8,
          scalar: 2,
        });
      }, 200);

      setTimeout(() => {
        setIsNew(false);
      }, 1000);
    }
    setPrevId(event.id);
  }, [event.id, prevId]);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="hidden md:block">
        <Image
          src={
            isSweden(event.performance.country)
              ? "/anna-sweden.png"
              : "/anna.png"
          }
          alt="Anna"
          width={300}
          height={300}
          className={`transform -scale-x-100 ${
            isSweden(event.performance.country)
              ? "animate-bounce transition-transform duration-300"
              : ""
          }`}
          style={{
            animationDuration: isSweden(event.performance.country)
              ? "1s"
              : "0s",
            transformOrigin: "bottom",
          }}
        />
      </div>
      <div
        className={`w-full max-w-4xl transition-all ${
          isNew ? "animate-bounce animate-pulse scale-150" : ""
        }`}
      >
        <div
          className={`mx-8 bg-white shadow-2xl rounded-lg text-center transition-all ${
            isNew ? "animate-spin" : ""
          }`}
        >
          <h1 className="text-5xl font-black p-6 border-rally/10 text-black">
            NUVARANDE SUP
          </h1>
          <div className="p-8 space-y-8">
            <p className="text-4xl text-black font-bold">{event.name}</p>
            <div className="p-6 bg-rally rounded-lg">
              <p
                className={`text-5xl font-black text-white ${
                  event.penalty === "down" ? "animate-pulse" : ""
                }`}
              >
                {mapPenalty(event.penalty)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          src={
            isSweden(event.performance.country)
              ? "/anna-sweden.png"
              : "/anna.png"
          }
          alt="Anna"
          width={300}
          height={300}
          className={`${
            isSweden(event.performance.country)
              ? "animate-bounce transition-transform duration-300"
              : ""
          }`}
          style={{
            animationDuration: isSweden(event.performance.country)
              ? "1s"
              : "0s",
            transformOrigin: "bottom",
          }}
        />
      </div>
    </div>
  );
}
