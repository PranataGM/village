"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Berita = {
  id: string;
  judul: string;
  slug: string;
  is_published: boolean;
  created_at: string;
};

export default function ManajemenBeritaPage() {
  const [data, setData] = useState<Berita[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ judul: "", konten: "" });

  const fetchData = async () => {
    const res = await fetch("/api/admin/berita");
    const json = await res.json();
    if (Array.isArray(json)) setData(json);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/berita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success("Berita ditambahkan");
        setIsDialogOpen(false);
        setFormData({ judul: "", konten: "" });
        fetchData();
      } else {
        toast.error("Gagal menambahkan");
      }
    } catch {
      toast.error("Error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus?")) return;
    await fetch(`/api/admin/berita/${id}`, { method: "DELETE" });
    toast.success("Dihapus");
    fetchData();
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Manajemen Berita (CMS)</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Tulis Berita Baru</Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.judul}</TableCell>
                <TableCell>{new Date(b.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{b.is_published ? "Published" : "Draft"}</TableCell>
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
          <DialogHeader><DialogTitle>Tulis Berita Baru</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Judul Berita</Label>
              <Input required value={formData.judul} onChange={e => setFormData({...formData, judul: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Konten</Label>
              <textarea 
                required 
                className="w-full min-h-[150px] p-3 border rounded-md"
                value={formData.konten} 
                onChange={e => setFormData({...formData, konten: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full">Publish</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
