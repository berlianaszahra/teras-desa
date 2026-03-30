"use client";
 
import { useState } from "react";
 
const filterTabs = ["Semua", "Diterima", "Diproses", "Selesai"];
 
const pieSegments = [
  { label: "Diproses", persen: 50, warna: "#9F490E" },
  { label: "Diterima", persen: 25, warna: "#E3AB55" },
  { label: "Selesai",  persen: 25, warna: "#3F5210" },
];
 
function PieChart() {
  const stops: string[] = [];
  let cum = 0;
  pieSegments.forEach((s) => {
    stops.push(`${s.warna} ${cum}% ${cum + s.persen}%`);
    cum += s.persen;
  });
  return (
    <div
      className="w-[142px] h-[142px] rounded-full flex-shrink-0"
      style={{ background: `conic-gradient(${stops.join(", ")})` }}
    />
  );
}
 
export default function FilterChartAdmin() {
  const [active, setActive] = useState("Semua");
 
  return (
    <div className="w-full bg-[#E6E5D9] rounded-[15px] px-6 py-5 flex flex-row items-center gap-6">
      {/* Pie chart */}
      <div className="relative flex-shrink-0">
        <PieChart />
        {/* Labels percent di dalam pie — simplified overlay */}
      </div>
 
      {/* Legend */}
      <div className="flex flex-row items-start gap-4">
        {pieSegments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: s.warna }} />
            <span className="text-base font-normal text-[#190B02]">{s.label}</span>
          </div>
        ))}
      </div>
 
      {/* Divider */}
      <div className="w-px h-16 bg-[#252525] mx-2" />
 
      {/* Filter title + tabs */}
      <div className="flex flex-col gap-3">
        <span className="text-2xl font-semibold text-[#190B02]">Filter Laporan</span>
        <div className="flex flex-row">
          {filterTabs.map((tab, i) => {
            const isFirst = i === 0;
            const isLast = i === filterTabs.length - 1;
            const isActive = active === tab;
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-[26px] py-[9px] text-[15px] font-normal transition-colors ${
                  isFirst ? "rounded-l-[15px]" : isLast ? "rounded-r-[15px]" : ""
                } ${
                  isActive
                    ? "bg-[#3F5210] text-[#E2E5DB]"
                    : "bg-[#C3C9B5] text-[#190B02]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
