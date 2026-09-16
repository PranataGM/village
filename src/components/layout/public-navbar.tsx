"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function PublicNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Lembaga", href: "/lembaga" },
    { name: "Potensi & UMKM", href: "/potensi" },
    { name: "Data & PPID", href: "/data" },
    { name: "Layanan", href: "/layanan/pengajuan" },
    { name: "Pengaduan", href: "/pengaduan" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <Link href="/" className="text-2xl font-black text-gray-900 tracking-tight">Desa <span className="text-emerald-600">Muer</span></Link>
          </div>
          <div className="hidden lg:flex space-x-2 items-center">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    isActive 
                      ? "bg-emerald-50 text-emerald-700 shadow-sm" 
                      : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-full px-6 font-semibold">
                Login Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
