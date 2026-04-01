import HeaderAdmin from "@/components/admin/dashboard/HeaderAdmin";
import StatsAdmin from "@/components/admin/dashboard//StatsAdmin";
import FilterChartAdmin from "@/components/admin/dashboard//FilterChartAdmin";
import TabelLaporanAdmin from "@/components/admin/dashboard//TabelLaporanAdmin";

export default function DashboardAdmin() {
  return (
    <div className="flex flex-col gap-6">
      <HeaderAdmin />

      <StatsAdmin />

      <FilterChartAdmin />

      <TabelLaporanAdmin />
    </div>
  );
}