'use client';

import { REPORT_STATUS_LABEL } from '@/lib/api';
import type { ReportListItem } from '@/types';

interface RiwayatLaporanContentProps {
  reports: ReportListItem[];
  loading: boolean;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    diterima: 'bg-[#E2E5DB] text-[#2F3E0C]',
    diproses: 'bg-[#FEF3C7] text-[#92400E]',
    selesai: 'bg-[#D1FAE5] text-[#065F46]',
  };

  return (
    <span className={`inline-flex items-center justify-center px-4 py-1 rounded-xl text-xs md:text-sm font-semibold ${colors[status] || 'bg-gray-200 text-gray-700'}`}>
      {REPORT_STATUS_LABEL[status] ?? status}
    </span>
  );
}

export default function RiwayatLaporanContentJD({ reports, loading }: RiwayatLaporanContentProps) {
  return (
    <div className="flex-1 bg-[#FDF5E3] p-6 md:p-12 lg:p-16 min-h-[600px]">
      <h2 className="text-2xl md:text-4xl lg:text-[48px] font-bold text-[#1E1E1E] mb-8 lg:mb-12">
        Riwayat Laporan
      </h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="text-lg text-[#5E5151]">Memuat riwayat laporan...</span>
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-60">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-[#556117] mb-4">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg text-[#5E5151]">Belum ada laporan yang dikirimkan.</span>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#556117] text-[#ECEEE7]">
                <th className="px-6 py-4 font-semibold text-sm md:text-base border-r border-[#ECEEE7]/20">ID</th>
                <th className="px-6 py-4 font-semibold text-sm md:text-base border-r border-[#ECEEE7]/20">Judul Laporan</th>
                <th className="px-6 py-4 font-semibold text-sm md:text-base border-r border-[#ECEEE7]/20">Tanggal Laporan</th>
                <th className="px-6 py-4 font-semibold text-sm md:text-base">Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <tr 
                  key={report.id} 
                  className={`
                    border-b border-gray-200 
                    ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9F6EA]'}
                    hover:bg-[#F2EEDA] transition-colors
                  `}
                >
                  <td className="px-6 py-4 text-sm md:text-base font-medium text-[#5E5151]">
                    #{report.id.slice(0, 4)}
                  </td>
                  <td className="px-6 py-4 text-sm md:text-base text-[#1E1E1E]">
                    {report.title}
                  </td>
                  <td className="px-6 py-4 text-sm md:text-base text-[#5E5151]">
                    {new Date(report.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={report.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
