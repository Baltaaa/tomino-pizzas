"use client";

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TominoLogo = ({ className = '', size = 'md' }: LogoProps) => {
  const scale = size === 'sm' ? 'scale-75 origin-top' : size === 'lg' ? 'scale-125 origin-top' : 'scale-100';

  return (
    <div className={`relative flex flex-col items-center select-none z-40 ${scale} ${className}`}>
      {/* Hanging Badge Strap */}
      <div className="w-[100px] h-20 bg-[#FDFBF7] shadow-md rounded-b-2xl flex flex-col items-center pt-2 relative">
        <div className="w-[84px] h-[84px] bg-black rounded-full border-2 border-white flex flex-col items-center justify-center p-1.5 shadow-lg transform -rotate-6 mt-4">
          <span className="text-[7px] text-white/80 font-bold tracking-widest uppercase">DESDE 1960</span>
          
          <h1 className="text-[20px] font-black tracking-tight leading-none text-white italic transform skew-x-3 -skew-y-2 select-none my-0.5" style={{ textShadow: '2px 2px 0px #E52321' }}>
            TOMINO
          </h1>
          
          <div className="w-12 h-[2px] bg-[#E52321] my-0.5"></div>
          <span className="text-[5.5px] text-[#FDFBF7] font-semibold tracking-wider uppercase bg-[#E52321] px-1 rounded-sm">
            PIZZAS EN SERIO
          </span>
        </div>
      </div>
    </div>
  );
};