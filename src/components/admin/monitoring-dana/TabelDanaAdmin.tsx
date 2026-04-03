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

  const columns = ["No", "Program", "Sumber Dana", "Jumlah", "Tanggal Laporan", "Aksi"];

  return (
    <div className="w-full bg-[#E6E5D9] rounded-[35px] p-8 md:p-10 flex flex-col gap-8 shadow-sm">
      <h2 className="text-[36px] font-bold text-[#190B02] font-poppins">
        Dana Masuk
      </h2>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] rounded-[25px] overflow-hidden border border-[#3F5210]/10">
          <div className="flex flex-row bg-[#3F5210] text-[#FDF5E3] font-poppins h-[70px]">
            {columns.map((col) => (
              <div
                key={col}
                className={`flex items-center px-6 py-5 text-xl font-bold border-r border-[#ECEEE7]/10 last:border-0
                  ${col === "No"              ? "w-[80px] justify-center" : ""}
                  ${col === "Program"         ? "flex-[1.5]" : ""}
                  ${col === "Sumber Dana"     ? "w-[240px]" : ""}
                  ${col === "Jumlah"          ? "w-[240px]" : ""}
                  ${col === "Tanggal Laporan" ? "w-[220px]" : ""}
                  ${col === "Aksi"            ? "w-[140px] justify-center" : ""}
                `}
              >
                {col}
              </div>
            ))}
          </div>

          <div className="bg-[#FDF5E3]">
            {data.map((row, index) => (
              <div key={row.id} className="flex flex-row border-b border-[#3F5210]/10 last:border-0 hover:bg-[#F2EEDA] transition-colors font-poppins min-h-[80px]">
                <div className="w-[80px] flex items-center justify-center px-6 py-4 text-xl font-bold text-[#5E5151]">
                  {index + 1}
                </div>
                <div className="flex-[1.5] flex items-center px-6 py-4 text-xl font-bold text-[#190B02]">
                  {row.program}
                </div>
                <div className="w-[240px] flex items-center px-6 py-4 text-xl font-bold text-[#5E5151]">
                  {row.source}
                </div>
                <div className="w-[240px] flex items-center px-6 py-4 text-xl font-bold text-[#5E5151]">
                  Rp {row.amount.toLocaleString('id-ID')}
                </div>
                <div className="w-[220px] flex items-center px-6 py-4 text-xl font-medium text-[#5E5151]">
                  {row.date}
                </div>
                <div className="w-[140px] flex items-center justify-center px-6 py-4">
                  <button className="px-10 py-2.5 bg-[#999999] rounded-2xl text-xl font-bold text-[#190B02] hover:bg-[#888] transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
        <span className="text-2xl font-bold text-[#190B02] font-poppins">
          Menampilkan {data.length} dari {total} Dana Masuk
        </span>

        <div className="flex gap-4">
          <button className="w-14 h-11 flex items-center justify-center rounded-2xl border-2 border-[#3F5210] bg-[#3F5210] text-[#FDF5E3] font-bold text-2xl shadow-md">
            1
          </button>
          <button className="w-14 h-11 flex items-center justify-center rounded-2xl border-2 border-[#3F5210] bg-[#ECEEE7] text-[#3F5210] font-bold text-2xl hover:bg-white transition-all shadow-sm">
            2
          </button>
          <button className="w-14 h-11 flex items-center justify-center rounded-2xl border-2 border-[#3F5210] bg-[#ECEEE7] text-[#3F5210] hover:bg-white transition-all shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}