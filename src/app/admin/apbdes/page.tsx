"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function APBDesPage() {
  const [data, setData] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ tahun: 2024, tipe: "PENDAPATAN", kategori: "", nominal: 0, realisasi: 0 });

  const fetchData = async () => {
    const res = await fetch("/api/admin/apbdes");
    const json = await res.json();
    if (Array.isArray(json)) setData(json);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/apbdes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    toast.success("Data APBDes ditambahkan");
    setIsDialogOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus?")) return;
    await fetch(`/api/admin/apbdes/${id}`, { method: "DELETE" });
    toast.success("Dihapus");
    fetchData();
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Manajemen APBDes</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Tambah Anggaran</Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tahun</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Nominal</TableHead>
              <TableHead>Realisasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.tahun}</TableCell>
                <TableCell>{b.tipe}</TableCell>
                <TableCell>{b.kategori}</TableCell>
                <TableCell>Rp {b.nominal.toLocaleString()}</TableCell>
                <TableCell>Rp {b.realisasi.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(b.id)}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Tambah Data APBDes</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tahun</Label>
              <Input type="number" required value={formData.tahun} onChange={e => setFormData({...formData, tahun: parseInt(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Tipe</Label>
              <Select onValueChange={v => setFormData({...formData, tipe: v as string})} defaultValue={formData.tipe}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDAPATAN">PENDAPATAN</SelectItem>
                  <SelectItem value="BELANJA">BELANJA</SelectItem>
                  <SelectItem value="PEMBIAYAAN">PEMBIAYAAN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Kategori / Uraian</Label>
              <Input required value={formData.kategori} onChange={e => setFormData({...formData, kategori: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nominal Anggaran</Label>
                <Input type="number" required value={formData.nominal} onChange={e => setFormData({...formData, nominal: parseInt(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <Label>Nominal Realisasi</Label>
                <Input type="number" required value={formData.realisasi} onChange={e => setFormData({...formData, realisasi: parseInt(e.target.value)})} />
              </div>
            </div>
            <Button type="submit" className="w-full">Simpan</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
