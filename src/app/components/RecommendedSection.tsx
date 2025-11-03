"use client";
import React from "react";


function TripCard({
  creatorName,
  creatorAge,
  creatorLocation,
  creatorImage,
  from,
  to,
  dateFrom,
  dateTo,
  rating,
  matchPercent,
  budget,
  image,
}: {
  creatorName: string;
  creatorAge: number;
  creatorLocation: string;
  creatorImage: string;
  from: string;
  to: string;
  dateFrom: string;
  dateTo: string;
  rating: number;
  matchPercent: number;
  budget: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={image} alt={to} className="w-full h-40 object-cover" />

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <img
            src={creatorImage}
            alt={creatorName}
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{creatorName}</h3>
            <p className="text-xs text-gray-500">
              {creatorAge} yrs · {creatorLocation}
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-700 mt-2">
          <p>
            <strong>From:</strong> {from}
          </p>
          <p>
            <strong>To:</strong> {to}
          </p>
          <p>
            <strong>Dates:</strong> {dateFrom} - {dateTo}
          </p>
          <p>
            <strong>Budget:</strong> {budget}
          </p>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>⭐ {rating}/5</span>
          <span>💯 {matchPercent}% Match</span>
        </div>
      </div>
    </div>
  );
}

// ------------------- MAIN SECTION -------------------
export default function RecommendationsSection() {
  const recommended = [
    {
      id: "1",
      creatorName: "Aarav Patel",
      creatorAge: 29,
      creatorLocation: "Mumbai, India",
      creatorImage: "/user1.jpg",
      from: "Mumbai",
      to: "Kerala Backwaters",
      dateFrom: "Dec 5",
      dateTo: "Dec 9, 2025",
      rating: 4.8,
      matchPercent: 92,
      budget: "$400 - $500",
      image: "/kerala.jpg",
    },
    {
      id: "2",
      creatorName: "Riya Sharma",
      creatorAge: 26,
      creatorLocation: "Delhi, India",
      creatorImage: "/user2.jpg",
      from: "Delhi",
      to: "Manali, Himachal Pradesh",
      dateFrom: "Jan 12",
      dateTo: "Jan 16, 2026",
      rating: 4.9,
      matchPercent: 95,
      budget: "$300 - $400",
      image: "/manali.jpg",
    },
  ];

  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
  <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/60 pointer-events-none"></div>

  <h2 className="relative inline-flex items-center gap-2 px-4 py-2 border border-blue-400 rounded-full bg-white/80 backdrop-blur-sm text-blue-700 font-semibold text-lg shadow-sm">
    <span className="text-xl">🤖</span>
    AI-Powered Recommendations
  </h2>

  <div className="mt-4 space-y-4 text-gray-700">
    {/* Your recommendation cards or content here */}
    <p className="text-sm text-gray-600">
      Smart suggestions tailored just for you.
    </p>
  </div>


      <p className="text-sm text-gray-500">
        Personalized trips curated just for you based on your interests and
        travel patterns.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommended.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </div>
    </section>
  );
}
