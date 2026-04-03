import HeaderAdmin       from "@/components/admin/dashboard/HeaderAdmin";
import StatsAdmin        from "@/components/admin/dashboard/StatsAdmin";
import FilterChartAdmin  from "@/components/admin/dashboard/FilterChartAdmin";
import TabelProyekAdmin  from "@/components/admin/proyek/TabelProyekAdmin";
 
export default function ProyekAdminPage() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <HeaderAdmin />
 
      <div className="flex flex-col gap-6 px-4 md:px-8">
        <StatsAdmin />
        <FilterChartAdmin />
        <TabelProyekAdmin />
      </div>
    </div>
  );
}