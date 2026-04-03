'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats, formatRupiah } from '@/lib/api';
import type { DashboardStats } from '@/types';

export default function StatsAdmin() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = data ? [
    { 
      label: "Total Laporan\nWarga",
      value: String(data.reports.total), 
      sub: `${data.reports.unprocessed} belum diproses`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Total\nProyek Aktif",
      value: String(data.projects.total), 
      sub: `${data.projects.active} diproses | ${data.projects.finished} selesai`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-8h1m-1 4h1m-1 4h1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Total\nAnggaran",
      value: formatRupiah(data.total_budget, true).replace('Rp ', 'Rp. '), 
      sub: null,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ] : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {(loading ? Array(3).fill(null) : stats).map((s, i) => (
        <div
          key={i}
          className="bg-[#FDF5E3] border border-[#3F5210] rounded-xl p-4 flex flex-col gap-2.5 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Top Section */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E6E5D9] rounded-lg flex items-center justify-center text-[#3F5210] flex-shrink-0">
              {s?.icon || <div className="w-5 h-5 bg-gray-200 animate-pulse rounded" />}
            </div>
            <span className="text-sm font-bold text-[#3F5210] font-poppins leading-tight whitespace-pre-line">
              {s?.label || "..."}
            </span>
          </div>

          <hr className="border-[#3F5210]/20" />

          {/* Bottom Section */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-[#3F5210] font-poppins leading-none">
              {s?.value || "..."}
            </span>
            {s?.sub && (
              <span className="text-xs font-semibold text-[#3F5210]/70 font-poppins">
                {s.sub}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}