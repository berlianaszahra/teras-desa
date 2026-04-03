'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, getMyReports, updateProfilePicture, REPORT_STATUS_LABEL } from '@/lib/api';
import type { User, ReportListItem, ReportStatus } from '@/types';
import Image from 'next/image';

// Pemetaan warna badge status laporan
const statusColor: Record<ReportStatus, string> = {
  diproses: '#E3AB55',
  diterima: '#9F490E',
  selesai:  '#3F5210',
};

// Struktur form lokal untuk profil
interface UserProfile {
  namaLengkap: string;
  username: string;
  email: string;
  noTelepon: string;
}

const formFields: { label: string; field: keyof UserProfile; type: string; placeholder: string }[] = [
  { label: 'Nama Lengkap', field: 'namaLengkap', type: 'text',  placeholder: 'Masukkan nama lengkap' },
  { label: 'Username',     field: 'username',    type: 'text',  placeholder: 'Masukkan username'     },
  { label: 'Email',        field: 'email',       type: 'email', placeholder: 'Masukkan email'        },
  { label: 'No. Telepon',  field: 'noTelepon',   type: 'tel',   placeholder: 'Masukkan no. telepon'  },
];

const laporanColumns = ['ID', 'Judul Laporan', 'Tanggal Laporan', 'Status'];

function mapUserToProfile(user: User): UserProfile {
  return {
    namaLengkap: user.name,
    username: user.username,
    email: user.email,
    noTelepon: user.phoneNumber,
  };
}

// Komponen tampilan profil (mode view)
function ProfilCard({
  profile,
  profilePicture,
  onEdit,
}: {
  profile: UserProfile;
  profilePicture: string | null;
  onEdit: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[90px] h-[90px] rounded-full bg-[#5E5151] flex items-center justify-center overflow-hidden relative">
        {profilePicture ? (
          <Image src={profilePicture} alt="Foto profil" fill className="object-cover rounded-full" unoptimized />
        ) : (
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="20" r="10" fill="#aaa" />
            <path d="M5 45c0-10 9-18 20-18s20 8 20 18" stroke="#aaa" strokeWidth="2" fill="none" />
          </svg>
        )}
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-xl font-semibold text-[#190B02]">{profile.namaLengkap}</span>
        <span className="text-base font-semibold text-[#5E5151]">{profile.username}</span>
        <span className="text-base font-semibold text-[#5E5151]">{profile.email}</span>
        <span className="text-base font-semibold text-[#5E5151]">{profile.noTelepon}</span>
      </div>
      <button
        onClick={onEdit}
        className="w-full py-2 text-center bg-[#FDF5E3] border border-[#190B02] rounded-[10px] text-base font-semibold text-[#190B02] hover:bg-[#e8e0cc] transition-colors"
      >
        Edit Profile
      </button>
    </div>
  );
}

// Komponen form edit profil (mode edit)
function EditProfilForm({
  profile,
  profilePicture,
  onSimpan,
  onBatalkan,
  onPhotoChange,
}: {
  profile: UserProfile;
  profilePicture: string | null;
  onSimpan: (p: UserProfile) => void;
  onBatalkan: () => void;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [form, setForm] = useState<UserProfile>(profile);
  const [saved, setSaved] = useState(false);

  function handleChange(field: keyof UserProfile, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSimpan() {
    // TODO: Hubungkan dengan endpoint update profil saat tersedia
    onSimpan(form);
    setSaved(true);
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-[90px] h-[90px]">
          <div className="w-[90px] h-[90px] rounded-full bg-[#5E5151] flex items-center justify-center overflow-hidden">
            {profilePicture ? (
              <Image src={profilePicture} alt="Foto profil" fill className="object-cover rounded-full" unoptimized />
            ) : (
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="20" r="10" fill="#aaa" />
                <path d="M5 45c0-10 9-18 20-18s20 8 20 18" stroke="#aaa" strokeWidth="2" fill="none" />
              </svg>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-[#3F5210] rounded-full w-[26px] h-[26px] flex items-center justify-center border-2 border-[#E6E5D9] hover:bg-[#2e3d0c] transition-colors cursor-pointer">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 10l1.5-4L9 0.5 12.5 4 7 9.5 3 11z" stroke="#fff" strokeWidth="1.2" fill="none" />
              <circle cx="9" cy="4" r="1" fill="#fff" />
            </svg>
            <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
          </label>
        </div>
        <span className="text-sm font-semibold text-[#5E5151]">Ganti Foto Profil</span>
      </div>

      {formFields.map(({ label, field, type, placeholder }) => (
        <div key={field} className="flex flex-col gap-1 w-full">
          <label className="text-sm font-semibold text-[#190B02]">{label}</label>
          <input
            type={type}
            value={form[field]}
            placeholder={placeholder}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-[#190B02] rounded-lg bg-[#FDF5E3] text-sm font-semibold text-[#190B02] outline-none focus:border-[#3F5210] transition-colors"
          />
        </div>
      ))}

      {saved && (
        <div className="w-full px-3 py-2 bg-[#3F5210] rounded-lg text-sm font-semibold text-[#FDF5E3] text-center">
          Profil berhasil disimpan!
        </div>
      )}

      <button
        onClick={handleSimpan}
        className="w-full py-2 bg-[#FDF5E3] border border-[#190B02] rounded-[10px] text-base font-semibold text-[#190B02] hover:bg-[#e8e0cc] transition-colors"
      >
        Simpan
      </button>
      <button
        onClick={onBatalkan}
        className="w-full py-2 bg-[#FDF5E3] border border-[#190B02] rounded-[10px] text-base font-semibold text-[#190B02] hover:bg-[#e8e0cc] transition-colors"
      >
        Batalkan
      </button>
    </div>
  );
}

// Komponen riwayat laporan user
function RiwayatLaporan({ data, loading }: { data: ReportListItem[]; loading: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Riwayat Laporan</h2>
      <div className="w-full rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="flex flex-row">
          {laporanColumns.map((col) => (
            <div
              key={col}
              className={`flex items-center justify-center px-4 py-3 bg-[#3F5210] border-b border-[#190B02] text-base font-semibold text-[#FDF5E3]
                ${col === 'ID'               ? 'w-[80px]'  : ''}
                ${col === 'Judul Laporan'    ? 'flex-1'    : ''}
                ${col === 'Tanggal Laporan'  ? 'w-[166px]' : ''}
                ${col === 'Status'           ? 'w-[120px]' : ''}
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
            <div key={row.id} className="flex flex-row border-b border-[#190B02] last:border-b-0 bg-[#FDF5E3]">
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

// Komponen riwayat komentar (menunggu endpoint backend)
function RiwayatKomentar() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Riwayat Komentar</h2>
      <div className="w-full rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[#FDF5E3]">
        <div className="flex items-center justify-center py-10">
          <span className="text-base font-semibold text-[#5E5151]">Belum ada komentar</span>
        </div>
      </div>
    </div>
  );
}

// Halaman utama profil admin
export default function AdminProfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    namaLengkap: '', username: '', email: '', noTelepon: '',
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setProfile(mapUserToProfile(res.data));
        setProfilePicture(res.data.profilePictureUrl ?? null);
      })
      .catch(() => {})
      .finally(() => setLoadingUser(false));

    getMyReports()
      .then((res) => setReports(res.data))
      .catch(() => {})
      .finally(() => setLoadingReports(false));
  }, []);

  function handleSimpan(updatedProfile: UserProfile) {
    setProfile(updatedProfile);
    setIsEditing(false);
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await updateProfilePicture(file);
      setProfilePicture(res.data.profilePictureUrl);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal mengunggah foto';
      alert(msg);
    }
  }

  if (loadingUser) {
    return (
      <div className="w-full bg-[#E6E5D9] rounded-[30px] p-6 flex justify-center items-center min-h-[300px]">
        <span className="text-[#5E5151]">Memuat profil...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#E6E5D9] rounded-[30px] p-6 flex flex-row gap-6 items-start">

      <div className="w-[280px] flex-shrink-0">
        {isEditing ? (
          <EditProfilForm
            profile={profile}
            profilePicture={profilePicture}
            onSimpan={handleSimpan}
            onBatalkan={() => setIsEditing(false)}
            onPhotoChange={handlePhotoChange}
          />
        ) : (
          <ProfilCard
            profile={profile}
            profilePicture={profilePicture}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <RiwayatLaporan data={reports} loading={loadingReports} />
        <RiwayatKomentar />
      </div>

    </div>
  );
}