"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PendudukForm } from "@/components/forms/penduduk-form";

type Penduduk = {
  id: string;
  nik: string;
  nama: string;
  jenis_kelamin: string;
  alamat: string;
  status_dasar: string;
};

export default function ManajemenPendudukPage() {
  const [data, setData] = useState<Penduduk[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPenduduk = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/penduduk");
      const json = await res.json();
      if (Array.isArray(json)) setData(json);
    } catch (e) {
      toast.error("Gagal mengambil data penduduk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPenduduk();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`/api/penduduk/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Data berhasil dihapus");
        fetchPenduduk();
      } else {
        toast.error("Gagal menghapus data");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan server");
    }
  };

  const filteredData = data.filter(p => 
    p.nama.toLowerCase().includes(search.toLowerCase()) || 
    p.nik.includes(search)
  );

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Manajemen Penduduk</h2>
        <Button onClick={() => { setIsDialogOpen(true); }}>Tambah Penduduk</Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input 
          placeholder="Cari berdasarkan NIK atau Nama..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIK</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jenis Kelamin</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center">Memuat data...</TableCell></TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center">Tidak ada data</TableCell></TableRow>
            ) : (
              filteredData.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.nik}</TableCell>
                  <TableCell className="font-medium">{p.nama}</TableCell>
                  <TableCell>{p.jenis_kelamin}</TableCell>
                  <TableCell>{p.alamat}</TableCell>
                  <TableCell>{p.status_dasar}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => toast.info("Fitur Edit akan ditambahkan!")}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>Hapus</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Basic Dialog for Add/Edit Placeholder */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Form Tambah Penduduk</DialogTitle>
          </DialogHeader>
          <PendudukForm onSuccess={() => { setIsDialogOpen(false); fetchPenduduk(); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
