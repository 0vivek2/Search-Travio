"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

interface FilterControlsProps {
  onSearchChange?: (term: string) => void;
}

export default function FilterControls({ onSearchChange }: FilterControlsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [langInput, setLangInput] = useState("");

  // Slider states
  const [duration, setDuration] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);
  const [age, setAge] = useState<number>(12);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const addLanguage = () => {
    if (langInput.trim() && !languages.includes(langInput)) {
      setLanguages([...languages, langInput]);
      setLangInput("");
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
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
    <div className="flex flex-col h-full p-4 space-y-6 bg-white relative">
      {/* Back Button */}
      <button className="flex items-center text-gray-700 hover:text-[#F76C6C] font-medium transition w-fit">
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Search Box */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-sm pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F76C6C]"
        />
      </div>

      {/* Filter Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18m-5-12v2m-8 4v2m8 4v2" />
          </svg>
          <span className="text-sm font-medium">Filter</span>
        </div>
        <button
          onClick={() => {
            // clear filters (reset sliders + languages + search)
            setSearchTerm("");
            setLanguages([]);
            setLangInput("");
            setDuration(0);
            setBudget(0);
            setAge(12);
          }}
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

      {/* Scrollable Filters Section (hidden scrollbars) */}
      <div
        className="flex-1 overflow-x-auto overflow-y-auto pr-2 space-y-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          /* hide scrollbars for the container only */
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Dropdown Filters */}
        {dropdownFilters.map((filter) => (
          <div key={filter.label} className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-800">{filter.label}</label>
            <select className="border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F76C6C]">
              <option value="">Select {filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

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
            {languages.map((lang) => (
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
            { label: "Duration (0–50+ days)", min: 0, max: 50, suffix: "days", key: "duration" },
            { label: "Budget (0–50K)", min: 0, max: 50, suffix: "K", key: "budget" },
            { label: "Age Range (12–50+)", min: 12, max: 50, suffix: "yrs", key: "age" },
          ].map((slider) => {
            // compute current value strictly as number (avoids boolean/undefined)
            const currentValue =
              slider.key === "duration" ? duration : slider.key === "budget" ? budget : age;

            return (
              <div key={slider.key} className="space-y-2">
                <label className="text-sm font-medium text-gray-800">{slider.label}</label>

                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  value={currentValue}
                  onChange={(e) => {
                    const v = Number(e.target.value || 0);
                    if (slider.key === "duration") setDuration(v);
                    if (slider.key === "budget") setBudget(v);
                    if (slider.key === "age") setAge(v);
                  }}
                  className="w-full accent-[#F76C6C]"
                  style={{ accentColor: "#F76C6C" }}
                />

                {/* Dynamic value below slider */}
                <div className="text-sm text-gray-600 font-medium">
                  {slider.key === "duration" && `${duration} ${slider.suffix}`}
                  {slider.key === "budget" && `${budget}${slider.suffix}`}
                  {slider.key === "age" && `${age} ${slider.suffix}`}
                </div>

                {/* Horizontal line separator */}
                <hr className="border-gray-200" />
              </div>
            );
          })}
        </div>

        {/* Spacer so fixed bottom bar doesn't overlap content */}
        <div style={{ height: 80 }} />

      </div>

      {/* Fixed Apply Button at bottom */}
      <div className="absolute left-0 right-0 bottom-0 p-4 bg-white border-t border-gray-200">
        <button className="w-full bg-[#F76C6C] text-white py-2 rounded-sm font-semibold hover:bg-[#e45d5d] transition">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
