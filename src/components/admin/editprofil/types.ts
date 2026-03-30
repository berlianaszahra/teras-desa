export interface ProfileData {
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
}
 
export type ReportStatus = "Selesai" | "Diproses" | "Menunggu";
 
export interface ReportRow {
  id: string;
  namaJalan: string;
  tanggal: string;
  status: ReportStatus;
}
 
export const STATUS_STYLE: Record<ReportStatus, { bg: string; color: string }> = {
  Selesai:  { bg: "#E2E5DB", color: "#2F3E0C" },
  Diproses: { bg: "#FFF3CD", color: "#7B5800" },
  Menunggu: { bg: "#FCE8E8", color: "#8B1A1A" },
};
 