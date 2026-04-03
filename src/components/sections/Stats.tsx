'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats, formatRupiah } from '@/lib/api';
import type { DashboardStats } from '@/types';

export default function Stats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const items = stats
    ? [
        {
          value: formatRupiah(stats.total_budget, true),
          label: 'Total Anggaran',
        },
        { value: stats.projects.active, label: 'Proyek Aktif' },
        { value: stats.projects.finished, label: 'Proyek Selesai' },
        { value: stats.reports.total, label: 'Laporan' },
      ]
    : [
        { value: loading ? '...' : '-', label: 'Total Anggaran' },
        { value: loading ? '...' : '-', label: 'Proyek Aktif' },
        { value: loading ? '...' : '-', label: 'Proyek Selesai' },
        { value: loading ? '...' : '-', label: 'Laporan' },
      ];

  return (
    <div className="relative z-20 flex justify-center px-4 bg-[#F5F1E9]">
      <div
        className="
          flex flex-wrap md:flex-nowrap
          justify-center
          gap-4 md:gap-12
          px-4 md:px-8 py-10 md:py-16
          bg-gradient-to-r from-[#391A05] to-[#9F490E]
          rounded-[20px] md:rounded-[30px]
          shadow-md
          -mt-20 md:-mt-32 lg:-mt-40
        "
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="
              flex flex-col items-center justify-center
              w-[140px] h-[120px]
              md:w-[180px] md:h-[150px]
              lg:w-[213px] lg:h-[165px]
              bg-[#391A05]
              border border-[#E46612]
              rounded-[20px] md:rounded-[30px]
              shadow-md p-2
            "
          >
            <h2 className="text-3xl md:text-5xl lg:text-[64px] font-bold text-[#ECEEE7]">
              {item.value}
            </h2>
            <p className="text-xs md:text-lg lg:text-[20px] font-semibold text-[#ECEEE7] text-center">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}