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

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <span className="text-xl font-bold animate-pulse text-[#3F5210]">Memuat data profil...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F1E9] font-poppins text-[#190B02] relative">
      
      {/* Top Right Admin Label */}
      <div className="absolute top-10 right-14 z-10 hidden md:block">
        <span className="text-3xl font-bold text-[#190B02]">Admin</span>
      </div>

      {/* Sidebar Edit Profile (Green Gradient) */}
      <div className="w-full max-w-[420px] bg-gradient-to-b from-[#5D6B1D] to-[#190B02] p-10 md:p-14 flex flex-col items-start gap-10 shadow-2xl">
        
        {/* Logo TerasDesa Top Left */}
        <div className="flex items-center gap-4 mb-2">
          <Image src="/logo.svg" alt="TerasDesa" width={48} height={48} className="brightness-0 invert" />
          <span className="text-3xl font-bold text-white tracking-tight">TerasDesa</span>
        </div>

        {/* Profile Pic Large */}
        <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px] mx-auto">
          <div className="w-full h-full rounded-full border-4 border-[#F5F1E9]/20 overflow-hidden relative bg-[#E6E5D9]/10">
            {profilePicture ? (
              <Image src={profilePicture} alt="Profile Picture" fill className="object-cover" unoptimized />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white/50 bg-[#3F5210]">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          <label className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-[#F5F1E9] hover:bg-white p-3 rounded-full shadow-lg cursor-pointer transition-transform active:scale-90 group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#190B02" strokeWidth="2.5">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>

        {/* Input Form Sederhana Minimalis */}
        <div className="flex flex-col gap-6 w-full mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-lg">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-lg">Nama Pengguna</label>
            <input 
              type="text" 
              placeholder="Masukkan username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-lg">Email</label>
            <input 
              type="email" 
              placeholder="Masukkan email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-bold text-lg">No. Telepon</label>
            <input 
              type="tel" 
              placeholder="Masukkan no. telepon"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full mt-4">
          <button 
            onClick={handleSimpan}
            disabled={saving}
            className="w-full bg-[#F5F1E9] hover:bg-white text-[#190B02] font-bold text-xl md:text-2xl py-4.5 rounded-[20px] shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          <button 
            onClick={() => fetchData()}
            className="w-full bg-transparent border-2 border-[#F5F1E9] hover:bg-white/5 text-white font-bold text-xl md:text-2xl py-4 rounded-[20px] shadow-sm transition-transform active:scale-[0.98]"
          >
            Batalkan
          </button>
        </div>

      </div>

      {/* Main Content Area (Beige for Riwayat Laporan) */}
      <div className="flex-1 p-10 md:p-20 overflow-y-auto">
        <div className="max-w-[1000px] flex flex-col gap-10">
          <h2 className="text-[48px] md:text-[64px] font-bold text-[#190B02]">
            Riwayat Laporan
          </h2>

          <div className="w-full rounded-[35px] overflow-hidden shadow-xl border border-[#3F5210]/10">
            {/* Table Header */}
            <div className="flex flex-row bg-[#3F5210] h-[80px]">
              {laporanColumns.map((col) => (
                <div
                  key={col}
                  className={`flex items-center px-10 text-xl md:text-2xl font-bold text-white
                    ${col === 'ID'               ? 'w-[120px] justify-center' : ''}
                    ${col === 'Nama Jalan'       ? 'flex-1'                   : ''}
                    ${col === 'Tanggal Laporan'  ? 'w-[260px]'                : ''}
                    ${col === 'Status'           ? 'w-[200px] justify-center' : ''}
                  `}
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="bg-white">
              {loadingReports ? (
                <div className="p-20 text-center text-xl font-bold text-[#3F5210] animate-pulse">
                  Memuat riwayat...
                </div>
              ) : reports.length === 0 ? (
                <div className="p-20 text-center text-xl font-bold text-[#5E5151]">
                  Belum ada riwayat laporan warga.
                </div>
              ) : (
                reports.map((row, index) => (
                  <div key={row.id} className="flex flex-row border-b border-[#3F5210]/10 last:border-b-0 hover:bg-[#FDF5E3] transition-colors min-h-[90px]">
                    <div className="w-[120px] flex items-center justify-center px-10 text-xl font-bold text-[#5E5151]">
                      #{String(index + 1).padStart(3, '0')}
                    </div>
                    <div className="flex-1 flex items-center px-10 text-xl md:text-2xl font-bold text-[#190B02]">
                      {row.title}
                    </div>
                    <div className="w-[260px] flex items-center px-10 text-xl font-medium text-[#5E5151]">
                      {new Date(row.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </div>
                    <div className="w-[200px] flex items-center justify-center px-10">
                      <span
                        className="px-6 py-2 rounded-xl text-lg font-bold text-white shadow-sm uppercase tracking-wide"
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
        </div>
      </div>

    </div>
  );
}