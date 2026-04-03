'use client';

import { useState, useEffect } from "react";
import { getReports, updateReportStatus, REPORT_STATUS_LABEL } from "@/lib/api";
import type { ReportListItem, ReportStatus } from "@/types";
 
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
    <div className="relative w-[140px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full h-[44px] px-5 rounded-xl text-lg font-bold text-[#FDF5E3] transition-colors"
        style={{ background: statusColor[value] }}
      >
        <span className="flex-1 text-left uppercase">{REPORT_STATUS_LABEL[value]}</span>
        <svg 
          width="20" height="20" viewBox="0 0 20 20" fill="none" 
          className={`transform transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M5 8l5 5 5-5" stroke="#FDF5E3" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-[48px] left-0 w-full rounded-xl overflow-hidden z-10 shadow-xl border border-[#3F5210]/10">
          {statusOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full px-5 py-3 text-lg font-bold text-[#FDF5E3] text-left border-b border-white/10 last:border-b-0 hover:brightness-110"
              style={{ background: statusColor[opt] }}
            >
              <span className="uppercase">{REPORT_STATUS_LABEL[opt]}</span>
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

  const limit = 10;

  useEffect(() => {
    setLoading(true);
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

  const handlePageChange = (p: number) => {
    setPage(p);
  };

  async function updateStatus(id: string, newStatus: ReportStatus) {
    try {
      await updateReportStatus(id, newStatus);
      setData((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      alert("Gagal memperbarui status");
    }
  }

  const columns = ["ID", "Judul", "Kategori", "Tanggal Laporan", "Lokasi", "Status", "Aksi"];

  return (
    <div className="w-full bg-[#E6E5D9] rounded-[35px] p-8 md:p-10 flex flex-col gap-10 shadow-sm">
      <h2 className="text-[36px] font-bold text-[#190B02] font-poppins">
        Daftar Laporan Warga
      </h2>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1100px] rounded-[25px] overflow-hidden border border-[#3F5210]/10">
          <div className="flex flex-row bg-[#3F5210] text-[#FDF5E3] font-poppins h-[70px]">
            {columns.map((col) => (
              <div
                key={col}
                className={`flex items-center px-6 py-5 text-xl font-bold border-r border-[#ECEEE7]/10 last:border-0
                  ${col === "ID"               ? "w-[120px] justify-center" : ""}
                  ${col === "Judul"            ? "flex-[1.5]" : ""}
                  ${col === "Kategori"         ? "w-[200px]" : ""}
                  ${col === "Tanggal Laporan"  ? "w-[220px]" : ""}
                  ${col === "Lokasi"           ? "flex-1" : ""}
                  ${col === "Status"           ? "w-[200px] justify-center" : ""}
                  ${col === "Aksi"             ? "w-[140px] justify-center" : ""}
                `}
              >
                {col}
              </div>
            ))}
          </div>

          <div className="bg-[#FDF5E3]">
            {loading ? (
              <div className="p-24 text-center text-2xl font-poppins font-bold text-[#3F5210]">Memuat laporan...</div>
            ) : data.length === 0 ? (
              <div className="p-24 text-center text-2xl font-poppins font-bold text-[#3F5210]">Tidak ada laporan ditemukan</div>
            ) : (
              data.map((row, index) => (
                <div key={row.id} className="flex flex-row border-b border-[#3F5210]/10 last:border-0 hover:bg-[#F2EEDA] transition-colors font-poppins min-h-[90px]">
                  <div className="w-[120px] flex items-center justify-center px-6 py-4 text-xl font-bold text-[#5E5151]">
                    #{String(index + 1).padStart(3, '0')}
                  </div>
                  <div className="flex-[1.5] flex items-center px-6 py-4 text-xl font-bold text-[#190B02]">
                    {row.title}
                  </div>
                  <div className="w-[200px] flex items-center px-6 py-4 text-xl font-bold text-[#5E5151]">
                    Infrastruktur
                  </div>
                  <div className="w-[220px] flex items-center px-6 py-4 text-xl font-medium text-[#5E5151]">
                    {new Date(row.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </div>
                  <div className="flex-1 flex items-center px-6 py-4 text-xl font-medium text-[#5E5151]">
                    {row.location}
                  </div>
                  <div className="w-[200px] flex items-center justify-center px-6 py-4">
                    <StatusDropdown
                      value={row.status}
                      onChange={(v) => updateStatus(row.id, v)}
                    />
                  </div>
                  <div className="w-[140px] flex items-center justify-center px-6 py-4">
                    <button className="px-8 py-2.5 bg-[#999999] rounded-2xl text-xl font-bold text-[#190B02] hover:bg-[#888] transition-colors">
                      Detail
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {!loading && total > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
          <span className="text-[28px] font-bold text-[#190B02] font-poppins">
            Menampilkan {data.length} dari {total} Laporan
          </span>

          <div className="flex gap-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-14 h-11 flex items-center justify-center rounded-2xl border-2 border-[#3F5210] font-bold text-2xl transition-all
                  ${page === i + 1 ? "bg-[#3F5210] text-[#FDF5E3]" : "bg-[#ECEEE7] text-[#3F5210] hover:bg-white shadow-sm"}
                `}
              >
                {i + 1}
              </button>
            ))}
            <button className="w-14 h-11 flex items-center justify-center rounded-2xl border-2 border-[#3F5210] bg-[#ECEEE7] text-[#3F5210] hover:bg-white shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}