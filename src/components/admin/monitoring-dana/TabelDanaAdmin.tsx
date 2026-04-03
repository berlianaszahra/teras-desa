'use client';

import { useState } from 'react';

interface IncomeItem {
  id: number;
  program: string;
  source: string;
  amount: number;
  date: string;
}

const mockIncome: IncomeItem[] = [
  { id: 1, program: "Dana Desa Tahap 1", source: "Dana Desa", amount: 150000000, date: "02 Mar 2026" },
  { id: 2, program: "Bantuan Provinsi Jawa", source: "APBD Provinsi", amount: 200000000, date: "05 Mar 2026" },
  { id: 3, program: "Bantuan Pemerintah Pusat", source: "APBN", amount: 350000000, date: "10 Mar 2026" },
  { id: 4, program: "Bantuan CSR Bank Mandiri", source: "CSR Perusahaan", amount: 750000000, date: "15 Mar 2026" },
  { id: 5, program: "Bantuan Masyarakat", source: "Swadaya Warga", amount: 25000000, date: "18 Mar 2026" },
  { id: 6, program: "Dana Desa Tahap 2", source: "Dana Desa", amount: 180000000, date: "20 Mar 2026" },
  { id: 7, program: "Bantuan Lembaga Sosial", source: "Hibah", amount: 90000000, date: "22 Mar 2026" },
];

export default function TabelDanaAdmin() {
  const [data] = useState<IncomeItem[]>(mockIncome);
  const [page] = useState(1);
  const total = data.length;

  const columns = ["No", "Program", "Sumber Dana", "Jumlah", "Tanggal Laporan"];

  return (
    <div className="w-full bg-[#E6E5D9] rounded-2xl p-4 md:p-6 flex flex-col gap-5 shadow-sm">
      <h2 className="text-lg md:text-xl font-bold text-[#190B02] font-poppins">
        Dana Masuk
      </h2>

      {/* Tabel Container dengan rounded corners */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#3F5210]/10 shadow-sm">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="bg-[#3F5210] text-[#FDF5E3] font-poppins text-xs font-bold">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className={`px-4 py-4 text-left border-r border-[#ECEEE7]/10 last:border-0
                    ${col === "No"              ? "w-[60px] text-center" : ""}
                    ${col === "Program"         ? "" : ""}
                    ${col === "Sumber Dana"     ? "w-[150px]" : ""}
                    ${col === "Jumlah"          ? "w-[160px]" : ""}
                    ${col === "Tanggal Laporan" ? "w-[150px]" : ""}
                  `}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#FDF5E3]">
            {data.map((row, index) => (
              <tr key={row.id} className="border-b border-[#3F5210]/10 last:border-0 hover:bg-[#F2EEDA] transition-colors font-poppins text-xs">
                <td className="px-4 py-4 font-bold text-[#5E5151] text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-4 font-bold text-[#190B02]">
                  {row.program}
                </td>
                <td className="px-4 py-4 font-medium text-[#5E5151]">
                  {row.source}
                </td>
                <td className="px-4 py-4 font-medium text-[#5E5151]">
                  Rp {row.amount.toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-4 font-medium text-[#5E5151]">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Paginasi */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-1">
        <span className="text-sm font-bold text-[#190B02] font-poppins">
          Menampilkan {data.length} dari {total} Dana Masuk
        </span>

        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#3F5210] bg-[#3F5210] text-[#FDF5E3] font-bold text-sm shadow-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#3F5210] bg-[#ECEEE7] text-[#3F5210] font-bold text-sm hover:bg-white transition-all shadow-sm">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#3F5210] bg-[#ECEEE7] text-[#3F5210] hover:bg-white transition-all shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}