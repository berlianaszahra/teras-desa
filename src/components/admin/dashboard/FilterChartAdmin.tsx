"use client";

import { useState } from "react";

const filterTabs = ["Semua", "Diterima", "Diproses", "Selesai"];

const pieSegments = [
  { label: "Diproses", persen: 50, warna: "#9F490E" },
  { label: "Diterima", persen: 25, warna: "#E3AB55" },
  { label: "Selesai", persen: 25, warna: "#3F5210" },
];

function PieChart() {
  const stops = pieSegments.reduce((acc, s, i) => {
    const start = pieSegments.slice(0, i).reduce((sum, seg) => sum + seg.persen, 0);
    const cum = start + s.persen;
    acc.push(`${s.warna} ${start}% ${cum}%`);
    return acc;
  }, [] as string[]);

  return (
    <div
      className="w-[120px] md:w-[142px] h-[120px] md:h-[142px] rounded-full"
      style={{ background: `conic-gradient(${stops.join(", ")})` }}
    />
  );
}

export default function FilterChartAdmin() {
  const [active, setActive] = useState("Semua");

  return (
    <div className="w-full bg-[#E6E5D9] rounded-[15px] px-4 md:px-6 py-5 flex flex-col md:flex-row gap-6">
      
      {/* Pie */}
      <PieChart />

      {/* Legend */}
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        {pieSegments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ background: s.warna }} />
            <span className="text-sm md:text-base">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-16 bg-black" />

      {/* Filter */}
      <div className="flex flex-col gap-3">
        <span className="text-lg md:text-2xl font-semibold">
          Filter Laporan
        </span>

        <div className="flex overflow-x-auto">
          {filterTabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 md:px-6 py-2 text-sm md:text-base whitespace-nowrap ${
                active === tab
                  ? "bg-[#3F5210] text-white"
                  : "bg-[#C3C9B5]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}