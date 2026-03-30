import HeaderAdmin       from "@/components/admin/dashboard/HeaderAdmin";
import StatsAdmin        from "@/components/admin/dashboard/StatsAdmin";
import FilterChartAdmin  from "@/components/admin/dashboard/FilterChartAdmin";
import TabelLaporanAdmin from "@/components/admin/dashboard/TabelLaporanAdmin";
 
export default function DashboardAdminPage() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <HeaderAdmin />
 
      <div className="flex flex-col gap-6 px-[44px]">
        {/* 3 Stat Cards */}
        <StatsAdmin />
 
        {/* Filter + Pie Chart */}
        <FilterChartAdmin />
 
        {/* Tabel Laporan */}
        <TabelLaporanAdmin />
      </div>
    </div>
  );
}
 