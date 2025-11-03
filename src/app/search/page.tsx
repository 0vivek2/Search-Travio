"use client";
import React, { useState } from "react";
import FilterControls from "../components/FilterPanel";
import RightContent from "../components/RightContent";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <aside className="w-72 bg-white flex flex-col p-4">
        <FilterControls onSearchChange={setSearchTerm} />
      </aside>

      {/* Right Main Content */}
      <section className="flex-1 overflow-y-auto p-6">
        <RightContent searchTerm={searchTerm} />
      </section>
    </main>
  );
}
