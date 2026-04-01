"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Proyek Desa", href: "/admin/proyek" },
  { label: "Monitoring Dana", href: "/admin/monitoring-dana" },
  { label: "Edit Profil", href: "/admin/profil" },
];

export default function SidebarAdmin() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button Mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#2F3E0C] text-white px-3 py-2 rounded-md text-sm"
      >
        Menu
      </button>

      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          width: "285px",
          minWidth: "285px",
          minHeight: "100vh",
          backgroundColor: "#2F3E0C",
          borderRadius: "0 20px 20px 0",
          display: "flex",
          flexDirection: "column",
          paddingTop: "73px",
          position: "relative",
        }}
        className={`
          z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-[40px] pb-10">
          <div className="w-[70px] md:w-[80px] h-[70px] md:h-[80px] relative">
            <Image src="/images/logo-tr.webp" alt="TerasDesa" fill className="object-contain" />
          </div>
          <span className="text-[32px] font-bold text-[#ECEEE7]">
            TerasDesa
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-[36px] h-16 rounded-[30px] text-xl font-bold transition-colors ${
                  isActive
                    ? "bg-[#F5F1E9] text-[#252525]"
                    : "text-[#ECEEE7] hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}