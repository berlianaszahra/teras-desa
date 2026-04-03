'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats, formatRupiah } from '@/lib/api';

export default function HeroSP() {
  const [totalBudget, setTotalBudget] = useState<string | number>('0');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setTotalBudget(res.data.total_budget))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 md:px-12 lg:px-[122px] pt-28 md:pt-40 lg:pt-[237px] flex flex-col gap-6 md:gap-10">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-bold text-[#252525] leading-tight md:leading-[131.8%]">
        Semua Proyek
      </h1>

      <div
        className="w-full rounded-2xl md:rounded-[30px] flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:h-[265px]"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/images/bg jelajah desa.webp') center/cover no-repeat",
        }}
      >
        <p className="text-lg sm:text-xl md:text-3xl lg:text-[40px] font-medium text-white leading-tight md:leading-[131.8%]">
          Total Dana Terpakai
        </p>

        <p className="text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-semibold text-white leading-tight md:leading-[131.8%]">
          {loading ? '...' : formatRupiah(totalBudget)}
        </p>
      </div>
    </section>
  );
}