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

  if (stops.length === 0) {
    return (
      <div className="w-[90px] md:w-[110px] h-[90px] md:h-[110px] rounded-full bg-[#C3C9B5]" />
    );
  }

  return (
    <div
      className="w-[90px] md:w-[110px] h-[90px] md:h-[110px] rounded-full border-2 border-white/20 shadow-inner"
      style={{ background: `conic-gradient(${stops.join(', ')})` }}
    />
  );
}

export default function FilterChartAdmin({ 
  activeStatus = "Semua", 
  onFilterChange = () => {} 
}: { 
  activeStatus?: string; 
  onFilterChange?: (status: string) => void; 
}) {
  const [segments, setSegments] = useState<ReportPieBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportsPie()
      .then((res) => setSegments(res.data.breakdown))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full bg-[#E6E5D9] rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 md:gap-10 border border-[#3F5210]/10 shadow-sm">
      
      {/* Chart Section */}
      <div className="flex flex-col items-center gap-3 flex-shrink-0">
        {loading ? (
          <div className="w-[110px] h-[110px] rounded-full bg-[#C3C9B5] animate-pulse" />
        ) : (
          <PieChart segments={segments} />
        )}
      </div>

      {/* Filter & Legend Section */}
      <div className="flex-1 flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-[#3F5210] rounded-full" />
            <h3 className="text-lg md:text-xl font-bold text-[#190B02] font-poppins leading-tight">
              Filter Laporan
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-4 ml-3">
            {segments.map((s) => (
              <div key={s.status} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ background: STATUS_COLORS[s.status] ?? '#999' }} 
                />
                <span className="text-xs font-bold text-[#190B02] font-poppins uppercase tracking-wider">
                  {REPORT_STATUS_LABEL[s.status] ?? s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex w-full md:w-fit rounded-lg overflow-hidden border border-[#3F5210]/20 shadow-sm bg-[#C3C9B5]">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onFilterChange(tab)}
              className={`
                flex-1 md:flex-none px-4 md:px-7 py-2 
                text-xs md:text-sm font-bold font-poppins 
                transition-all duration-300
                ${
                  activeStatus === tab
                    ? "bg-[#3F5210] text-[#FDF5E3]"
                    : "text-[#FDF5E3] hover:bg-[#B3B9A5]"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}