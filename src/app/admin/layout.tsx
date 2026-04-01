"use client";

import SidebarAdmin from "@/components/admin/dashboard/SidebarAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F1E9" }}>
      <SidebarAdmin />
      <main style={{ flex: 1, padding: "24px", overflowX: "hidden" }}>
        {children}
      </main>
    </div>
  );
}