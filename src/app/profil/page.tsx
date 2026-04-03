'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getMyReports } from '@/lib/api';
import type { ReportListItem } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileSidebarJD from '@/components/profil/ProfileSidebarJD';
import RiwayatLaporanContentJD from '@/components/profil/RiwayatLaporanContentJD';

export default function ProfilePage() {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      getMyReports()
        .then((res) => setReports(res.data))
        .catch(() => {})
        .finally(() => setReportsLoading(false));
    }
  }, [user]);

  const handleUpdate = async () => {
    await refreshUser();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F5F1E9] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#3F5210] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/masuk';
    }
    return null;
  }

  return (
    <div className="bg-[#F5F1E9] min-h-screen font-[Poppins]">
      <Navbar />
      
      <main className="flex flex-col lg:flex-row min-h-screen">
        <ProfileSidebarJD 
          user={user} 
          isEditing={isEditing} 
          onEditToggle={() => setIsEditing(!isEditing)} 
          onUpdate={handleUpdate}
        />
        
        <RiwayatLaporanContentJD 
          reports={reports} 
          loading={reportsLoading} 
        />
      </main>

      <Footer />
    </div>
  );
}
