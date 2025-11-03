"use client";

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

export default function FeaturedSection() {
  const featuredTrips = [
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
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Featured Trips</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTrips.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </div>
    </section>
  );
}
