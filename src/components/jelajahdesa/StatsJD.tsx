'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats, formatRupiah } from '@/lib/api';
import type { DashboardStats } from '@/types';

export default function StatsJD() {
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
        { label: 'Total Anggaran', value: formatRupiah(stats.total_budget, true) },
        { label: 'Proyek Aktif', value: String(stats.projects.active) },
        { label: 'Proyek Selesai', value: String(stats.projects.finished) },
        { label: 'Laporan', value: String(stats.reports.total) },
      ]
    : [
        { label: 'Total Anggaran', value: loading ? '...' : '-' },
        { label: 'Proyek Aktif', value: loading ? '...' : '-' },
        { label: 'Proyek Selesai', value: loading ? '...' : '-' },
        { label: 'Laporan', value: loading ? '...' : '-' },
      ];

  return (
    <div
      className="mx-4 md:mx-10 lg:mx-[122px] rounded-2xl md:rounded-[30px]
                 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6
                 py-6 md:py-[37px] px-4 md:px-6 shadow-md"
      style={{ background: 'linear-gradient(90deg, #391A05 0%, #9F490E 100%)' }}
    >
      {items.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center gap-2 md:gap-3
                     rounded-xl md:rounded-[30px] border border-[#E46612]
                     bg-[#391A05] py-4 md:py-6 shadow-sm"
        >
          <span className="text-xl md:text-3xl lg:text-[48px] font-bold text-white leading-none">
            {stat.value}
          </span>
          <span className="text-xs md:text-sm lg:text-xl font-semibold text-white text-center">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}