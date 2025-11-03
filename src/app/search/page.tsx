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

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({ duration: 0, budget: 0, age: 12, languages: [] });
    setAppliedFilters({ duration: 0, budget: 0, age: 12, languages: [] });
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  return (
    <div className="flex gap-6 h-screen">
      {/* Left Filter Panel */}
      <div className="w-80 flex-shrink-0 border-r border-gray-200 h-full">
        <FilterControls
          searchTerm={searchTerm}
          filters={filters}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilters}
          onClear={handleClearFilters}
          onApply={handleApplyFilters} // Apply button
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 overflow-y-auto h-full">
        <RightContent searchTerm={searchTerm} filters={appliedFilters} />
      </div>
    </div>
  );
}
