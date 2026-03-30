"use client";

import { ReportRow, ReportStatus, STATUS_STYLE } from "./types";

interface ReportHistoryTableProps {
  rows: ReportRow[];
}

const COL = { id: 95, jalan: 304, tanggal: 278, status: 166 } as const;

function hCell(w: number): React.CSSProperties {
  return {
    boxSizing: "border-box",
    display: "flex", alignItems: "center",
    padding: "12px 24px", gap: 12,
    width: w, minWidth: w, height: 44,
    background: "#3F5210",
    borderBottom: "1px solid #252525",
    flexShrink: 0,
  };
}

function bCell(w: number): React.CSSProperties {
  return {
    boxSizing: "border-box",
    display: "flex", alignItems: "center",
    padding: "12px 24px", gap: 12,
    width: w, minWidth: w, height: 64,
    background: "#FDF5E3",
    borderBottom: "1px solid #252525",
    flexShrink: 0,
  };
}

const hTxt: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600, fontSize: 16,
  lineHeight: "131.8%", color: "#FFFFFF",
  flexGrow: 1, display: "flex", alignItems: "center",
};

const bTxt: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600, fontSize: 16,
  lineHeight: "131.8%", color: "#5E5151",
  flexGrow: 1,
};

export default function ReportHistoryTable({ rows }: ReportHistoryTableProps) {
  return (
    <div style={{
      display: "flex", flexDirection: "row", flexWrap: "wrap",
      alignItems: "flex-start", alignContent: "flex-start",
      width: COL.id + COL.jalan + COL.tanggal + COL.status,
      borderRadius: 15, overflow: "hidden",
    }}>
      {/* ID */}
      <div style={{ display: "flex", flexDirection: "column", width: COL.id }}>
        <div style={hCell(COL.id)}><span style={hTxt}>ID</span></div>
        {rows.map((r) => <div key={r.id+"i"} style={bCell(COL.id)}><span style={bTxt}>{r.id}</span></div>)}
      </div>
      {/* Nama Jalan */}
      <div style={{ display: "flex", flexDirection: "column", width: COL.jalan }}>
        <div style={hCell(COL.jalan)}><span style={hTxt}>Nama Jalan</span></div>
        {rows.map((r) => <div key={r.id+"j"} style={bCell(COL.jalan)}><span style={bTxt}>{r.namaJalan}</span></div>)}
      </div>
      {/* Tanggal */}
      <div style={{ display: "flex", flexDirection: "column", width: COL.tanggal }}>
        <div style={hCell(COL.tanggal)}><span style={hTxt}>Tanggal Laporan</span></div>
        {rows.map((r) => <div key={r.id+"t"} style={bCell(COL.tanggal)}><span style={bTxt}>{r.tanggal}</span></div>)}
      </div>
      {/* Status */}
      <div style={{ display: "flex", flexDirection: "column", width: COL.status }}>
        <div style={hCell(COL.status)}><span style={{ ...hTxt, justifyContent: "center" }}>Status</span></div>
        {rows.map((r) => {
          const s = STATUS_STYLE[r.status];
          return (
            <div key={r.id+"s"} style={bCell(COL.status)}>
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                width: 118, height: 31,
                background: s.bg, borderRadius: 12,
              }}>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600, fontSize: 16,
                  color: s.color, whiteSpace: "nowrap",
                }}>{r.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
