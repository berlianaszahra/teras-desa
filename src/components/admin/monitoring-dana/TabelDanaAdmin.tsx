'use client';

import { useState, useEffect } from 'react';
import { getReports, updateReportStatus, REPORT_STATUS_LABEL } from '@/lib/api';
import type { ReportListItem, ReportStatus } from '@/types';

const statusOptions: ReportStatus[] = ['diproses', 'diterima', 'selesai'];

const statusColor: Record<ReportStatus, string> = {
  diproses: '#E3AB55',
  diterima: '#9F490E',
  selesai:  '#3F5210',
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
    <div className="relative w-[122px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full h-[37px] px-4 border border-black rounded-lg text-base font-medium text-[#190B02]"
        style={{ background: statusColor[value] }}
      >
        <span className="flex-1 text-left">{REPORT_STATUS_LABEL[value] ?? value}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 8l5 5 5-5" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-[37px] left-0 w-full border border-black rounded-b-lg overflow-hidden z-10">
          {statusOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full px-4 py-[9px] text-base font-medium text-[#190B02] text-left border-b border-black last:border-b-0"
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

export default function TabelDanaAdmin() {
  const [data, setData] = useState<ReportListItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 10;

  useEffect(() => {
    getReports({ page, limit })
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

  async function handleStatusChange(id: string, status: ReportStatus) {
    try {
      await updateReportStatus(id, status);
      // Update state lokal secara optimistis
      setData((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal memperbarui status';
      alert(msg);
    }
  }

  const columns = ["No", "Nama Proyek", "Tanggal Laporan", "Lokasi", "Status", "Aksi"];

  return (
    <div className="w-full bg-[#E6E5D9] rounded-[30px] p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Daftar Laporan Warga</h2>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px] rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <div className="flex flex-row">
            {columns.map((col) => (
              <div
                key={col}
                className={`flex items-center justify-center px-4 py-3 bg-[#3F5210] border-b border-[#190B02] text-base font-semibold text-[#FDF5E3]
                  ${col === "No"               ? "w-[60px]"   : ""}
                  ${col === "Nama Proyek"      ? "flex-1"     : ""}
                  ${col === "Tanggal Laporan"  ? "w-[166px]"  : ""}
                  ${col === "Lokasi"           ? "w-[157px]"  : ""}
                  ${col === "Status"           ? "w-[168px]"  : ""}
                  ${col === "Aksi"             ? "w-[99px]"   : ""}
                `}
              >
                {col}
              </div>
            ))}
          </div>

          {loading ? (
            <div className="p-10 flex justify-center items-center bg-[#FDF5E3]">
              <span className="text-black">Memuat data...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="p-10 text-center bg-[#FDF5E3] text-black">Tidak ada laporan</div>
          ) : (
            data.map((row, index) => (
              <div key={row.id} className="flex flex-row border-b border-[#190B02] last:border-b-0 bg-[#FDF5E3]">
                <div className="w-[60px] flex items-center justify-center px-4 py-4">
                  <span className="text-base font-semibold text-[#5E5151]">
                    {(page - 1) * limit + index + 1}
                  </span>
                </div>
                <div className="flex-1 flex items-center px-4 py-4">
                  <span className="text-base font-semibold text-[#5E5151] truncate" title={row.title}>{row.title}</span>
                </div>
                <div className="w-[166px] flex items-center px-4 py-4">
                  <span className="text-base font-semibold text-[#5E5151]">
                    {new Date(row.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="w-[157px] flex items-center px-4 py-4">
                  <span className="text-base font-semibold text-[#5E5151] truncate" title={row.location}>{row.location}</span>
                </div>
                <div className="w-[168px] flex items-center justify-center px-4 py-4">
                  <StatusDropdown
                    value={row.status}
                    onChange={(v) => handleStatusChange(row.id, v)}
                  />
                </div>
                <div className="w-[99px] flex items-center justify-center px-4 py-4">
                  <button className="px-4 py-2 bg-[#999999] rounded-2xl text-base font-semibold text-black hover:bg-[#888] transition-colors">
                    Detail
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {!loading && total > 0 && (
        <div className="flex flex-row items-center justify-between mt-2">
          <span className="text-xl font-semibold text-[#190B02]">
            Menampilkan {data.length} dari {total} Laporan
          </span>
          <div className="flex flex-row gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-[40px] h-[31px] flex items-center justify-center border border-[#3F5210] rounded-[10px] text-xl font-medium transition-colors ${
                    page === p ? "bg-[#3F5210] text-[#FDF5E3]" : "bg-[#ECEEE7] text-[#3F5210] hover:bg-[#C3C9B5]"
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