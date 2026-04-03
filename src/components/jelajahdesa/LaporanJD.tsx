'use client';

import { useEffect, useState } from 'react';
import { getReports, REPORT_STATUS_LABEL } from '@/lib/api';
import type { ReportListItem } from '@/types';

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center justify-center px-4 py-1 rounded-xl bg-[#E2E5DB] text-[#2F3E0C] text-xs md:text-sm font-semibold">
      {REPORT_STATUS_LABEL[status] ?? status}
    </span>
  );
}

export default function LaporanJD() {
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports({ page: 1, limit: 4 })
      .then((res) => setReports(res.data.items))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-4 md:mx-10 lg:mx-[122px] bg-[#E6E5D9] rounded-2xl md:rounded-[30px] shadow-md p-5 md:p-10 flex flex-col gap-4">

      <h2 className="text-xl md:text-3xl lg:text-[40px] font-bold text-[#1E1E1E]">
        Laporan Terbaru
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-base text-[#5E5151]">Memuat laporan...</span>
        </div>
      ) : reports.length === 0 ? (
        <div className="flex justify-center py-10">
          <span className="text-base text-[#5E5151]">Belum ada laporan</span>
        </div>
      ) : (
        <>
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#3F5210] text-white text-left">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Judul Laporan</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((r, i) => (
                  <tr
                    key={r.id}
                    className={i % 2 === 0 ? "bg-[#FDF5E3]" : "bg-[#F5F0DC]"}
                  >
                    <td className="px-4 py-3">#{r.id.slice(0, 4)}</td>
                    <td className="px-4 py-3">{r.title}</td>
                    <td className="px-4 py-3">
                      {new Date(r.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {reports.map((r) => (
              <div
                key={r.id}
                className="bg-[#FDF5E3] rounded-xl p-4 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-sm">#{r.id.slice(0, 4)}</span>
                  <StatusBadge status={r.status} />
                </div>

                <p className="font-semibold text-[#5E5151]">{r.title}</p>

                <p className="text-xs text-gray-500">
                  {new Date(r.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

    </section>
  );
}