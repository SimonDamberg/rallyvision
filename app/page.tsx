import { DataItem } from "./types";
import AutoRefresh from "./components/AutoRefresh";
import NowPlaying from "./components/NowPlaying";
import LatestEvent from "./components/LatestEvent";
import Image from "next/image";

async function getData(): Promise<DataItem[]> {
  const res = await fetch("https://eurovisiondrinking.com/2025/drinking.json", {
    next: { revalidate: 3 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  const testData: DataItem = {
    id: 127,
    occurred: "2024-05-11T22:14:18+00:00",
    type: "smoke-machine",
    name: "Smoke machine",
    description:
      '"We all came out to Montreux..." Smoke on the water, er, stage.',
    penalty: "one-finger",
    performance_id: 383,
    performance: {
      song: "BARA BADA BASTU",
      artist: "KAJ",
      country: "Sweden",
    },
  };
  const latest = testData; // data.length > 0 ? data[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-rally/5">
      <AutoRefresh />
      {latest && <NowPlaying latest={latest} />}

      <div className="flex-1 flex items-center justify-center -mt-40">
        {latest ? (
          <LatestEvent event={latest} />
        ) : (
          <div className="w-full flex items-center justify-center">
            <div className="hidden md:block">
              <Image
                src="/anna.png"
                alt="Anna"
                width={300}
                height={300}
                className="transform -scale-x-100"
              />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl text-center mx-8">
              <h2 className="text-5xl font-bold text-rally animate-pulse">
                Snart drar supen igång...
              </h2>
            </div>
            <div className="hidden md:block">
              <Image src="/anna.png" alt="Anna" width={300} height={300} />
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-8 text-center">
        <h1 className="text-8xl font-black tracking-[0.15em] text-white select-none opacity-50">
          RALLYVISION 2025
        </h1>
      </div>
    </div>
  );
}
