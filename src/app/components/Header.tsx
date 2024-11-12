"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Page {
  destination: string;
  text: string;
}

const Header = ({destination, text}: Page) => {
  const router = useRouter();

  return (
    <div className="fixed bg-black top-0 h-20 w-screen flex items-center justify-end px-[5%]">
      <div
        onClick={() => router.push(destination)}
        className="flex items-center justify-center bg-green-600 rounded-2xl h-10 w-auto hover:bg-green-500 cursor-pointer hover:scale-105 transition duration-300"
      >
        <p className="text-white font-semibold px-4">{text}</p>
      </div>
    </div>
  );
};

export default Header;
