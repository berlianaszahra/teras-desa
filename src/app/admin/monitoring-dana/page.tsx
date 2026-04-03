"use client";

import HeaderAdmin from "@/components/admin/dashboard/HeaderAdmin";
import StatsAdmin from "@/components/admin/dashboard/StatsAdmin";
import TabelDanaAdmin from "@/components/admin/monitoring-dana/TabelDanaAdmin";

export default function MonitoringDanaPage() {
  return (
    <div className="flex flex-col gap-10 pb-20 overflow-hidden">
      <HeaderAdmin />

      <div className="flex flex-col gap-10 px-6 md:px-[60px]">
        {/* Stats Section */}
        <StatsAdmin />

        {/* Action Bar */}
        <div className="flex justify-end -mb-4">
          <button className="flex items-center gap-3 px-8 py-3 bg-[#3F5210] hover:bg-[#2F3E0C] text-[#FDF5E3] rounded-2xl text-2xl font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Tambah Data</span>
          </button>
        </div>

        {/* Table Section */}
        <TabelDanaAdmin />
      </div>
    </div>
  );
}
