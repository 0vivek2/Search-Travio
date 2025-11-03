"use client";
import React from "react";
import {
  FaStar,
  FaSuitcase,
  FaUsers,
  FaCalendarAlt,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";

interface AgencyCardProps {
  name: string;
  image: string;
  rating: number;
  tag: string;
  about: string;
  trips: number;
  travelers: number;
  years: number;
  badges: string[];
}

export default function AgencyCard({
  name,
  image,
  rating,
  tag,
  about,
  trips,
  travelers,
  years,
  badges,
}: AgencyCardProps) {
  return (
    <div className="w-full max-w-[250px] bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-1 ml-8">
      {/* Image */}
      <div className="relative h-40 w-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-3 space-y-2 text-xs text-gray-700">
       {/* Name + Rating + Badge */}
<div className="flex items-start gap-2">
  {/* Small Square Image */}
  <img
    src="/profile.jpeg"
    alt={name}
    className="w-11 h-11 mt-1 rounded-none object-cover border border-gray-200"
  />

  <div className="flex flex-col gap-1">
    <h3 className="text-base font-semibold text-gray-800">{name}</h3>

    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <FaStar className="text-yellow-400 text-[12px]" />
        <span className="text-[12px] font-medium text-gray-800">
          {rating.toFixed(1)}
        </span>
      </div>

      <span className="flex items-center gap-1 bg-yellow-500 text-white text-[10px] font-medium px-2 py-[2px] rounded-md">
        <FaShieldAlt className="text-white text-[10px]" /> {tag}
      </span>
    </div>
  </div>
</div>

        {/* About */}
        <p className="text-gray-600 text-[11px] leading-snug line-clamp-3">
          {about || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 text-center text-gray-800 mt-2">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-[11px] text-[#EB5757]">{trips}+</span>
            <span className="text-[10px] text-gray-500">Trips</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-[11px] text-[#EB5757]">{travelers}+</span>
            <span className="text-[10px] text-gray-500">Travelers</span>
          </div>
          <div className="flex flex-col items-center">
            
            <span className="font-semibold text-[11px] text-[#EB5757]">{years}+</span>
            <span className="text-[10px] text-gray-500">Years</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {badges.map((badge) => (
            <span
              key={badge}
              className="bg-[#EB5757]/10 text-[#EB5757] text-[10px] px-2 py-[2px] rounded-lg border border-[#EB5757]/30"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button className="flex-1 bg-[#F76C6C] text-white text-[11px] font-semibold py-1.5 rounded-sm hover:bg-[#e45d5d] transition flex items-center justify-center gap-1">
            View Profile
          </button>
          <button className="px-3 py-1.5 text-[#F76C6C] border border-[#F76C6C] rounded-sm text-[10px] font-medium hover:bg-[#F76C6C]/10 transition flex items-center justify-center gap-1">
            2 Trips
          </button>
        </div>
      </div>
    </div>
  );
}
