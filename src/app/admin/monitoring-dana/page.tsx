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
        <TabelDanaAdmin />
      </div>
    </div>
  );
}
