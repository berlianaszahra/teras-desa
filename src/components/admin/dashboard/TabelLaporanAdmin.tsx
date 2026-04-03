'use client';

import { useState, useEffect } from "react";
import { getReports, updateReportStatus, REPORT_STATUS_LABEL } from "@/lib/api";
import type { ReportListItem, ReportStatus } from "@/types";
import DetailReportModal from "./DetailReportModal";
 
const statusOptions: ReportStatus[] = ["diproses", "diterima", "selesai"];
 
const statusColor: Record<string, string> = {
  diproses: "#9F490E",
  diterima: "#E3AB55",
  selesai: "#3F5210",
};
 
function StatusDropdown({
  value,
  onChange,
}: {
  value: ReportStatus;
  onChange: (v: ReportStatus) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-[100px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 w-full h-[32px] px-3 rounded-full text-xs font-bold text-[#FDF5E3] transition-colors"
        style={{ background: statusColor[value] }}
      >
        <span className="flex-1 text-left">{REPORT_STATUS_LABEL[value]}</span>
        <svg 
          width="14" height="14" viewBox="0 0 20 20" fill="none" 
          className={`transform transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M5 8l5 5 5-5" stroke="#FDF5E3" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-[36px] left-0 w-full rounded-lg overflow-hidden z-10 shadow-xl border border-[#3F5210]/10">
          {statusOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full px-3 py-2 text-xs font-bold text-[#FDF5E3] text-left border-b border-white/10 last:border-b-0 hover:brightness-110"
              style={{ background: statusColor[opt] }}
            >
              {REPORT_STATUS_LABEL[opt]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
 
export default function TabelLaporanAdmin({ status }: { status: string }) {
  const [data, setData] = useState<ReportListItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const limit = 10;

  useEffect(() => {
    const filterStatus = status === "Semua" ? undefined : status.toLowerCase() as ReportStatus;
    getReports({ page, limit, status: filterStatus })
      .then((res) => {
        setData(res.data.items);
        setTotal(res.data.total);
        setTotalPages(res.data.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, status]);

  const handlePageChange = (p: number) => { setPage(p); };
  const handleOpenDetail = (id: string) => { setSelectedReportId(id); setIsDetailOpen(true); };
  const handleCloseDetail = () => { setIsDetailOpen(false); setSelectedReportId(null); };

  async function updateStatus(id: string, newStatus: ReportStatus) {
    try {
      await updateReportStatus(id, newStatus);
      setData((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    } catch (err) {
      alert("Gagal memperbarui status");
    }
  }

  const columns = ["ID", "Judul", "Kategori", "Tanggal Laporan", "Lokasi", "Status", "Aksi"];

  return (
    <>
      <div className="w-full bg-[#E6E5D9] rounded-2xl p-4 md:p-6 flex flex-col gap-5 shadow-sm">
        <h2 className="text-lg md:text-xl font-bold text-[#190B02] font-poppins">
          Daftar Laporan Warga
        </h2>

        {/* Tabel Container dengan rounded corners */}
        <div className="w-full overflow-x-auto rounded-xl border border-[#3F5210]/10 shadow-sm">
          <table className="w-full min-w-[800px] border-collapse">
            <thead className="bg-[#3F5210] text-[#FDF5E3] font-poppins text-xs font-bold">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className={`px-4 py-4 text-left border-r border-[#ECEEE7]/10 last:border-0
                      ${col === "ID"              ? "w-[80px] text-center" : ""}
                      ${col === "Judul"           ? "" : ""}
                      ${col === "Kategori"        ? "w-[130px]" : ""}
                      ${col === "Tanggal Laporan" ? "w-[140px]" : ""}
                      ${col === "Lokasi"          ? "w-[140px]" : ""}
                      ${col === "Status"          ? "w-[130px] text-center" : ""}
                      ${col === "Aksi"            ? "w-[90px] text-center" : ""}
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
                  <td colSpan={7} className="p-10 text-center text-sm font-poppins font-bold text-[#3F5210]">
                    Memuat laporan...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-sm font-poppins font-bold text-[#3F5210]">
                    Tidak ada laporan ditemukan
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={row.id} className="border-b border-[#3F5210]/10 last:border-0 hover:bg-[#F2EEDA] transition-colors font-poppins text-xs">
                    <td className="px-4 py-4 font-bold text-[#5E5151] text-center">
                      #{String(index + 1).padStart(3, '0')}
                    </td>
                    <td className="px-4 py-4 font-bold text-[#190B02]">
                      {row.title}
                    </td>
                    <td className="px-4 py-4 font-semibold text-[#5E5151]">
                      Infrastruktur
                    </td>
                    <td className="px-4 py-4 font-medium text-[#5E5151]">
                      {new Date(row.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-4 font-medium text-[#5E5151]">
                      {row.location}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusDropdown
                        value={row.status}
                        onChange={(v) => updateStatus(row.id, v)}
                      />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => handleOpenDetail(row.id)}
                        className="px-5 py-1.5 bg-[#E6E5D9] rounded-full font-bold text-[#5E5151] hover:bg-[#D5D4C8] transition-colors shadow-sm"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginasi Box */}
        {!loading && total > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-1">
            <span className="text-sm font-bold text-[#190B02] font-poppins">
              Menampilkan {data.length} dari {total} Laporan
            </span>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#3F5210] bg-[#ECEEE7] text-[#3F5210] disabled:opacity-50 text-xs shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border border-[#3F5210] font-bold text-sm transition-all shadow-sm
                    ${page === i + 1 ? "bg-[#3F5210] text-[#FDF5E3]" : "bg-[#ECEEE7] text-[#3F5210] hover:bg-white"}
                  `}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#3F5210] bg-[#ECEEE7] text-[#3F5210] disabled:opacity-50 text-xs shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {isDetailOpen && selectedReportId && (
        <DetailReportModal 
          reportId={selectedReportId} 
          onClose={handleCloseDetail} 
        />
      )}
    </>
  );
}