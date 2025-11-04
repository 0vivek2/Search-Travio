"use client";
import React, { useState } from "react";
import FilterControls from "../../app/components/FilterPanel";
import RightContent from "../../app/components/RightContent";

// Default filters (for full sliders initially)
const DEFAULT_FILTERS = {
  duration: 50,
  budget: 50,
  age: 50,
  languages: [] as string[],
  dropdowns: {} as Record<string, string>,
};

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);

  // ✅ Clear all filters — reset sliders to full and dropdowns/languages
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  };

  // ✅ Apply filters
  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  return (
    <div className="flex gap-6 h-screen overflow-hidden">
      {/* ✅ Left Filter Panel (scrolls independently, hidden scrollbar) */}
      <div className="w-80 flex-shrink-0 border-r border-gray-200 h-full overflow-y-auto filter-scroll">
        <FilterControls
          searchTerm={searchTerm}
          filters={filters}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilters}
          onClear={handleClearFilters}
          onApply={handleApplyFilters}
        />
      </div>

      {/* ✅ Right Content (scrolls separately) */}
      <div className="flex-1 overflow-y-auto h-full">
        <RightContent searchTerm={searchTerm} filters={appliedFilters} />
      </div>

      {/* ✅ Hide scrollbar CSS */}
      <style jsx>{`
        /* Hides scrollbar in filter panel but keeps scroll functional */
        .filter-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and old Edge */
        }

        .filter-scroll::-webkit-scrollbar {
          width: 0;
          height: 0;
          background: transparent; /* Chrome, Safari, Edge */
        }
      `}</style>
    </div>
  );
}
