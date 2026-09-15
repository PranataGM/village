"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2, Clock, Eye, XCircle } from "lucide-react";

type Pengajuan = {
  id: string;
  resi: string;
  jenis_surat: string;
  keperluan: string;
  status: "PENDING" | "PROSES" | "DONE" | "REJECTED";
  created_at: string;
  penduduk: {
    nik: string;
    nama: string;
  };
  lampiran_ktp_url: string;
  lampiran_kk_url: string;
};

export default function LayananSuratAdminPage() {
  const [data, setData] = useState<Pengajuan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Pengajuan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alasanTolak, setAlasanTolak] = useState("");

  const fetchPengajuan = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/layanan");
      const json = await res.json();
      if (Array.isArray(json)) setData(json);
    } catch (e) {
      toast.error("Gagal mengambil data inbox");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPengajuan();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (status === "REJECTED" && !alasanTolak.trim()) {
      toast.error("Alasan penolakan harus diisi!");
      return;
    }
    try {
      const res = await fetch(`/api/admin/layanan/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, alasan_tolak: status === "REJECTED" ? alasanTolak : undefined }),
      });
      if (res.ok) {
        toast.success(`Status berhasil diubah menjadi ${status}`);
        setIsDialogOpen(false);
        setAlasanTolak("");
        fetchPengajuan();
      } else {
        const err = await res.json();
        toast.error(err.message || "Gagal mengubah status");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem");
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">PENDING</span>;
      case 'PROSES': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">PROSES</span>;
      case 'DONE': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold">DONE</span>;
      case 'REJECTED': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-bold">REJECTED</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Inbox Layanan Surat</h2>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Pemohon</TableHead>
              <TableHead>Jenis Surat</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center">Memuat data...</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center">Tidak ada pengajuan surat</TableCell></TableRow>
            ) : (
              data.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono">{p.resi}</TableCell>
                  <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="font-medium">{p.penduduk.nama}</div>
                    <div className="text-xs text-gray-500">{p.penduduk.nik}</div>
                  </TableCell>
                  <TableCell>{p.jenis_surat}</TableCell>
                  <TableCell>{getStatusBadge(p.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => { setSelected(p); setIsDialogOpen(true); }}
                    >
                      <Eye className="w-4 h-4 mr-2" /> Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog Detail & Validasi */}
      <Dialog open={isDialogOpen} onOpenChange={(v) => {setIsDialogOpen(v); if(!v) setAlasanTolak("")}}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Pengajuan Surat</DialogTitle>
          </DialogHeader>
          
          {selected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Kolom Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Nomor Resi</h4>
                  <p className="font-mono text-lg font-bold">{selected.resi}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Pemohon</h4>
                  <p className="font-bold">{selected.penduduk.nama} ({selected.penduduk.nik})</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Jenis Surat & Keperluan</h4>
                  <p className="font-bold">{selected.jenis_surat}</p>
                  <p className="text-sm mt-1 bg-gray-50 p-2 rounded">{selected.keperluan}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Ubah Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => updateStatus(selected.id, "PROSES")} className="border-blue-500 text-blue-600 hover:bg-blue-50">
                      <Clock className="w-4 h-4 mr-1" /> Proses
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => updateStatus(selected.id, "DONE")} className="border-green-500 text-green-600 hover:bg-green-50">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Selesai & Cetak
                    </Button>
                  </div>
                </div>
                <div className="pt-4 border-t space-y-2">
                  <Label className="text-red-600">Tolak Pengajuan</Label>
                  <Input 
                    placeholder="Alasan penolakan (Wajib jika menolak)" 
                    value={alasanTolak} 
                    onChange={(e) => setAlasanTolak(e.target.value)}
                  />
                  <Button variant="destructive" size="sm" onClick={() => updateStatus(selected.id, "REJECTED")}>
                    <XCircle className="w-4 h-4 mr-1" /> Tolak Surat
                  </Button>
                </div>
              </div>
              
              {/* Kolom Dokumen (Split Screen) */}
              <div className="bg-gray-100 p-4 rounded-lg space-y-4">
                <h3 className="font-bold">Lampiran Warga</h3>
                <div>
                  <p className="text-sm font-medium mb-1">Foto KTP</p>
                  <img src={selected.lampiran_ktp_url} alt="KTP" className="w-full rounded border bg-white" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Foto KK</p>
                  <img src={selected.lampiran_kk_url} alt="KK" className="w-full rounded border bg-white" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
