'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  getCurrentUser, 
  getMyReports, 
  updateProfilePicture, 
  updateProfile, 
  REPORT_STATUS_LABEL 
} from '@/lib/api';
import type { User, ReportListItem, ReportStatus } from '@/types';
import toast from 'react-hot-toast';

// Pemetaan warna badge status laporan premium
const statusColor: Record<ReportStatus, string> = {
  diproses: '#9F490E',
  diterima: '#E3AB55',
  selesai:  '#3F5210',
};

const laporanColumns = ['ID', 'Nama Jalan', 'Tanggal Laporan', 'Status'];

import HeaderAdmin from '@/components/admin/dashboard/HeaderAdmin';

export default function AdminProfilPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoadingUser(true);
      const userRes = await getCurrentUser();
      setUser(userRes.data);
      setProfilePicture(userRes.data.profilePictureUrl ?? null);
      setFormData({
        name: userRes.data.name,
        username: userRes.data.username,
        email: userRes.data.email,
        phoneNumber: userRes.data.phoneNumber,
      });

      setLoadingReports(true);
      const reportsRes = await getMyReports();
      setReports(reportsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUser(false);
      setLoadingReports(false);
    }
  }

  async function handleSimpan() {
    setSaving(true);
    try {
      await updateProfile({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone_number: formData.phoneNumber,
      });
      toast.success("Profil berhasil diperbarui!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal memperbarui profil';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await updateProfilePicture(file);
      setProfilePicture(res.data.profilePictureUrl);
      toast.success("Foto profil berhasil diperbarui!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal mengunggah foto';
      toast.error(msg);
    }
  }

  const laporanColumns = ['ID', 'Judul Laporan', 'Tanggal Laporan', 'Status'];

  if (loadingUser) {
    return (
      <div className="flex flex-col gap-6 pb-12 overflow-hidden h-screen">
        <HeaderAdmin />
        <div className="flex items-center justify-center flex-1">
          <span className="text-xl font-bold animate-pulse text-[#3F5210]">Memuat data profil...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-12 overflow-hidden">
      <HeaderAdmin />

      <div className="flex flex-col gap-6 px-4 md:px-8">
        
        {/* Profile Card Section */}
        <div className="w-full bg-[#E6E5D9] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-10 shadow-sm border border-[#3F5210]/10">
          
          {/* Foto Profil Area */}
          <div className="flex flex-col items-center gap-6 justify-center">
            <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
              <div className="w-full h-full rounded-full border-4 border-[#3F5210]/20 overflow-hidden relative bg-[#FDF5E3]">
                {profilePicture ? (
                  <Image src={profilePicture} alt="Profile Picture" fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-[#3F5210]/30 bg-[#FDF5E3]">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
              <label className="absolute bottom-2 right-2 bg-[#3F5210] hover:bg-[#2F3E0C] p-3 rounded-full shadow-lg cursor-pointer transition-transform active:scale-90 group border-[3px] border-[#E6E5D9]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FDF5E3" strokeWidth="2.5">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-xl font-bold font-poppins text-[#190B02]">{user?.name || "Admin"}</span>
              <span className="text-sm font-semibold text-[#5E5151]">Administrator</span>
            </div>
          </div>

          <div className="hidden md:block w-px bg-[#3F5210]/20" />

          {/* Form Area */}
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-[#190B02] font-poppins mb-2">Informasi Profil</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#3F5210] font-bold text-sm">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FDF5E3] border border-[#3F5210]/20 rounded-xl px-4 py-3 text-[#190B02] text-sm focus:outline-none focus:border-[#3F5210] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#3F5210] font-bold text-sm">Nama Pengguna</label>
                <input 
                  type="text" 
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-[#FDF5E3] border border-[#3F5210]/20 rounded-xl px-4 py-3 text-[#190B02] text-sm focus:outline-none focus:border-[#3F5210] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#3F5210] font-bold text-sm">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FDF5E3] border border-[#3F5210]/20 rounded-xl px-4 py-3 text-[#190B02] text-sm focus:outline-none focus:border-[#3F5210] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#3F5210] font-bold text-sm">No. Telepon</label>
                <input 
                  type="tel" 
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full bg-[#FDF5E3] border border-[#3F5210]/20 rounded-xl px-4 py-3 text-[#190B02] text-sm focus:outline-none focus:border-[#3F5210] transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4 justify-end">
              <button 
                onClick={() => fetchData()}
                className="bg-[#ECEEE7] hover:bg-white text-[#3F5210] border border-[#3F5210] font-bold text-sm px-6 py-2.5 rounded-xl transition-transform active:scale-[0.98]"
              >
                Batal
              </button>
              <button 
                onClick={handleSimpan}
                disabled={saving}
                className="bg-[#3F5210] hover:bg-[#2F3E0C] text-[#FDF5E3] font-bold text-sm px-8 py-2.5 rounded-xl shadow-md transition-transform active:scale-[0.98] disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>

        {/* Riwayat Laporan Table Section */}
        <div className="w-full bg-[#E6E5D9] rounded-2xl p-4 md:p-6 flex flex-col gap-5 shadow-sm border border-[#3F5210]/10">
          <h2 className="text-lg md:text-xl font-bold text-[#190B02] font-poppins">
            Riwayat Laporan Anda
          </h2>

          <div className="w-full overflow-x-auto rounded-xl border border-[#3F5210]/10 shadow-sm">
            <table className="w-full min-w-[700px] border-collapse">
              <thead className="bg-[#3F5210] text-[#FDF5E3] font-poppins text-xs font-bold">
                <tr>
                  {laporanColumns.map((col) => (
                    <th
                      key={col}
                      className={`px-4 py-4 text-left border-r border-[#ECEEE7]/10 last:border-0
                        ${col === 'ID'              ? 'w-[70px] text-center' : ''}
                        ${col === 'Judul Laporan'   ? ''                   : ''}
                        ${col === 'Tanggal Laporan' ? 'w-[150px]'          : ''}
                        ${col === 'Status'          ? 'w-[120px] text-center' : ''}
                      `}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-[#FDF5E3]">
                {loadingReports ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-sm font-poppins font-bold text-[#3F5210]">
                      Memuat riwayat...
                    </td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-sm font-poppins font-bold text-[#3F5210]">
                      Belum ada riwayat laporan.
                    </td>
                  </tr>
                ) : (
                  reports.map((row, index) => (
                    <tr key={row.id} className="border-b border-[#3F5210]/10 last:border-0 hover:bg-[#F2EEDA] transition-colors font-poppins text-xs">
                      <td className="px-4 py-4 font-bold text-[#5E5151] text-center">
                        #{String(index + 1).padStart(3, '0')}
                      </td>
                      <td className="px-4 py-4 font-bold text-[#190B02]">
                        {row.title}
                      </td>
                      <td className="px-4 py-4 font-medium text-[#5E5151]">
                        {new Date(row.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div
                          className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[#FDF5E3] font-bold w-full"
                          style={{ backgroundColor: statusColor[row.status] || '#A0A0A0' }}
                        >
                          {REPORT_STATUS_LABEL[row.status] || row.status}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}