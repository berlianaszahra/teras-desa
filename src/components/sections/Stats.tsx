'use client'

import { useEffect, useState } from "react"
import api from "@/lib/axios"

interface DashboardStats {
  total_budget: string
  reports: { total: number; unprocessed: number }
  projects: { total: number; active: number; finished: number }
}

export default function Stats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    api.get('/statistics/dashboard')
      .then(res => setStats(res.data.data))
      .catch(() => {})
  }, [])

  const formatRupiah = (value: string) => {
    const num = Number(value)
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)} M`
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(0)} Jt`
    return num.toLocaleString('id-ID')
  }

  const items = stats ? [
    { value: formatRupiah(stats.total_budget), label: "Total Anggaran" },
    { value: stats.projects.active, label: "Proyek Aktif" },
    { value: stats.projects.finished, label: "Proyek Selesai" },
    { value: stats.reports.total, label: "Laporan" },
  ] : [
    { value: "-", label: "Total Anggaran" },
    { value: "-", label: "Proyek Aktif" },
    { value: "-", label: "Proyek Selesai" },
    { value: "-", label: "Laporan" },
  ]

  return (
    <div className="relative z-20 flex justify-center px-4 bg-[#F5F1E9]">
      <div className="
        flex flex-wrap md:flex-nowrap
        justify-center
        gap-4 md:gap-12
        px-4 md:px-8 py-10 md:py-16
        bg-gradient-to-r from-[#391A05] to-[#9F490E]
        rounded-[20px] md:rounded-[30px]
        shadow-md
        -mt-20 md:-mt-32 lg:-mt-40
      ">
        {items.map((item, i) => (
          <div key={i} className="
            flex flex-col items-center justify-center
            w-[140px] h-[120px]
            md:w-[180px] md:h-[150px]
            lg:w-[213px] lg:h-[165px]
            bg-[#391A05]
            border border-[#E46612]
            rounded-[20px] md:rounded-[30px]
            shadow-md
            p-2
          ">
            <h1 className="text-3xl md:text-5xl lg:text-[64px] font-bold text-[#ECEEE7]">
              {item.value}
            </h1>
            <p className="text-xs md:text-lg lg:text-[20px] font-semibold text-[#ECEEE7] text-center">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}