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
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#3F5210] text-[#ECEEE7] px-3 py-2 rounded-md text-sm font-poppins font-bold"
      >
        Menu
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative z-50
          w-[280px] md:w-[320px] lg:w-[360px] min-h-screen
          bg-[#3F5210] rounded-r-[40px] md:rounded-r-[50px]
          flex flex-col pt-12 md:pt-20 gap-16
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-8 md:px-12">
          <div className="w-[45px] md:w-[54px] h-[45px] md:h-[54px] relative">
            <Image src="/images/logo-tr.webp" alt="TerasDesa" fill className="object-contain" />
          </div>
          <span className="text-2xl md:text-[32px] font-bold text-[#ECEEE7] font-poppins tracking-tight">
            TerasDesa
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 pr-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center 
                  px-8 md:px-12 h-[60px] md:h-[70px] 
                  text-lg md:text-xl font-bold font-poppins 
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#F5F1E9] text-[#252525] rounded-r-[50px] shadow-lg"
                      : "text-[#ECEEE7] hover:bg-white/5 rounded-r-[50px]"
                  }
                `}
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