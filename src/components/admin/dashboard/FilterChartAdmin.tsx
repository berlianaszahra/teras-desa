'use client';

import { useEffect, useState } from 'react';
import { getReportsPie, REPORT_STATUS_LABEL } from '@/lib/api';
import type { ReportPieBreakdown } from '@/types';

const filterTabs = ["Semua", "Diterima", "Diproses", "Selesai"];

const STATUS_COLORS: Record<string, string> = {
  diproses: '#9F490E',
  diterima: '#E3AB55',
  selesai:  '#3F5210',
};

function PieChart({ segments }: { segments: ReportPieBreakdown[] }) {
  const stops: string[] = [];
  let cumulative = 0;

  segments.forEach((s) => {
    const color = STATUS_COLORS[s.status] ?? '#999';
    stops.push(`${color} ${cumulative}% ${cumulative + s.percentage}%`);
    cumulative += s.percentage;
  });

  // Jika tidak ada data, tampilkan placeholder kosong
  if (stops.length === 0) {
    return (
      <div className="w-[120px] md:w-[142px] h-[120px] md:h-[142px] rounded-full bg-[#C3C9B5]" />
    );
  }

  return (
    <div
      className="w-[120px] md:w-[142px] h-[120px] md:h-[142px] rounded-full"
      style={{ background: `conic-gradient(${stops.join(', ')})` }}
    />
  );
}

export default function FilterChartAdmin() {
  const [active, setActive] = useState("Semua");
  const [segments, setSegments] = useState<ReportPieBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportsPie()
      .then((res) => setSegments(res.data.breakdown))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full bg-[#E6E5D9] rounded-[15px] px-4 md:px-6 py-5 flex flex-col md:flex-row gap-6">
      
      {loading ? (
        <div className="w-[120px] md:w-[142px] h-[120px] md:h-[142px] rounded-full bg-[#C3C9B5] animate-pulse" />
      ) : (
        <PieChart segments={segments} />
      )}

      <div className="flex flex-wrap md:flex-nowrap gap-4">
        {segments.map((s) => (
          <div key={s.status} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ background: STATUS_COLORS[s.status] ?? '#999' }} />
            <span className="text-sm md:text-base">
              {REPORT_STATUS_LABEL[s.status] ?? s.status} ({s.count})
            </span>
          </div>
        ))}
      </div>

      <div className="hidden md:block w-px h-16 bg-black" />
      <div className="flex flex-col gap-3">
        <span className="text-lg md:text-2xl font-semibold">
          Filter Laporan
        </span>

        <div className="flex overflow-x-auto">
          {filterTabs.map((tab) => (
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