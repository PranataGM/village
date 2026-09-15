"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2, Search } from "lucide-react";
import Link from "next/link";

export default function PengajuanSuratPage() {
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resi, setResi] = useState("");

  const [formData, setFormData] = useState({
    jenis_surat: "",
    keperluan: "",
    lampiran_ktp_url: "https://dummyimage.com/600x400/000/fff&text=KTP+Mock",
    lampiran_kk_url: "https://dummyimage.com/600x400/000/fff&text=KK+Mock",
  });

  const checkNik = async () => {
    if (nik.length !== 16) {
      toast.error("NIK harus 16 digit");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/public/penduduk/${nik}`);
      const data = await res.json();
      if (res.ok) {
        setNama(data.nama);
        setIsValidated(true);
        toast.success("NIK ditemukan");
      } else {
        toast.error(data.message || "NIK tidak ditemukan");
        setIsValidated(false);
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jenis_surat || !formData.keperluan) {
      toast.error("Harap lengkapi semua isian");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/public/layanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nik, ...formData }),
      });
      const data = await res.json();
      if (res.ok) {
        setResi(data.resi);
      } else {
        toast.error(data.message || "Gagal mengajukan surat");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  if (resi) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="text-center border-green-200 shadow-sm">
          <CardContent className="pt-10 pb-10 space-y-4 flex flex-col items-center">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800">Pengajuan Berhasil!</h2>
            <p className="text-gray-600">Simpan nomor resi berikut untuk melacak status pengajuan Anda:</p>
            <div className="bg-gray-100 p-4 rounded-md font-mono text-2xl font-bold tracking-widest text-blue-700 w-full">
              {resi}
            </div>
            <p className="text-sm text-gray-500">Anda dapat mengecek status kapan saja di halaman Cek Status.</p>
            <div className="pt-4 flex gap-4 justify-center">
              <Link href="/layanan/cek-status">
                <Button>Cek Status Sekarang</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Kembali ke Beranda</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card className="shadow-lg border-none">
        <CardHeader className="text-center pb-8 border-b">
          <CardTitle className="text-3xl font-bold">Pengajuan Surat Online</CardTitle>
          <CardDescription className="text-base mt-2">
            Layanan pengajuan surat keterangan tanpa antre. Cepat dan mudah.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 space-y-8">
          
          {/* Step 1: Validasi NIK */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-bold">Validasi Data Diri</h3>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 space-y-2">
                <Label>Nomor Induk Kependudukan (NIK)</Label>
                <Input 
                  placeholder="Masukkan 16 digit NIK" 
                  value={nik} 
                  onChange={(e) => setNik(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  disabled={isValidated}
                />
              </div>
              <div className="flex items-end">
                {!isValidated ? (
                  <Button onClick={checkNik} disabled={loading || nik.length !== 16} className="w-32">
                    {loading ? "Mengecek..." : <><Search className="w-4 h-4 mr-2"/> Cek NIK</>}
                  </Button>
                ) : (
                  <Button onClick={() => {setIsValidated(false); setNama("");}} variant="outline" className="w-32">
                    Ubah NIK
                  </Button>
                )}
              </div>
            </div>
            {isValidated && (
              <div className="bg-green-50 text-green-800 p-4 rounded-md flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Data ditemukan atas nama: <strong>&nbsp;{nama}</strong>
              </div>
            )}
          </div>

          {/* Step 2: Form Pengajuan */}
          {isValidated && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="text-xl font-bold">Detail Pengajuan</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Jenis Surat</Label>
                  <Select onValueChange={(v) => setFormData({...formData, jenis_surat: v as string})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jenis Surat..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DOMISILI">Surat Keterangan Domisili</SelectItem>
                      <SelectItem value="USAHA">Surat Keterangan Usaha</SelectItem>
                      <SelectItem value="TIDAK_MAMPU">Surat Keterangan Tidak Mampu</SelectItem>
                      <SelectItem value="PENGANTAR">Surat Pengantar (SKCK dll)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Keperluan Pengajuan</Label>
                  <Input 
                    placeholder="Contoh: Pembuatan SKCK untuk melamar pekerjaan" 
                    value={formData.keperluan}
                    onChange={(e) => setFormData({...formData, keperluan: e.target.value})}
                  />
                  <p className="text-xs text-gray-500">Jelaskan secara singkat namun detail tujuan pembuatan surat ini.</p>
                </div>

                <div className="space-y-2">
                  <Label>Upload Foto KTP & KK (Mock)</Label>
                  <div className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md text-sm">
                    Fitur upload gambar nyata di-mock up untuk Fase ini. Sistem secara otomatis menyisipkan link dummy (dummyimage.com) sebagai lampiran.
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? "Memproses..." : "Ajukan Surat Sekarang"}
                </Button>
              </form>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
