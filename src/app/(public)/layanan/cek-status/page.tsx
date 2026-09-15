"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Search, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";

type StatusData = {
  resi: string;
  nama: string;
  jenis_surat: string;
  status: "PENDING" | "PROSES" | "DONE" | "REJECTED";
  alasan_tolak: string | null;
  tanggal_pengajuan: string;
};

export default function CekStatusPage() {
  const [resi, setResi] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StatusData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resi.trim()) {
      toast.error("Masukkan nomor resi");
      return;
    }
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`/api/public/layanan/${resi.trim()}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        toast.error(json.message || "Resi tidak ditemukan");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Cek Status Pengajuan</h1>
        <p className="text-lg text-gray-600">Lacak progres pembuatan surat Anda dengan memasukkan Nomor Resi.</p>
      </div>

      <Card className="shadow-md">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="resi" className="sr-only">Nomor Resi</Label>
              <Input 
                id="resi"
                placeholder="Contoh: REQ-20240810-A1B2C3" 
                value={resi}
                onChange={(e) => setResi(e.target.value)}
                className="text-lg py-6"
              />
            </div>
            <Button type="submit" size="lg" className="py-6 px-8" disabled={loading}>
              {loading ? "Mencari..." : <><Search className="w-5 h-5 mr-2" /> Cari</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      {data && (
        <Card className="shadow-lg border-blue-100 overflow-hidden">
          <CardHeader className="bg-blue-50 border-b border-blue-100 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-blue-900">Detail Pengajuan</CardTitle>
                <CardDescription className="text-blue-700 mt-1">Resi: <span className="font-mono font-bold">{data.resi}</span></CardDescription>
              </div>
              {data.status === 'PENDING' && <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold flex items-center"><Clock className="w-4 h-4 mr-1"/> Menunggu</span>}
              {data.status === 'PROSES' && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold flex items-center"><Search className="w-4 h-4 mr-1"/> Diproses</span>}
              {data.status === 'DONE' && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold flex items-center"><CheckCircle2 className="w-4 h-4 mr-1"/> Selesai</span>}
              {data.status === 'REJECTED' && <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold flex items-center"><XCircle className="w-4 h-4 mr-1"/> Ditolak</span>}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Nama Pemohon</p>
                <p className="text-lg font-semibold">{data.nama}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Jenis Surat</p>
                <p className="text-lg font-semibold">{data.jenis_surat}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tanggal Pengajuan</p>
                <p className="text-lg font-semibold">{new Date(data.tanggal_pengajuan).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            {data.status === 'REJECTED' && data.alasan_tolak && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
                <p className="font-bold text-sm">Alasan Penolakan:</p>
                <p>{data.alasan_tolak}</p>
              </div>
            )}
            
            {data.status === 'DONE' && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-3 text-green-600" />
                <div>
                  <p className="font-bold">Surat Anda Telah Selesai!</p>
                  <p className="text-sm">Silakan ambil surat fisik di Kantor Kepala Desa dengan membawa KTP & KK Asli.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
