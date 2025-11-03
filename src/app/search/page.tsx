"use client";
import React, { useState } from "react";
import FilterControls from "../../app/components/FilterPanel";
import RightContent from "../../app/components/RightContent";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    duration: 0,
    budget: 0,
    age: 12,
    languages: [] as string[],
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({ duration: 0, budget: 0, age: 12, languages: [] });
  };

  return (
    <div className="flex h-screen">
      {/* Left filter panel: fixed width, full height, no scroll */}
      <div className="w-80 h-full flex-shrink-0">
        <FilterControls
          onSearchChange={setSearchTerm}
          onFilterChange={setFilters}
          onClear={handleClearFilters}
        />
      </div>

      {/* Right content: scrollable vertically */}
      <div className="flex-1 h-full overflow-y-auto">
        <RightContent searchTerm={searchTerm} filters={filters} />
      </div>
    </div>
  );
}
