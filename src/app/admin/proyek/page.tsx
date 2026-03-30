import HeaderAdmin       from "@/components/admin/dashboard/HeaderAdmin";
import StatsAdmin        from "@/components/admin/dashboard/StatsAdmin";
import FilterChartAdmin  from "@/components/admin/dashboard/FilterChartAdmin";
import TabelProyekAdmin  from "@/components/admin/proyek/TabelProyekAdmin";
 
export default function ProyekAdminPage() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <HeaderAdmin />
 
      <div className="flex flex-col gap-6 px-[44px]">
        {/* Stats sama seperti dashboard */}
        <StatsAdmin />
 
        {/* Filter + Pie Chart */}
        <FilterChartAdmin />
 
        {/* Tabel Proyek */}
        <TabelProyekAdmin />
      </div>
    </div>
  );
}
 