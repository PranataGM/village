"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye } from "lucide-react";

type Pengaduan = {
  id: string;
  nama_pelapor: string;
  kategori: string;
  deskripsi: string;
  status: "UNREAD" | "READ" | "RESOLVED";
  created_at: string;
};

export default function PengaduanAdminPage() {
  const [data, setData] = useState<Pengaduan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Pengaduan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/pengaduan");
    const json = await res.json();
    if (Array.isArray(json)) setData(json);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (status: string) => {
    if (!selected) return;
    try {
      const res = await fetch(`/api/admin/pengaduan/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success(`Pengaduan diupdate menjadi ${status}`);
        setIsDialogOpen(false);
        fetchData();
      } else {
        toast.error("Gagal update status");
      }
    } catch (e) {
      toast.error("Error");
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'UNREAD': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">UNREAD</span>;
      case 'READ': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">READ</span>;
      case 'RESOLVED': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold">RESOLVED</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Kotak Pengaduan Warga</h2>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Pelapor</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center">Memuat...</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center">Tidak ada pengaduan</TableCell></TableRow>
            ) : (
              data.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{p.nama_pelapor || "Anonim"}</TableCell>
                  <TableCell>{p.kategori}</TableCell>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Detail Laporan Warga</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-semibold text-gray-500">Dari: {selected.nama_pelapor || "Anonim"}</p>
                <p className="font-bold text-lg mt-2">Kategori: {selected.kategori}</p>
                <p className="mt-2 text-gray-700">{selected.deskripsi}</p>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => updateStatus("READ")}>Set Status: READ</Button>
                <Button onClick={() => updateStatus("RESOLVED")} className="bg-green-600 hover:bg-green-700">Tandai Selesai</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
