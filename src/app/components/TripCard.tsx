"use client";
import React from "react";
import { CheckBadgeIcon, ShieldCheckIcon } from "@heroicons/react/16/solid";
import { LuScanEye } from "react-icons/lu";
import { BsFillSuitcase2Fill } from "react-icons/bs";
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaStar,
  FaHeart,
  FaUser,
  FaGlobe,
  FaEye,
  FaExclamationTriangle,
  FaUserPlus,
  FaShieldAlt,
  FaShieldVirus,
  FaUserShield,
  FaCheck,
  FaSuitcase,
} from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";

interface TripCardProps {
  name: string;
  age: number;
  location: string;
  image: string;
  matchPercent: number;
  rating: number;
  from: string;
  to: string;
  dateRange: string;
  budget: string;
  interests: string[];
}

export default function TripCard({
  name,
  age,
  image,
  matchPercent,
  rating,
  from,
  to,
  dateRange,
  budget,
  interests,
}: TripCardProps) {
  return (
    <div className="flex-none w-[250px] bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-1 mt-2">

      {/* Image */}
      <div className="relative h-40 w-full">
        <img src={image} alt={name} className="w-full h-full object-cover blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Top overlay badges */}
        <div className="absolute top-2 left-2">
          <span className="bg-green-500 text-white text-[10px] font-semibold px-2 py-[2px] rounded-md shadow-sm">
            {matchPercent}% Match
          </span>
        </div>
        <div className="absolute top-3 right-2 flex items-center gap-1 bg-red-500 text-white text-[10px] font-semibold px-2 py-[2px] rounded-md shadow-sm">
          <FaExclamationTriangle className="text-white w-3 h-3" />
          3 spots left
        </div>

        {/* Bottom overlay with location + badges */}
<div className="absolute bottom-3 left-3 right-3 text-white text-sm">
  <h3 className="font-semibold text-[20px] leading-tight flex items-center gap-1">
  {name}, {age}
  <span className="flex items-center justify-center w-4 h-4 ">
    <CheckBadgeIcon className="text-green-500 text-[8px]" />
  </span>
</h3>

  

  <div className="flex justify-between items-center mt-1 text-[11px]">
    <div className="flex items-center gap-1 text-gray-200">
      <span>Goa,India</span>
    </div>

    <div className="flex items-center gap-2">
      {/* Rating */}
      <div className="flex items-center bg-white backdrop-blur-md px-1.5 py-[1px] rounded-md">
        <FaStar className="text-yellow-400 w-3 h-3 mr-1" />
        <span className="text-black">{rating.toFixed(1)}</span>
      </div>

      {/* Match Badge */}
      <div className="flex items-center bg-green-500/80 px-1.5 py-[1px] rounded-md">
        <ShieldCheckIcon className="w-3 h-3 mr-1" />
        <span>{matchPercent}%</span>
      </div>
    </div>
  </div>
</div>

      </div>

      {/* Content */}
      <div className="p-3 space-y-2 text-xs text-black-700">
        {/* Route */}
        <div className="flex flex-col gap-[2px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-md border-2 border-black"></span>
            <span className="font-medium">{from}</span>
          </div>
         
          <div className="ml-[3px] h-2 border-l-2 border-dotted border-black"></div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-md bg-black"></span>
            <span className="font-medium">{to}</span>
          </div>
        </div>

        {/* Date + Budget */}
        <div className="flex justify-between items-center text-[11px]">
          <div className="flex items-center gap-1 font-medium text-black-800">
            <FaCalendarAlt className="text-black text-[12px]" />
            <span>{dateRange}</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-black-800">
            <FaMoneyBillWave className="text-black text-[12px]" />
            <span>{budget}</span>
          </div>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-1.5">
          {interests.map((tag) => (
            <span
              key={tag}
              className="bg-[#EB5757]/10 text-[#EB5757] text-[10px] px-2 py-[2px] rounded-lg border border-[#F76C6C]/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-2">
          <button className="flex items-center justify-center gap-1 border border-[#EB5757] text-[#EB5757] px-2 py-1 rounded-sm text-[10px] font-medium hover:bg-[#EB5757]/10 transition w-1/2">
            <LuScanEye className="text-[18px]" /> Profile
          </button>
          <button className="flex items-center justify-center gap-1 border border-[#EB5757] text-[#EB5757] px-2 py-1 rounded-sm text-[10px] font-medium hover:bg-[#EB5757]/10 transition w-1/2">
            <BsFillSuitcase2Fill className="text-[18px]" /> Trip
          </button>
        </div>

        {/* Join Trip Button */}
        <button className="w-full bg-[#F76C6C] text-white text-[11px] font-semibold py-1.5 rounded-sm hover:bg-[#e45d5d] transition flex items-center justify-center gap-1">
          <FaUserPlus className="text-white text-[12px]" />
          Join Trip
        </button>
      </div>
    </div>
  );
}
