'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateProfilePicture } from '@/lib/api';
import type { User } from '@/types';
import Image from 'next/image';

interface UserProfile {
  namaLengkap: string;
  username: string;
  email: string;
  noTelepon: string;
}

const fields: { label: string; field: keyof UserProfile; type: string; placeholder: string }[] = [
  { label: 'Nama Lengkap', field: 'namaLengkap', type: 'text',  placeholder: 'Masukkan nama lengkap' },
  { label: 'Username',     field: 'username',    type: 'text',  placeholder: 'Masukkan username'     },
  { label: 'Email',        field: 'email',       type: 'email', placeholder: 'Masukkan email'        },
  { label: 'No. Telepon',  field: 'noTelepon',   type: 'tel',   placeholder: 'Masukkan no. telepon'  },
];

// Memetakan data User dari API ke bentuk form lokal
function mapUserToProfile(user: User): UserProfile {
  return {
    namaLengkap: user.name,
    username: user.username,
    email: user.email,
    noTelepon: user.phoneNumber,
  };
}

export default function EditProfilForm() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    namaLengkap: '', username: '', email: '', noTelepon: '',
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setProfile(mapUserToProfile(res.data));
        setProfilePicture(res.data.profilePictureUrl ?? null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleChange(field: keyof UserProfile, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSimpan() {
    // TODO: Hubungkan dengan endpoint update profil saat tersedia
    setSaved(true);
  }

  function handleBatalkan() {
    router.push('/profil');
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

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 w-[280px] flex-shrink-0">
        <div className="w-[90px] h-[90px] rounded-full bg-[#C3C9B5] animate-pulse" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-full h-10 bg-[#C3C9B5] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-[280px] flex-shrink-0">

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
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>
        <span className="text-sm font-semibold text-[#5E5151]">Ganti Foto Profil</span>
      </div>

      {fields.map(({ label, field, type, placeholder }) => (
        <div key={field} className="flex flex-col gap-1 w-full">
          <label className="text-sm font-semibold text-[#190B02]">{label}</label>
          <input
            type={type}
            value={profile[field]}
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
        onClick={handleBatalkan}
        className="w-full py-2 bg-[#FDF5E3] border border-[#190B02] rounded-[10px] text-base font-semibold text-[#190B02] hover:bg-[#e8e0cc] transition-colors"
      >
        Batalkan
      </button>
    </div>
  );
}