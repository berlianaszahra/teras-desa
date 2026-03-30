import SidebarAdmin from "@/components/admin/dashboard/SidebarAdmin";
 
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F5F1E9] font-[Poppins]">
      <SidebarAdmin />
      {/* Konten utama — offset dari sidebar */}
      <main className="ml-[285px] flex-1">
        {children}
      </main>
    </div>
  );
}