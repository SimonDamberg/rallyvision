"use client";

import { useEffect, useState } from "react";
import { DataItem } from "../types";
import { mapPenalty } from "../utils";
import confetti from "canvas-confetti";

interface LatestEventProps {
  event: DataItem;
}

export default function LatestEvent({ event }: LatestEventProps) {
  const [isNew, setIsNew] = useState(false);
  const [prevId, setPrevId] = useState<number | null>(null);

  useEffect(() => {
    if (prevId !== null && prevId !== event.id) {
      setIsNew(true);

      const prideColors = [
        "#FF0018", // Red
        "#FFA52C", // Orange
        "#FFFF41", // Yellow
        "#008018", // Green
        "#0000F9", // Blue
        "#86007D", // Purple
      ];

      // Left burst with pride colors
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { x: 0.2, y: 0.6 },
        colors: prideColors,
        gravity: 0.8,
        scalar: 1.2,
      });

      // Right burst with pride colors
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { x: 0.8, y: 0.6 },
        colors: prideColors,
        gravity: 0.8,
        scalar: 1.2,
      });

      const burstCount = 3;
      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 100,
            origin: { x: Math.random(), y: 0.6 },
            colors: prideColors,
            gravity: 0.8,
            scalar: 1.2,
          });
        }, 200 * i);
      }

      setTimeout(() => {
        setIsNew(false);
      }, 1000);
    }
    setPrevId(event.id);
  }, [event.id, prevId]);

  return (
    <div
      className={`w-full max-w-lg transition-all ${
        isNew ? "animate-bounce animate-pulse scale-150" : ""
      }`}
    >
      <div
        className={`mx-4 bg-white shadow-xl rounded-lg text-center border border-rally/20 transition-all ${
          isNew ? "animate-spin" : ""
        }`}
      >
        <h1 className="text-2xl font-bold p-4 border-rally/10 text-black">
          NUVARANDE SUP
        </h1>
        <div className="p-6 space-y-6">
          <p className="text-xl text-black font-semibold">{event.name}</p>
          <div className="p-4 bg-rally rounded-lg">
            <p
              className={`text-2xl font-bold text-white ${
                event.penalty === "down" ? "animate-pulse" : ""
              }`}
            >
              {mapPenalty(event.penalty)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
