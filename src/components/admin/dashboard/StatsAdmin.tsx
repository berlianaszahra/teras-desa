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
      value: String(data.reports.total), 
      label: "Laporan", 
      sub: `${data.reports.unprocessed} belum diproses` 
    },
    { 
      value: String(data.projects.total), 
      label: "Proyek", 
      sub: `${data.projects.active} diproses | ${data.projects.finished} selesai` 
    },
    { 
      value: formatRupiah(data.total_budget, true).replace('Rp ', ''), 
      label: "Total Anggaran", 
      prefix: "Rp", 
      sub: null 
    },
  ] : [
    { value: "...", label: "Laporan", sub: "..." },
    { value: "...", label: "Proyek", sub: "..." },
    { value: "...", label: "Total Anggaran", prefix: "Rp", sub: null },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="w-full md:w-[318px] h-[180px] md:h-[200px] bg-[#ECEEE7] border-2 border-[#3F5210] rounded-[15px] p-4 flex flex-col justify-between"
        >
          <div>
            <p className="text-xl md:text-sm text-[#3F5210]">{s.label}</p>
            <div className="flex items-end gap-1">
              {s.prefix && <span className="text-xl font-bold text-[#3F5210]">{s.prefix}</span>}
              <span className="text-xl md:text-[48px] font-bold text-[#3F5210] leading-none">
                {s.value}
              </span>
            </div>
          </div>

          {s.sub && (
            <p className="text-xs md:text-sm text-[#3F5210]">{s.sub}</p>
          )}
        </div>
      ))}
    </div>
  );
}