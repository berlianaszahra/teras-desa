'use client';

import { useEffect, useState } from 'react';
import { getMyReports, REPORT_STATUS_LABEL } from '@/lib/api';
import type { ReportListItem, ReportStatus } from '@/types';

const statusColor: Record<ReportStatus, string> = {
  diproses: '#E3AB55',
  diterima: '#9F490E',
  selesai:  '#3F5210',
};

const columns = ["ID", "Judul Laporan", "Tanggal Laporan", "Status"];

export default function RiwayatLaporan() {
  const [data, setData] = useState<ReportListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyReports()
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Riwayat Laporan</h2>

      <div className="w-full rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="flex flex-row">
          {columns.map((col) => (
            <div
              key={col}
              className={`flex items-center justify-center px-4 py-3 bg-[#3F5210] border-b border-[#190B02] text-base font-semibold text-[#FDF5E3]
                ${col === "ID"               ? "w-[80px]"  : ""}
                ${col === "Judul Laporan"    ? "flex-1"    : ""}
                ${col === "Tanggal Laporan"  ? "w-[166px]" : ""}
                ${col === "Status"           ? "w-[120px]" : ""}
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
          <div className="p-10 text-center bg-[#FDF5E3] text-black">Belum ada laporan</div>
        ) : (
          data.map((row, index) => (
            <div
              key={row.id}
              className="flex flex-row border-b border-[#190B02] last:border-b-0 bg-[#FDF5E3]"
            >
              <div className="w-[80px] flex items-center justify-center px-4 py-4">
                <span className="text-base font-semibold text-[#5E5151]">#{index + 1}</span>
              </div>
              <div className="flex-1 flex items-center px-4 py-4">
                <span className="text-base font-semibold text-[#5E5151]">{row.title}</span>
              </div>
              <div className="w-[166px] flex items-center px-4 py-4">
                <span className="text-base font-semibold text-[#5E5151]">
                  {new Date(row.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </span>
              </div>
              <div className="w-[120px] flex items-center justify-center px-4 py-4">
                <span
                  className="px-3 py-1 rounded-lg text-sm font-semibold text-[#FDF5E3]"
                  style={{ background: statusColor[row.status] }}
                >
                  {REPORT_STATUS_LABEL[row.status] ?? row.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}