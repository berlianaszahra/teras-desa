"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/admin/editprofil/pageShell";
import ReportHistoryTable from "@/components/admin/editprofil/ReportHistory";
import { ProfileData, ReportRow } from "@/components/admin/editprofil/types";

// ── mock data ────────────────────────────────────────────────────────────────
const INITIAL_PROFILE: ProfileData = {
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

type FieldKey = Exclude<keyof ProfileData, "avatar">;

const FIELDS: {
  key: FieldKey;
  label: string;
  placeholder: string;
  type?: string;
}[] = [
  { key: "name",     label: "Nama Lengkap", placeholder: "Masukkan nama lengkap", type: "text"  },
  { key: "username", label: "Username",     placeholder: "Masukkan Username",      type: "text"  },
  { key: "email",    label: "Email",        placeholder: "Masukkan Email",         type: "email" },
  { key: "phone",    label: "No. Telepon",  placeholder: "Masukkan No. Telepon",   type: "tel"   },
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

export default function EditProfilePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm]           = useState<ProfileData>(INITIAL_PROFILE);
  const [avatarPreview, setPreview] = useState("");
  const [errors, setErrors]       = useState<Partial<Record<FieldKey, string>>>({});
  const [isSaving, setIsSaving]   = useState(false);
  const [saved, setSaved]         = useState(false);

  const validate = () => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!form.name.trim())     e.name     = "Wajib diisi";
    if (!form.username.trim()) e.username = "Wajib diisi";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email tidak valid";
    if (!form.phone.trim())    e.phone    = "Wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key: FieldKey, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    setSaved(true);
    // TODO: kirim ke API — await updateProfile(form)
    setTimeout(() => router.push("/admin/profile"), 1100);
  };

  const displayAvatar = avatarPreview || form.avatar;

  return (
    <PageShell>
      <style>{`
        /* sidebar */
        .ep-sidebar-label {
          position: absolute;
          left: 77px; top: 228px;
          font-family: 'Poppins', sans-serif;
          font-weight: 700; font-size: 20px; line-height: 30px;
          color: #FFFFFF;
        }

        .ep-sidebar-content {
          position: absolute;
          left: 87px; top: 289px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 32px;
          width: 300px;
        }

        /* avatar wrapper */
        .ep-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .ep-cam-btn {
          position: absolute;
          bottom: 8px; right: 8px;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #3F5210;
          border: 3px solid #2B3537;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.18s, transform 0.15s;
        }
        .ep-cam-btn:hover  { background: #2F3E0C; transform: scale(1.08); }

        /* preview name */
        .ep-preview-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 700; font-size: 28px; line-height: 120%;
          letter-spacing: 0.5px; color: #ECEEE7;
        }

        .ep-preview-sub {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 16px; line-height: 120%;
          letter-spacing: 0.3px; color: #C3C9B5;
          word-break: break-all;
        }

        /* form fields */
        .ep-field { display: flex; flex-direction: column; gap: 6px; }

        .ep-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 20px; line-height: 120%;
          letter-spacing: 0.5px; color: #ECEEE7;
        }

        .ep-input-wrap {
          box-sizing: border-box;
          width: 276px; height: 56px;
          border: 2px solid #ECEEE7;
          border-radius: 10px;
          display: flex; align-items: center;
          background: transparent;
        }
        .ep-input-wrap.error { border-color: #FF8A80; }

        .ep-input {
          width: 100%; height: 100%;
          background: transparent; border: none; outline: none;
          padding: 0 18px;
          font-family: 'Poppins', sans-serif;
          font-weight: 300; font-size: 16px;
          letter-spacing: 0.5px; color: #FFFFFF;
          box-sizing: border-box;
        }
        .ep-input::placeholder { color: rgba(255,255,255,0.5); }

        .ep-err {
          font-size: 12px; color: #FF8A80;
          font-family: 'Poppins', sans-serif;
        }

        /* buttons */
        .ep-btn-simpan {
          box-sizing: border-box;
          display: flex; justify-content: center; align-items: center;
          gap: 8px; padding: 8px;
          width: 276px; height: 56px;
          background: #ECEEE7;
          border: 1px solid #ECEEE7;
          border-radius: 16px;
          cursor: pointer;
          transition: opacity 0.18s, transform 0.12s;
        }
        .ep-btn-simpan:hover:not(:disabled) { opacity: 0.88; }
        .ep-btn-simpan:active:not(:disabled) { transform: scale(0.97); }
        .ep-btn-simpan:disabled { cursor: not-allowed; }

        .ep-btn-simpan span {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 24px; line-height: 100%;
          color: #252525;
        }

        .ep-btn-batalkan {
          box-sizing: border-box;
          display: flex; justify-content: center; align-items: center;
          gap: 8px; padding: 8px;
          width: 276px; height: 56px;
          background: transparent;
          border: 2px solid #ECEEE7;
          border-radius: 16px;
          cursor: pointer;
          transition: background 0.18s, transform 0.12s;
        }
        .ep-btn-batalkan:hover { background: rgba(236,238,231,0.08); }
        .ep-btn-batalkan:active { transform: scale(0.97); }

        .ep-btn-batalkan span {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 24px; line-height: 100%;
          color: #ECEEE7;
        }

        /* spinner */
        .ep-spin {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(37,37,37,0.25);
          border-top-color: #252525;
          border-radius: 50%;
          animation: ep-spin 0.65s linear infinite;
        }
        @keyframes ep-spin { to { transform: rotate(360deg); } }

        /* main content */
        .ep-content {
          position: absolute;
          left: 527px; top: 280px;
          width: 843px;
          padding-bottom: 420px;
        }

        .ep-section-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700; font-size: 48px; line-height: 120%;
          letter-spacing: 2px; color: #190B02;
          margin: 0 0 24px 0;
        }

        .ep-section-gap { margin-top: 48px; }
      `}</style>

      {/* ── Sidebar label ── */}
      <span className="ep-sidebar-label">Pengaturan</span>

      {/* ── Sidebar content ── */}
      <div className="ep-sidebar-content">

        {/* Avatar + camera button */}
        <div className="ep-avatar-wrap">
          <AvatarCircle name={form.name} avatar={displayAvatar} />
          <button className="ep-cam-btn" onClick={() => fileRef.current?.click()} title="Ganti foto">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none"
              stroke="#ECEEE7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="14" height="10" rx="2"/>
              <circle cx="8" cy="9" r="2.5"/>
              <path d="M6 4l1-2h2l1 2"/>
            </svg>
          </button>
          <input ref={fileRef} type="file" accept="image/*"
            style={{ display: "none" }} onChange={handleAvatar} />
        </div>

        {/* Live preview name + username */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="ep-preview-name">{form.name || "Nama Lengkap"}</span>
          <span className="ep-preview-sub">{form.username || "@username"}</span>
          <span className="ep-preview-sub">{form.email}</span>
          <span className="ep-preview-sub">{form.phone}</span>
        </div>

        {/* Form fields — Frame 345 */}
        {FIELDS.map((f) => (
          <div key={f.key} className="ep-field">
            <label className="ep-label">{f.label}</label>
            <div className={`ep-input-wrap${errors[f.key] ? " error" : ""}`}>
              <input
                className="ep-input"
                type={f.type || "text"}
                value={form[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => handleChange(f.key, e.target.value)}
              />
            </div>
            {errors[f.key] && <span className="ep-err">{errors[f.key]}</span>}
          </div>
        ))}

        {/* Buttons — Frame 344 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 276 }}>
          <button
            className="ep-btn-simpan"
            onClick={handleSave}
            disabled={isSaving || saved}
            style={{ background: saved ? "#AEC72F" : "#ECEEE7" }}
          >
            {isSaving && <span className="ep-spin" />}
            {saved && (
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"
                stroke="#252525" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,8 6,12 14,4"/>
              </svg>
            )}
            <span>{isSaving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan"}</span>
          </button>

          <button
            className="ep-btn-batalkan"
            onClick={() => router.push("/admin/profile")}
            disabled={isSaving}
          >
            <span>Batalkan</span>
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="ep-content">
        <h2 className="ep-section-title">Riwayat Laporan</h2>
        <ReportHistoryTable rows={REPORTS} />

        <div className="ep-section-gap">
          <h2 className="ep-section-title">Riwayat Komentar</h2>
          {/* TODO: ganti dengan data komentar dari API */}
          <div style={{
            width: 843, padding: "24px",
            background: "#FDF5E3",
            borderRadius: 15,
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16, color: "#5E5151",
            border: "1px solid #D4CFC0",
          }}>
            Belum ada komentar.
          </div>
        </div>
      </div>
    </PageShell>
  );
}