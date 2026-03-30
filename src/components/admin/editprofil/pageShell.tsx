"use client";

import React from "react";

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Inter:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5F1E9; }

        .shell-page {
          position: relative;
          width: 1440px;
          min-height: 100vh;
          background: #F5F1E9;
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
        }

        /* gradient header */
        .shell-header {
          position: absolute;
          width: 1441px; height: 182px;
          left: -1px; top: 0;
          background: linear-gradient(180deg, #C3C9B5 0%, #2F3E0C 110.31%);
        }

        /* dark sidebar bg */
        .shell-sidebar-bg {
          position: absolute;
          width: 460px; height: calc(100% - 182px - 359px);
          min-height: 900px;
          left: 0; top: 182px;
          background: #2B3537;
        }

        /* top nav bar */
        .shell-nav {
          position: absolute;
          left: 0; top: 0;
          width: 1440px; height: 182px;
          display: flex;
          align-items: center;
          padding: 0 102px;
          justify-content: space-between;
        }

        .shell-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 32px;
          line-height: 131.8%;
          color: #190B02;
        }

        .shell-logo-icon {
          width: 52px; height: 52px;
        }

        .shell-avatar-nav {
          width: 50px; height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #AEC72F, #556117);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 18px; color: #ECEEE7;
          cursor: pointer;
          overflow: hidden;
        }

        /* footer */
        .shell-footer {
          position: absolute;
          bottom: 0; left: 0;
          width: 1441px; height: 359px;
          background: #2F3E0C;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          padding: 76px 126px 63px 102px;
        }

        .shell-footer-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .shell-follow {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 24px;
          color: #E2E5DB;
        }

        .shell-socials {
          display: flex;
          gap: 16px;
          margin-top: 4px;
        }

        .shell-social-icon {
          width: 24px; height: 24px;
          background: #E2E5DB;
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 8px; font-weight: 700;
          color: #2F3E0C; cursor: pointer;
          font-family: 'Inter', sans-serif;
        }

        .shell-footer-links {
          display: flex;
          flex-direction: row;
          gap: 70px;
        }

        .shell-footer-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .shell-footer-col-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600; font-size: 16px;
          color: #E2E5DB;
        }

        .shell-footer-link {
          font-family: 'Inter', sans-serif;
          font-weight: 400; font-size: 16px;
          color: #E2E5DB;
          line-height: 140%;
          cursor: pointer;
        }

        .shell-footer-copy {
          font-family: 'Inter', sans-serif;
          font-weight: 400; font-size: 16px;
          color: #E2E5DB;
          line-height: 140%;
          max-width: 580px;
          align-self: flex-end;
        }

        /* content area (right of sidebar) */
        .shell-content {
          position: absolute;
          left: 527px;
          top: 280px;
          width: 843px;
        }
      `}</style>

      <div className="shell-page">
        <div className="shell-header" />
        <div className="shell-sidebar-bg" />

        {/* Nav */}
        <div className="shell-nav">
          {/* Logo */}
          <div className="shell-logo">
            <svg className="shell-logo-icon" viewBox="0 0 67 61" fill="none">
              <ellipse cx="38" cy="18" rx="12" ry="12" fill="#F1BE52"/>
              <ellipse cx="44" cy="15" rx="12" ry="16" fill="#556117" transform="rotate(15 44 15)"/>
              <ellipse cx="36" cy="20" rx="8" ry="17" fill="#fff" transform="rotate(15 36 20)"/>
              <rect x="26" y="37" width="25" height="12" rx="2" fill="#556117"/>
              <rect x="31" y="40" width="14" height="6" rx="2" fill="#C3C9B5"/>
            </svg>
            TerasDesa
          </div>
          {/* Avatar nav */}
          <div className="shell-avatar-nav">A</div>
        </div>

        {children}

        {/* Footer */}
        <div className="shell-footer">
          <div className="shell-footer-left">
            <svg width="112" height="102" viewBox="0 0 112 102" fill="none">
              <ellipse cx="55" cy="35" rx="20" ry="20" fill="#F1BE52"/>
              <ellipse cx="66" cy="28" rx="20" ry="28" fill="#556117" transform="rotate(15 66 28)"/>
              <ellipse cx="52" cy="38" rx="14" ry="28" fill="#fff" transform="rotate(15 52 38)"/>
              <rect x="20" y="62" width="42" height="24" rx="2" fill="#556117"/>
              <rect x="28" y="69" width="24" height="13" rx="2" fill="#C3C9B5"/>
            </svg>
            <span className="shell-follow">Follow us!</span>
            <div className="shell-socials">
              {["X","IG","YT","LI"].map((s) => (
                <div key={s} className="shell-social-icon">{s}</div>
              ))}
            </div>
          </div>

          <div className="shell-footer-links">
            <div className="shell-footer-col">
              <span className="shell-footer-col-title">Tentang Kami</span>
              <span className="shell-footer-link">Profil TerasDesa</span>
              <span className="shell-footer-link">Keamanan</span>
              <span className="shell-footer-link">Hubungi kami</span>
            </div>
            <div className="shell-footer-col">
              <span className="shell-footer-col-title">Tautan Lainnya</span>
              <span className="shell-footer-link">Dashboard Transparansi</span>
              <span className="shell-footer-link">Monitoring Proyek Desa</span>
              <span className="shell-footer-link">Laporan Warga</span>
            </div>
          </div>

          <span className="shell-footer-copy">
            © 2026 TerasDesa. All rights reserved.<br/>
            Sistem Informasi Transparansi Desa
          </span>
        </div>
      </div>
    </>
  );
}