export const dynamic = "force-dynamic";
import { prisma } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Megaphone, Newspaper } from "lucide-react";

export default async function AdminDashboard() {
  const [totalPenduduk, totalPengajuan, totalPengaduan, totalBerita] = await Promise.all([
    prisma.penduduk.count(),
    prisma.pengajuanSurat.count(),
    prisma.pengaduan.count(),
    prisma.berita.count(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penduduk</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPenduduk}</div>
            <p className="text-xs text-muted-foreground">Warga terdaftar di sistem</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Layanan Surat</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPengajuan}</div>
            <p className="text-xs text-muted-foreground">Total pengajuan masuk</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengaduan Warga</CardTitle>
            <Megaphone className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPengaduan}</div>
            <p className="text-xs text-muted-foreground">Laporan masuk dari warga</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Berita & Pengumuman</CardTitle>
            <Newspaper className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBerita}</div>
            <p className="text-xs text-muted-foreground">Artikel diterbitkan</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
