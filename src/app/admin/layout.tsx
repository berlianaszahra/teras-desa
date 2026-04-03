'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import SidebarAdmin from '@/components/admin/dashboard/SidebarAdmin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Belum login → redirect ke halaman masuk
    if (!isAuthenticated) {
      router.replace('/masuk');
      return;
    }

    // Bukan admin → redirect ke halaman 403
    if (!isAdmin) {
      router.replace('/unauthorized');
      return;
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  // Tampilkan loading saat cek autentikasi
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F1E9]">
        <span className="text-lg text-[#3F5210] font-semibold">Memverifikasi akses...</span>
      </div>
    );
  }

  // Jangan render konten admin jika bukan admin
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F1E9' }}>
      <SidebarAdmin />
      <main style={{ flex: 1, padding: '24px', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}