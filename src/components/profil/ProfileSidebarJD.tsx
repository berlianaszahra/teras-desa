'use client';

import { useState } from 'react';
import Image from 'next/image';
import { updateProfile, updateProfilePicture } from '@/lib/api';
import type { User } from '@/types';
import toast from 'react-hot-toast';

interface ProfileSidebarJDProps {
  user: User;
  isEditing: boolean;
  onEditToggle: () => void;
  onUpdate: () => Promise<void>;
}

export default function ProfileSidebarJD({ 
  user, 
  isEditing, 
  onEditToggle, 
  onUpdate 
}: ProfileSidebarJDProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone_number: formData.phoneNumber,
      });
      toast.success('Profil berhasil diperbarui!');
      await onUpdate();
      onEditToggle();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await updateProfilePicture(file);
      toast.success('Foto profil diperbarui!');
      await onUpdate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal upload foto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div 
      className="w-full lg:w-[400px] xl:w-[480px] min-h-screen p-8 md:p-12 lg:p-16 flex flex-col items-center gap-10 lg:sticky lg:top-0"
      style={{
        background: 'linear-gradient(180deg, #A6A488 0%, #3F5210 100%)',
      }}
    >
      <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-white/20 shadow-xl group">
        <Image 
          src={user.profilePictureUrl || '/images/default-avatar.png'} 
          alt={user.name} 
          fill 
          className="object-cover"
        />
        {isEditing && (
          <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-white text-sm font-semibold mt-1">Ubah Foto</span>
            <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
          </label>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#FDF5E3] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="flex flex-col gap-8 w-full text-white">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight">
              {user.name}
            </h1>
            <p className="text-lg md:text-xl opacity-80">@{user.username}</p>
          </div>

          <div className="flex flex-col gap-4 text-base md:text-lg opacity-90">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>{user.phoneNumber}</span>
            </div>
          </div>

          <button 
            onClick={onEditToggle}
            className="w-full py-4 mt-4 bg-[#FDF5E3] text-[#3F5210] rounded-xl text-xl font-bold shadow-lg hover:bg-white transition-colors"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full text-[#FDF5E3]">
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-semibold">Nama Lengkap</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-4 bg-transparent border border-[#FDF5E3]/40 rounded-xl focus:outline-none focus:border-[#FDF5E3] placeholder-[#FDF5E3]/60 transition-colors"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-semibold">Nama Pengguna</label>
            <input 
              type="text" 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full p-4 bg-transparent border border-[#FDF5E3]/40 rounded-xl focus:outline-none focus:border-[#FDF5E3] placeholder-[#FDF5E3]/60 transition-colors"
              placeholder="Masukkan username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-semibold">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-4 bg-transparent border border-[#FDF5E3]/40 rounded-xl focus:outline-none focus:border-[#FDF5E3] placeholder-[#FDF5E3]/60 transition-colors"
              placeholder="Masukkan email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-semibold">No. Telepon</label>
            <input 
              type="text" 
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              className="w-full p-4 bg-transparent border border-[#FDF5E3]/40 rounded-xl focus:outline-none focus:border-[#FDF5E3] placeholder-[#FDF5E3]/60 transition-colors"
              placeholder="Masukkan no telepon"
            />
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="w-full py-4 bg-[#FDF5E3] text-[#3F5210] rounded-xl text-xl font-bold shadow-lg hover:bg-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button 
              onClick={onEditToggle}
              className="w-full py-4 bg-transparent border-2 border-[#FDF5E3] text-[#FDF5E3] rounded-xl text-xl font-bold hover:bg-[#FDF5E3]/10 transition-colors"
            >
              Batalkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
