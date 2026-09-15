import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PublicNavbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">SIDesa</Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Beranda</Link>
            <Link href="/profil" className="text-gray-600 hover:text-blue-600 font-medium">Profil Desa</Link>
            <Link href="/data" className="text-gray-600 hover:text-blue-600 font-medium">Data & Transparansi</Link>
            <Link href="/layanan/pengajuan" className="text-gray-600 hover:text-blue-600 font-medium">Layanan Surat</Link>
            <Link href="/pengaduan" className="text-gray-600 hover:text-blue-600 font-medium">Pengaduan</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Login Admin</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
