"use client";

import { useState } from "react";
import HeaderAdmin from "@/components/admin/dashboard/HeaderAdmin";
import StatsAdmin from "@/components/admin/dashboard/StatsAdmin";
import FilterChartAdmin from "@/components/admin/dashboard/FilterChartAdmin";
import TabelLaporanAdmin from "@/components/admin/dashboard/TabelLaporanAdmin";

export default function DashboardAdmin() {
  const [selectedStatus, setSelectedStatus] = useState("Semua");

  return (
    <div className="flex flex-col gap-6 pb-12 overflow-hidden">
      <HeaderAdmin />

      <div className="flex flex-col gap-6 px-4 md:px-8">
        <StatsAdmin />
        <FilterChartAdmin activeStatus={selectedStatus} onFilterChange={setSelectedStatus} />
        <TabelLaporanAdmin status={selectedStatus} />
      </div>
    </div>
  );
}