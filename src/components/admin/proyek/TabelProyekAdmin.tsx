'use client';

import { useState, useEffect } from "react";
import { getProjects, PROJECT_STATUS_LABEL, formatRupiah } from "@/lib/api";
import type { ProjectListItem } from "@/types";
 
const statusColor: Record<string, string> = {
  perencanaan: "#E3AB55",
  berjalan: "#9F490E",
  selesai: "#3F5210",
};
 
export default function TabelProyekAdmin() {
  const [data, setData] = useState<ProjectListItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 10;

  useEffect(() => {
    getProjects({ page, limit })
      .then((res) => {
        setData(res.data.items);
        setTotal(res.data.total);
        setTotalPages(res.data.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const handlePageChange = (p: number) => {
    setLoading(true);
    setPage(p);
  };
 
  const columns = ["No", "Nama Proyek", "Masa Berjalan", "Lokasi", "Anggaran", "Status", "Aksi"];
 
  return (
    <div className="w-full bg-[#E6E5D9] rounded-2xl p-4 md:p-6 flex flex-col gap-5 shadow-sm">
      <h2 className="text-lg md:text-xl font-bold text-[#190B02] font-poppins">
        Daftar Proyek Desa
      </h2>
 
      {/* Tabel Container dengan rounded corners */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#3F5210]/10 shadow-sm">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="bg-[#3F5210] text-[#FDF5E3] font-poppins text-xs font-bold">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className={`px-4 py-4 text-left border-r border-[#ECEEE7]/10 last:border-0
                    ${col === "No"             ? "w-[60px] text-center" : ""}
                    ${col === "Nama Proyek"    ? "" : ""}
                    ${col === "Masa Berjalan"  ? "w-[160px]" : ""}
                    ${col === "Lokasi"         ? "w-[140px]" : ""}
                    ${col === "Anggaran"       ? "w-[140px]" : ""}
                    ${col === "Status"         ? "w-[120px] text-center" : ""}
                    ${col === "Aksi"           ? "w-[90px] text-center" : ""}
                  `}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#FDF5E3]">
            {loading ? (
               <tr>
                 <td colSpan={7} className="p-10 flex justify-center items-center bg-[#FDF5E3]">
                    <span className="text-black font-poppins text-sm font-bold">Memuat proyek...</span>
                 </td>
               </tr>
            ) : data.length === 0 ? (
               <tr>
                 <td colSpan={7} className="p-10 text-center bg-[#FDF5E3] text-black font-poppins text-sm font-bold">
                    Tidak ada proyek ditemukan
                 </td>
               </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row.id} className="border-b border-[#3F5210]/10 last:border-0 hover:bg-[#F2EEDA] transition-colors font-poppins text-xs">
                  <td className="px-4 py-4 font-bold text-[#5E5151] text-center">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-4 font-bold text-[#190B02] truncate" title={row.title}>
                    {row.title}
                  </td>
                  <td className="px-4 py-4 flex flex-col justify-center">
                    <span className="text-xs text-[#5E5151] font-medium leading-tight">
                      {new Date(row.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} -
                    </span>
                    <span className="text-xs text-[#5E5151] font-medium leading-tight mt-1">
                      {new Date(row.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium text-[#5E5151] truncate max-w-[140px]" title={row.location}>
                    {row.location}
                  </td>
                  <td className="px-4 py-4 font-semibold text-[#5E5151]">
                    {formatRupiah(row.totalBudget, true)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div
                      className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[#FDF5E3] font-bold w-full"
                      style={{ backgroundColor: statusColor[row.status] || '#A0A0A0' }}
                    >
                      {PROJECT_STATUS_LABEL[row.status] || row.status}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="px-5 py-1.5 bg-[#E6E5D9] rounded-full font-bold text-[#5E5151] hover:bg-[#D5D4C8] transition-colors shadow-sm">
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
  
      {/* Footer Paginasi */}
      {!loading && total > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-1">
          <span className="text-sm font-bold text-[#190B02] font-poppins">
            Menampilkan {data.length} dari {total} Proyek
          </span>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border border-[#3F5210] font-bold text-sm transition-all shadow-sm ${
                    page === p ? "bg-[#3F5210] text-[#FDF5E3]" : "bg-[#ECEEE7] text-[#3F5210] hover:bg-white"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
 