'use client';

import { useState } from "react";

// =====================
// TIPE & DATA
// =====================

type StatusType = "Diproses" | "Diterima" | "Selesai";

interface UserProfile {
  namaLengkap: string;
  username: string;
  email: string;
  noTelepon: string;
}

interface LaporanItem {
  id: string;
  namaJalan: string;
  tanggal: string;
  status: StatusType;
}

const defaultProfile: UserProfile = {
  namaLengkap: "Nazli Nazhifah",
  username:    "@ramyeonhee",
  email:       "nazlinazhifah@gmail.com",
  noTelepon:   "08134567847378",
};

const dummyLaporan: LaporanItem[] = [
  { id: "#001", namaJalan: "Kerusakan Jalan Utama",   tanggal: "24 Maret 2026", status: "Selesai"  },
  { id: "#002", namaJalan: "Lampu Jalan Mati",         tanggal: "23 Maret 2026", status: "Diproses" },
  { id: "#003", namaJalan: "Saluran Air Tersumbat",    tanggal: "12 Maret 2026", status: "Diterima" },
  { id: "#004", namaJalan: "Fasilitas Posyandu Rusak", tanggal: "10 Maret 2026", status: "Diproses" },
];

const statusColor: Record<StatusType, string> = {
  Diproses: "#E3AB55",
  Diterima: "#9F490E",
  Selesai:  "#3F5210",
};

const laporanColumns = ["ID", "Nama Jalan", "Tanggal Laporan", "Status"];

const formFields: { label: string; field: keyof UserProfile; type: string; placeholder: string }[] = [
  { label: "Nama Lengkap", field: "namaLengkap", type: "text",  placeholder: "Masukkan nama lengkap" },
  { label: "Username",     field: "username",    type: "text",  placeholder: "Masukkan username"     },
  { label: "Email",        field: "email",       type: "email", placeholder: "Masukkan email"        },
  { label: "No. Telepon",  field: "noTelepon",   type: "tel",   placeholder: "Masukkan no. telepon"  },
];

// =====================
// SIDEBAR: VIEW PROFIL
// =====================

function ProfilCard({ profile, onEdit }: { profile: UserProfile; onEdit: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[90px] h-[90px] rounded-full bg-[#5E5151] flex items-center justify-center overflow-hidden">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="20" r="10" fill="#aaa" />
          <path d="M5 45c0-10 9-18 20-18s20 8 20 18" stroke="#aaa" strokeWidth="2" fill="none" />
        </svg>
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

// =====================
// SIDEBAR: FORM EDIT
// =====================

function EditProfilForm({
  profile,
  onSimpan,
  onBatalkan,
}: {
  profile: UserProfile;
  onSimpan: (p: UserProfile) => void;
  onBatalkan: () => void;
}) {
  const [form, setForm] = useState<UserProfile>(profile);
  const [saved, setSaved] = useState(false);

  function handleChange(field: keyof UserProfile, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSimpan() {
    // TODO: await fetch('/api/profile', { method: 'PATCH', body: JSON.stringify(form) })
    onSimpan(form);
    setSaved(true);
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Avatar + ganti foto */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-[90px] h-[90px]">
          <div className="w-[90px] h-[90px] rounded-full bg-[#5E5151] flex items-center justify-center overflow-hidden">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <circle cx="25" cy="20" r="10" fill="#aaa" />
              <path d="M5 45c0-10 9-18 20-18s20 8 20 18" stroke="#aaa" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <label className="absolute bottom-0 right-0 bg-[#3F5210] rounded-full w-[26px] h-[26px] flex items-center justify-center border-2 border-[#E6E5D9] hover:bg-[#2e3d0c] transition-colors cursor-pointer">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 10l1.5-4L9 0.5 12.5 4 7 9.5 3 11z" stroke="#fff" strokeWidth="1.2" fill="none" />
              <circle cx="9" cy="4" r="1" fill="#fff" />
            </svg>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
        <span className="text-sm font-semibold text-[#5E5151]">Ganti Foto Profil</span>
      </div>

      {/* Input fields */}
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

// =====================
// RIWAYAT LAPORAN
// =====================

function RiwayatLaporan() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Riwayat Laporan</h2>
      <div className="w-full rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="flex flex-row">
          {laporanColumns.map((col) => (
            <div
              key={col}
              className={`flex items-center justify-center px-4 py-3 bg-[#3F5210] border-b border-[#190B02] text-base font-semibold text-[#FDF5E3]
                ${col === "ID"               ? "w-[80px]"  : ""}
                ${col === "Nama Jalan"       ? "flex-1"    : ""}
                ${col === "Tanggal Laporan"  ? "w-[166px]" : ""}
                ${col === "Status"           ? "w-[120px]" : ""}
              `}
            >
              {col}
            </div>
          ))}
        </div>
        {dummyLaporan.map((row) => (
          <div key={row.id} className="flex flex-row border-b border-[#190B02] last:border-b-0 bg-[#FDF5E3]">
            <div className="w-[80px] flex items-center justify-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.id}</span>
            </div>
            <div className="flex-1 flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.namaJalan}</span>
            </div>
            <div className="w-[166px] flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.tanggal}</span>
            </div>
            <div className="w-[120px] flex items-center justify-center px-4 py-4">
              <span
                className="px-3 py-1 rounded-lg text-sm font-semibold text-[#FDF5E3]"
                style={{ background: statusColor[row.status] }}
              >
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================
// RIWAYAT KOMENTAR
// =====================

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

// =====================
// PAGE UTAMA
// app/admin/profil/page.tsx
// =====================

export default function AdminProfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  function handleSimpan(updatedProfile: UserProfile) {
    setProfile(updatedProfile);
    setIsEditing(false);
  }

  return (
    <div className="w-full bg-[#E6E5D9] rounded-[30px] p-6 flex flex-row gap-6 items-start">

      {/* KIRI: toggle antara view dan edit */}
      <div className="w-[280px] flex-shrink-0">
        {isEditing ? (
          <EditProfilForm
            profile={profile}
            onSimpan={handleSimpan}
            onBatalkan={() => setIsEditing(false)}
          />
        ) : (
          <ProfilCard
            profile={profile}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </div>

      {/* KANAN: riwayat selalu tampil */}
      <div className="flex-1 flex flex-col gap-6">
        <RiwayatLaporan />
        <RiwayatKomentar />
      </div>

    </div>
  );
}