import HomePage from "@/components/sections/Homepage/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "preload-hero": "true",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <main className="w-full">
        <HomePage />
      </main>
    </div>
  );
}
