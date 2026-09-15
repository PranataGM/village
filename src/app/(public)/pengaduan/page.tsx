"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Megaphone, CheckCircle2 } from "lucide-react";

export default function PengaduanPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nama_pelapor: "",
    kategori: "",
    laporan: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/public/pengaduan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        toast.success("Laporan berhasil dikirim");
      } else {
        toast.error("Gagal mengirim laporan");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
        <h2 className="text-3xl font-bold text-gray-900">Laporan Diterima!</h2>
        <p className="text-gray-600">Terima kasih atas kepedulian Anda. Laporan Anda akan segera ditindaklanjuti oleh Pemerintah Desa.</p>
        <Button onClick={() => { setSuccess(false); setFormData({nama_pelapor: "", kategori: "", laporan: ""}); }} variant="outline">
          Buat Laporan Baru
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="shadow-lg border-none">
        <CardHeader className="text-center pb-8 border-b bg-blue-50">
          <Megaphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-blue-900">Lapor Warga</CardTitle>
          <CardDescription className="text-blue-700 mt-2">
            Punya keluhan, saran, atau menemukan infrastruktur yang rusak? Laporkan kepada kami di sini.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Nama Anda (Boleh Anonim)</Label>
              <Input 
                placeholder="Contoh: Warga RT 01 atau Nama Asli" 
                value={formData.nama_pelapor} 
                onChange={(e) => setFormData({...formData, nama_pelapor: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori Laporan</Label>
              <select 
                required
                className="w-full p-3 border rounded-md"
                value={formData.kategori} 
                onChange={(e) => setFormData({...formData, kategori: e.target.value})}
              >
                <option value="">Pilih Kategori</option>
                <option value="INFRASTRUKTUR">Infrastruktur</option>
                <option value="KEAMANAN">Keamanan</option>
                <option value="LINGKUNGAN">Lingkungan</option>
                <option value="SOSIAL">Sosial</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Detail Laporan</Label>
              <textarea 
                required
                className="w-full min-h-[150px] p-3 border rounded-md"
                placeholder="Jelaskan secara rinci lokasi dan masalah yang Anda temukan..."
                value={formData.laporan} 
                onChange={(e) => setFormData({...formData, laporan: e.target.value})}
              />
            </div>
            <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "Mengirim..." : "Kirim Laporan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
