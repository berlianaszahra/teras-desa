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
      <div className="w-[120px] md:w-[142px] h-[120px] md:h-[142px] rounded-full bg-[#C3C9B5]" />
    );
  }

  return (
    <div
      className="w-[120px] md:w-[142px] h-[120px] md:h-[142px] rounded-full border-4 border-white/20 shadow-inner"
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
    <div className="w-full bg-[#E6E5D9] rounded-[25px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-10 md:gap-16 border border-[#3F5210]/10 shadow-sm">
      
      {/* Chart Section */}
      <div className="flex flex-col items-center gap-4">
        {loading ? (
          <div className="w-[142px] h-[142px] rounded-full bg-[#C3C9B5] animate-pulse" />
        ) : (
          <PieChart segments={segments} />
        )}
      </div>

      {/* Filter & Legend Section */}
      <div className="flex-1 flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-10 bg-[#3F5210] rounded-full" />
            <h3 className="text-2xl md:text-[36px] font-bold text-[#190B02] font-poppins leading-tight">
              Filter Laporan
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-8">
            {segments.map((s) => (
              <div key={s.status} className="flex items-center gap-3">
                <div 
                  className="w-5 h-5 rounded-full" 
                  style={{ background: STATUS_COLORS[s.status] ?? '#999' }} 
                />
                <span className="text-xl font-bold text-[#190B02] font-poppins uppercase tracking-wider">
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
                flex-1 md:flex-none px-6 md:px-12 py-3.5 
                text-lg md:text-[22px] font-bold font-poppins 
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