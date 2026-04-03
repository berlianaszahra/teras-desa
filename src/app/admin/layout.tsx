'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import SidebarAdmin from '@/components/admin/dashboard/SidebarAdmin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isProfilePage = pathname === '/admin/profil';

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace('/masuk');
      return;
    }

    if (!isAdmin) {
      router.replace('/unauthorized');
      return;
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F1E9]">
        <span className="text-xl text-[#3F5210] font-bold animate-pulse">Memverifikasi akses...</span>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#F5F1E9] font-poppins text-[#190B02] selection:bg-[#3F5210] selection:text-white">
      {!isProfilePage && (
        <div className="flex-shrink-0">
          <SidebarAdmin />
        </div>
      )}
      <main className={`flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden ${isProfilePage ? 'p-0' : ''}`}>
        {children}
      </main>
    </div>
  );
}