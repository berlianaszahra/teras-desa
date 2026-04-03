"use client";

import { useState } from "react";
import HeaderAdmin from "@/components/admin/dashboard/HeaderAdmin";
import StatsAdmin from "@/components/admin/dashboard/StatsAdmin";
import FilterChartAdmin from "@/components/admin/dashboard/FilterChartAdmin";
import TabelLaporanAdmin from "@/components/admin/dashboard/TabelLaporanAdmin";

export default function DashboardAdmin() {
  const [selectedStatus, setSelectedStatus] = useState("Semua");

  return (
    <div className="flex flex-col gap-10 pb-20 overflow-hidden">
      <HeaderAdmin />

      <div className="flex flex-col gap-10 px-6 md:px-[60px]">
        <StatsAdmin />
        <FilterChartAdmin activeStatus={selectedStatus} onFilterChange={setSelectedStatus} />
        <TabelLaporanAdmin status={selectedStatus} />
      </div>
    </div>
  );
}