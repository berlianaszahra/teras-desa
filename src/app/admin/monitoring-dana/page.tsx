"use client";

import HeaderAdmin from "@/components/admin/dashboard/HeaderAdmin";
import StatsAdmin from "@/components/admin/dashboard/StatsAdmin";
import TabelDanaAdmin from "@/components/admin/monitoring-dana/TabelDanaAdmin";

export default function MonitoringDanaPage() {
  return (
    <div className="flex flex-col gap-6 pb-12 overflow-hidden">
      <HeaderAdmin />

      <div className="flex flex-col gap-6 px-4 md:px-8">
        <StatsAdmin />

        {/* Action Bar */}
        <div className="flex justify-end -mb-2">
          <button className="flex items-center gap-2 px-5 py-2 bg-[#3F5210] hover:bg-[#2F3E0C] text-[#FDF5E3] rounded-xl text-sm font-bold shadow transition-all transform hover:scale-105 active:scale-95">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Tambah Data</span>
          </button>
        </div>

        <TabelDanaAdmin />
      </div>
    </div>
  );
}
