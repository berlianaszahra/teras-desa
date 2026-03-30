"use client";
 
import Link from "next/link";
import PageShell from "@/components/admin/editprofil/pageShell";
import ReportHistoryTable from "@/components/admin/editprofil/ReportHistory";
import { ReportRow } from "@/components/admin/editprofil/types";
 
// ── mock data (ganti dengan fetch dari API) ──────────────────────────────────
const PROFILE = {
  name: "Nazli Nazhifah",
  username: "@ramyeonhee",
  email: "nazlinazhifah@gmail.com",
  phone: "08134567847378",
  avatar: "",
};
 
const REPORTS: ReportRow[] = [
  { id: "#001", namaJalan: "Kerusakan Jalan Utama",   tanggal: "24 Maret 2026", status: "Selesai"  },
  { id: "#002", namaJalan: "Lampu Jalan Mati",         tanggal: "23 Maret 2026", status: "Selesai"  },
  { id: "#003", namaJalan: "Saluran Air Tersumbat",    tanggal: "12 Maret 2026", status: "Selesai"  },
  { id: "#004", namaJalan: "Fasilitas Posyandu Rusak", tanggal: "10 Maret 2026", status: "Selesai"  },
];
 
function AvatarCircle({ name, avatar }: { name: string; avatar: string }) {
  if (avatar) {
    return (
      <img src={avatar} alt={name} style={{
        width: 300, height: 300, borderRadius: "50%", objectFit: "cover", display: "block",
      }} />
    );
  }
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
  return (
    <div style={{
      width: 300, height: 300, borderRadius: "50%",
      background: "linear-gradient(135deg, #AEC72F 0%, #556117 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 80, fontWeight: 700, color: "#ECEEE7",
      fontFamily: "'Poppins', sans-serif",
    }}>
      {initials || "NN"}
    </div>
  );
}
 
export default function ProfilePage() {
  return (
    <PageShell>
      <style>{`
        /* sidebar label */
        .profile-sidebar-label {
          position: absolute;
          left: 77px; top: 228px;
          font-family: 'Poppins', sans-serif;
          font-weight: 700; font-size: 20px; line-height: 30px;
          color: #FFFFFF;
        }
 
        /* Frame 348 sidebar content */
        .profile-sidebar-content {
          position: absolute;
          left: 87px; top: 289px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 48px;
          width: 300px;
        }
 
        /* info text block */
        .profile-info-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          width: 280px;
        }
 
        .profile-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 700; font-size: 36px; line-height: 120%;
          letter-spacing: 0.5px; color: #ECEEE7;
        }
 
        .profile-info-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 20px; line-height: 120%;
          letter-spacing: 0.5px; color: #ECEEE7;
          word-break: break-all;
        }
 
        /* Edit Profile button */
        .profile-edit-btn {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 8px; gap: 8px;
          width: 300px; height: 56px;
          background: #ECEEE7;
          border: 1px solid #ECEEE7;
          border-radius: 16px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.18s, transform 0.12s;
        }
        .profile-edit-btn:hover  { background: #E2E5DB; }
        .profile-edit-btn:active { transform: scale(0.97); }
 
        .profile-edit-btn span {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 24px; line-height: 100%;
          color: #252525;
          white-space: nowrap;
        }
 
        /* content area */
        .profile-content {
          position: absolute;
          left: 527px; top: 280px;
          width: 843px;
          padding-bottom: 420px;
        }
 
        .profile-section-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700; font-size: 48px; line-height: 120%;
          letter-spacing: 2px; color: #190B02;
          margin: 0 0 24px 0;
        }
      `}</style>
 
      {/* ── Sidebar label ── */}
      <span className="profile-sidebar-label">Pengaturan</span>
 
      {/* ── Sidebar content (Frame 348) ── */}
      <div className="profile-sidebar-content">
        <AvatarCircle name={PROFILE.name} avatar={PROFILE.avatar} />
 
        <div className="profile-info-block">
          <span className="profile-name">{PROFILE.name}</span>
          <span className="profile-info-text">{PROFILE.username}</span>
          <span className="profile-info-text">{PROFILE.email}</span>
          <span className="profile-info-text">{PROFILE.phone}</span>
        </div>
 
        <Link href="/admin/editprofile" className="profile-edit-btn">
          <span>Edit Profile</span>
        </Link>
      </div>
 
      {/* ── Main content ── */}
      <div className="profile-content">
        <h2 className="profile-section-title">Riwayat Laporan</h2>
        <ReportHistoryTable rows={REPORTS} />
      </div>
    </PageShell>
  );
}
 