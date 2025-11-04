"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

interface FilterPanelProps {
  searchTerm: string;
  filters: {
    duration: number;
    budget: number;
    age: number;
    languages: string[];
    dropdowns: Record<string, string>; // ✅ not optional anymore
  };
  onSearchChange: (term: string) => void;
  onFilterChange: (filters: {
    duration: number;
    budget: number;
    age: number;
    languages: string[];
    dropdowns: Record<string, string>; // ✅ not optional anymore
  }) => void;
  onClear: () => void;
  onApply?: () => void;
}


export default function FilterControls({
  searchTerm,
  filters,
  onSearchChange,
  onFilterChange,
  onClear,
  onApply,
}: FilterPanelProps) {
  const [langInput, setLangInput] = useState("");

  const dropdownFilters = [
    { label: "Travel Style", options: ["Luxury", "Adventure", "Budget", "Group"] },
    { label: "Interest", options: ["Beach", "Nature", "Culture", "Photography"] },
    { label: "Gender Preference", options: ["Male", "Female", "Any"] },
    { label: "Minimum Rating", options: ["1+", "2+", "3+", "4+", "5"] },
    { label: "Food Preference", options: ["Veg", "Non-Veg", "Vegan", "Any"] },
    { label: "Trip Type", options: ["Solo", "Couple", "Family", "Friends"] },
  ];

  // Reset visual inputs when filters change
  useEffect(() => {
    setLangInput("");
  }, [filters]);

  const handleDropdownChange = (label: string, value: string) => {
    const updatedDropdowns = { ...(filters.dropdowns || {}), [label]: value };
    onFilterChange({ ...filters, dropdowns: updatedDropdowns });
  };

  const addLanguage = () => {
    if (langInput.trim() && !filters.languages.includes(langInput)) {
      onFilterChange({
        ...filters,
        languages: [...filters.languages, langInput],
      });
      setLangInput("");
    }
  };

  const removeLanguage = (lang: string) => {
    onFilterChange({
      ...filters,
      languages: filters.languages.filter((l) => l !== lang),
    });
  };

  return (
    <div className="flex-1 p-4 space-y-6"> 
      {/* Scrollable Inputs */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Back Button */}
        <button className="flex items-center text-gray-700 hover:text-[#F76C6C] font-medium transition w-fit mb-2">
          <FaArrowLeft className="mr-2" /> Back
        </button>

        {/* Search Box */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-gray-300 rounded-sm pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F76C6C]"
          />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-black">Filter</span>
          <button
            onClick={onClear}
            className="text-[#F76C6C] text-sm font-medium hover:underline"
          >
            Clear All
          </button>
        </div>

        {/* Dropdown Filters */}
        <div className="space-y-4">
          {dropdownFilters.map((filter) => (
            <div key={filter.label} className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-800">{filter.label}</label>
              <select
                value={filters.dropdowns?.[filter.label] || ""}
                onChange={(e) => handleDropdownChange(filter.label, e.target.value)}
                className="border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F76C6C]"
              >
                <option value="">Select {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Language Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-800">Language</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={langInput}
              onChange={(e) => setLangInput(e.target.value)}
              placeholder="Add language"
              className="border border-gray-300 rounded-sm p-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#F76C6C]"
            />
            <button
              onClick={addLanguage}
              className="bg-[#F76C6C] text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-[#e45d5d] transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.languages.map((lang) => (
              <span
                key={lang}
                className="bg-[#F76C6C]/10 text-[#F76C6C] text-xs px-3 py-1 rounded-sm flex items-center gap-1 border border-[#F76C6C]/20"
              >
                {lang}
                <button
                  onClick={() => removeLanguage(lang)}
                  className="text-[#F76C6C] hover:text-[#e45d5d] font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

{/* Sliders (perfect fill alignment) */}
<div className="space-y-6 mt-4">
  {[
    { label: "Duration (0–50+ days)", min: 0, max: 50, key: "duration" },
    { label: "Budget (0–50K)", min: 0, max: 50, key: "budget" },
    { label: "Age Range (12–50+)", min: 12, max: 50, key: "age" },
  ].map((slider) => {
    const value = (filters as any)[slider.key];
    const percent =
      ((value - slider.min) * 100) / (slider.max - slider.min);

    // ✅ Slight extension past 100% to make peach reach thumb
    const adjustedPercent = Math.min(percent + 1.5, 100);

    return (
      <div key={slider.key} className="space-y-2">
        <label className="text-sm font-medium text-gray-800">{slider.label}</label>

        <input
          type="range"
          min={slider.min}
          max={slider.max}
          value={value}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              [slider.key]: Number(e.target.value),
            })
          }
          className="w-full appearance-none custom-slider cursor-pointer"
          style={
            {
              "--percent": `${adjustedPercent}%`,
            } as React.CSSProperties
          }
        />

        <div className="text-sm text-gray-600 font-medium">{value}</div>
        <hr className="border-gray-200" />
      </div>
    );
  })}
</div>

<style jsx>{`
  .custom-slider {
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    width: 100%;
    border-radius: 9999px;
    outline: none;
    background: linear-gradient(
      to right,
      #f76c6c 0%,
      #f76c6c var(--percent),
      #feecec var(--percent),
      #feecec 100%
    );
    transition: background 0.1s ease;
  }

  .custom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: #f76c6c;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-top: -1px;
    box-shadow: 0 0 6px #f76c6c66;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .custom-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }

  /* Firefox */
  .custom-slider::-moz-range-track {
    background: #feecec;
    height: 8px;
    border-radius: 9999px;
  }
  .custom-slider::-moz-range-progress {
    background: #f76c6c;
    height: 8px;
    border-radius: 9999px;
  }
  .custom-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background-color: #f76c6c;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 6px #f76c6c66;
    transition: transform 0.15s ease;
  }
  .custom-slider::-moz-range-thumb:hover {
    transform: scale(1.1);
  }
`}</style>




      </div>

      {/* Apply Button */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={onApply}
          className="w-full bg-[#F76C6C] text-white py-2 rounded-sm font-semibold hover:bg-[#e45d5d] transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
