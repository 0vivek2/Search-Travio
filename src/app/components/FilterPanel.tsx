"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

interface FilterPanelProps {
  searchTerm: string;
  filters: { duration: number; budget: number; age: number; languages: string[] };
  onSearchChange: (term: string) => void;
  onFilterChange: (filters: { duration: number; budget: number; age: number; languages: string[] }) => void;
  onClear: () => void;
  onApply?: () => void; // Added optional prop for Apply button
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

  const addLanguage = () => {
    if (langInput.trim() && !filters.languages.includes(langInput)) {
      onFilterChange({ ...filters, languages: [...filters.languages, langInput] });
      setLangInput("");
    }
  };

  const removeLanguage = (lang: string) => {
    onFilterChange({ ...filters, languages: filters.languages.filter((l) => l !== lang) });
  };

  const dropdownFilters = [
    { label: "Travel Style", options: ["Luxury", "Adventure", "Budget", "Group"] },
    { label: "Interest", options: ["Beach", "Nature", "Culture", "Photography"] },
    { label: "Gender Preference", options: ["Male", "Female", "Any"] },
    { label: "Minimum Rating", options: ["1+", "2+", "3+", "4+", "5"] },
    { label: "Food Preference", options: ["Veg", "Non-Veg", "Vegan", "Any"] },
    { label: "Trip Type", options: ["Solo", "Couple", "Family", "Friends"] },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Scrollable Inputs / Filters */}
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

        {/* Filter Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-black">
            <span className="text-sm font-medium">Filter</span>
          </div>
          <button
            onClick={onClear}
            className="text-[#F76C6C] text-sm font-medium hover:underline"
          >
            Clear All
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 flex-wrap">
          {["Local", "Nearby", "Starting Point"].map((label) => (
            <button
              key={label}
              className="border border-[#F76C6C] text-[#F76C6C] px-3 py-1.5 rounded-sm text-xs hover:bg-[#F76C6C]/10 transition flex items-center gap-1"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Dropdown Filters */}
        <div className="space-y-4">
          {dropdownFilters.map((filter) => (
            <div key={filter.label} className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-800">{filter.label}</label>
              <select
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

        {/* Sliders */}
        <div className="space-y-6 mt-4">
          {[
            { label: "Duration (0–50+ days)", min: 0, max: 50, key: "duration" },
            { label: "Budget (0–50K)", min: 0, max: 50, key: "budget" },
            { label: "Age Range (12–50+)", min: 12, max: 50, key: "age" },
          ].map((slider) => (
            <div key={slider.key} className="space-y-2">
              <label className="text-sm font-medium text-gray-800">{slider.label}</label>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                value={(filters as any)[slider.key]}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    [slider.key]: Number(e.target.value),
                  })
                }
                className="w-full accent-[#F76C6C]"
              />
              <div className="text-sm text-gray-600 font-medium">
                {(filters as any)[slider.key]}
              </div>
              <hr className="border-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button fixed at bottom */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-white">
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
