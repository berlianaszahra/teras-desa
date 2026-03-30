import HeaderAdmin      from "@/components/admin/dashboard/HeaderAdmin";
import StatsAdmin       from "@/components/admin/dashboard/StatsAdmin";
import TabelDanaAdmin   from "@/components/admin/monitoring-dana/TabelDanaAdmin";
 
export default function MonitoringDanaPage() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <HeaderAdmin />
 
      <div className="flex flex-col gap-6 px-[44px]">
        <StatsAdmin />
        <TabelDanaAdmin />
      </div>
    </div>
  );
}
 








