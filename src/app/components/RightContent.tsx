"use client";
import React, { useRef } from "react";
import TripCard from "./TripCard";
import AgencyCard from "./AgencyCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface RightContentProps {
  searchTerm: string;
}

export default function RightContent({ searchTerm }: RightContentProps) {
  const mockTrips = [
    {
      id: 1,
      name: "Sophia",
      age: 27,
      location: "Paris",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      matchPercent: 92,
      rating: 4.8,
      from: "Paris",
      to: "Santorini",
      dateRange: "Dec 10 - Dec 22",
      budget: "₹15K - ₹50K",
      interests: ["Beach", "Romance", "Photography"],
    },
    {
      id: 2,
      name: "Ava",
      age: 30,
      location: "Bali",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      matchPercent: 89,
      rating: 4.6,
      from: "Bali",
      to: "Maldives",
      dateRange: "Jan 3 - Jan 14",
      budget: "₹25K - ₹45K",
      interests: ["Nature", "Adventure", "Culture"],
    },
    {
      id: 3,
      name: "Lily",
      age: 26,
      location: "Goa",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      matchPercent: 90,
      rating: 4.7,
      from: "Goa",
      to: "Thailand",
      dateRange: "Feb 1 - Feb 10",
      budget: "₹20K - ₹40K",
      interests: ["Beach", "Adventure", "Music"],
    },
        {
      id: 4,
      name: "Lily",
      age: 26,
      location: "Goa",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      matchPercent: 90,
      rating: 4.7,
      from: "Goa",
      to: "Thailand",
      dateRange: "Feb 1 - Feb 10",
      budget: "₹20K - ₹40K",
      interests: ["Beach", "Adventure", "Music"],
    },

  ];

  const featuredAgency = {
    name: "WanderWorld Travels",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    rating: 4.8,
    tag: "Moderate",
    about:
      "We curate unforgettable journeys tailored for explorers who value authenticity and comfort.",
    trips: 120,
    travelers: 4800,
    years: 8,
    badges: ["Adventure Travel", "Cultural Tours", "Sustainable Tours"],
  };

  // ✅ Correctly typed refs
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const ref3 = useRef<HTMLDivElement | null>(null);

  // ✅ Scroll handler
  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref.current) return;
    const amount = direction === "left" ? -300 : 300;
    ref.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  // ✅ Reusable Carousel component
  const Carousel = ({
    title,
    refObj,
    children,
  }: {
    title: string;
    refObj: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
  }) => (
    <section className="relative">
      <h3 className="text-lg font-semibold text-gray-700 mb-3 ml-8">{title}</h3>

      <div className="relative">
        <button
          onClick={() => handleScroll(refObj, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-[#F76C6C]/10 transition"
        >
          <FaChevronLeft className="text-black w-4 h-4" />
        </button>

        {/* ✅ Hide scrollbar */}
        <div
          ref={refObj}
          className="flex gap-4 overflow-x-auto scroll-smooth px-8"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {children}
        </div>

        <button
          onClick={() => handleScroll(refObj, "right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-[#F76C6C]/10 transition"
        >
          <FaChevronRight className="text-black w-4 h-4" />
        </button>
      </div>
    </section>
  );

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-l text-gray-800 ml-8">
           Results for:{" "}
          <span className="text-black font-bold">{searchTerm}</span>
        </h2>
        <p className="text-[13px] text-black-100 ml-8">Discover travel companions for your next adventure</p>
      </div>

      <Carousel title="Best Match" refObj={ref1}>
        {mockTrips.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </Carousel>

      <Carousel title="Featured Trip Leaders" refObj={ref2}>
        {mockTrips.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </Carousel>

      <Carousel title="AI Powered Recommendations" refObj={ref3}>
        {mockTrips.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </Carousel>

      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 ml-8">
          Featured Travel Agency
        </h3>
        <AgencyCard {...featuredAgency} />
      </section>
    </div>
  );
}
