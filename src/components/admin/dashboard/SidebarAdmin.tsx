"use client";
 
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
 
const navItems = [
  { label: "Dashboard",      href: "/admin/dashboard"       },
  { label: "Proyek Desa",    href: "/admin/proyek"          },
  { label: "Monitoring Dana",href: "/admin/monitoring-dana" },
  { label: "Edit Profil",     href: "/admin/edit-profil"      },
];
 
export default function SidebarAdmin() {
  const pathname = usePathname();
 
  return (
    <aside className="fixed top-0 left-0 h-screen w-[285px] bg-[#2F3E0C] rounded-r-[20px] flex flex-col pt-[73px] z-20">
      {/* Logo */}
      <div className="flex items-center gap-2 px-[40px] pb-10">
        <div className="w-[50px] h-[61px] relative flex-shrink-0">
          {/* Logo placeholder */}
            <Image src="/images/logo-tr.webp" alt="TerasDesa" fill className="object-contain" />
        </div>
        <span className="text-[32px] font-bold text-[#ECEEE7] leading-[131.8%]">
          TerasDesa
        </span>
      </div>
 
      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
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
  );
}
 