"use client";
import React, { useRef } from "react";
import TripCard from "./TripCard";
import AgencyCard from "./AgencyCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Trip {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  matchPercent: number;
  rating: number;
  from: string;
  to: string;
  dateRange: string;
  budget: number; // use number for filtering
  duration: number; // number of days
  interests: string[];
  languages: string[];
}

interface RightContentProps {
  searchTerm: string;
  filters: {
    duration: number;
    budget: number;
    age: number;
    languages: string[];
  };
}

export default function RightContent({ searchTerm, filters }: RightContentProps) {
  const mockTrips: Trip[] = [
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
      budget: 40,
      duration: 12,
      interests: ["Beach", "Romance", "Photography"],
      languages: ["English", "French"],
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
      budget: 35,
      duration: 11,
      interests: ["Nature", "Adventure", "Culture"],
      languages: ["English", "Indonesian"],
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
      budget: 30,
      duration: 10,
      interests: ["Beach", "Adventure", "Music"],
      languages: ["English", "Hindi"],
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

  // ✅ Refs for carousel
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const ref3 = useRef<HTMLDivElement | null>(null);

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref.current) return;
    const amount = direction === "left" ? -300 : 300;
    ref.current.scrollBy({ left: amount, behavior: "smooth" });
  };

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

        <div
          ref={refObj}
          className="flex gap-4 overflow-x-auto scroll-smooth px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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

  // ✅ Apply filters to trips
  const filteredTrips = mockTrips.filter((trip) => {
    const matchesSearch =
      searchTerm === "" || trip.from.toLowerCase().includes(searchTerm.toLowerCase()) || trip.to.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBudget = trip.budget <= filters.budget || filters.budget === 0;
    const matchesDuration = trip.duration <= filters.duration || filters.duration === 0;
    const matchesAge = trip.age <= filters.age || filters.age === 0;
    const matchesLanguages =
      filters.languages.length === 0 ||
      filters.languages.every((lang) => trip.languages.includes(lang));

    return matchesSearch && matchesBudget && matchesDuration && matchesAge && matchesLanguages;
  });

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-l text-gray-800 ml-8">
          Results for: <span className="text-black font-bold">{searchTerm}</span>
        </h2>
        <p className="text-[13px] text-black-100 ml-8">
          Discover travel companions for your next adventure
        </p>
      </div>

      <Carousel title="Best Match" refObj={ref1}>
  {filteredTrips.map((trip) => (
    <TripCard
      key={trip.id}
      {...trip}
      budget={`₹${trip.budget}K`} // convert number to string
    />
  ))}
</Carousel>

<Carousel title="Featured Trip Leaders" refObj={ref2}>
  {filteredTrips.map((trip) => (
    <TripCard
      key={trip.id}
      {...trip}
      budget={`₹${trip.budget}K`} // convert number to string
    />
  ))}
</Carousel>

<Carousel title="AI Powered Recommendations" refObj={ref3}>
  {filteredTrips.map((trip) => (
    <TripCard
      key={trip.id}
      {...trip}
      budget={`₹${trip.budget}K`} // convert number to string
    />
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
