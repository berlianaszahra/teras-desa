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
      label: "Total Laporan Warga",
      value: String(data.reports.total), 
      sub: `${data.reports.unprocessed} belum diproses`,
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Total Proyek Aktif",
      value: String(data.projects.total), 
      sub: `${data.projects.active} diproses | ${data.projects.finished} selesai`,
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-8h1m-1 4h1m-1 4h1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Total Anggaran",
      value: formatRupiah(data.total_budget, true).replace('Rp ', 'Rp. '), 
      sub: null,
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ] : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {(loading ? Array(3).fill(null) : stats).map((s, i) => (
        <div
          key={i}
          className="bg-[#FDF5E3] border border-[#3F5210] rounded-[20px] p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Top Section */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#E6E5D9] rounded-xl flex items-center justify-center text-[#3F5210]">
              {s?.icon || <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />}
            </div>
            <span className="text-lg font-bold text-[#3F5210] font-poppins leading-tight">
              {s?.label || "..."}
            </span>
          </div>

          <hr className="border-[#3F5210]/20" />

          {/* Bottom Section */}
          <div className="flex items-baseline gap-3">
            <span className="text-[48px] font-bold text-[#3F5210] font-poppins leading-none">
              {s?.value || "..."}
            </span>
            {s?.sub && (
              <span className="text-sm font-semibold text-[#3F5210]/70 font-poppins">
                {s.sub}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}