"use client";
import { Layers } from "lucide-react";
import React, { useEffect } from "react";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      onFinish();
    }, 1000);
    return () => clearTimeout(time);
  }, [onFinish]);
  return (
    <div className="flex justify-center items-center">
      <div className="text-center w-5xl">
        <h1 className="flex flex-col items-center text-center text-[10rem] mt-[10rem] font-light m-4 leading-[0.95] tracking-tight">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center animate-bounce">
            <Layers className="w-10 h-10 text-white" />
          </div>
          <span className="text-black  hidden sm:block animate-pulse">
            Innovate Solutions
          </span>
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
