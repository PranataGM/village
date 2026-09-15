"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pendudukSchema, PendudukFormValues } from "@/lib/validations/penduduk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

export function PendudukForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<PendudukFormValues>({
    resolver: zodResolver(pendudukSchema),
    defaultValues: {
      status_dasar: "HIDUP",
      jenis_kelamin: "Laki-laki",
      agama: "Islam",
    }
  });

  const onSubmit = async (data: PendudukFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/penduduk", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal menyimpan data");
        return;
      }

      toast.success("Penduduk berhasil ditambahkan");
      onSuccess();
    } catch (e) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>NIK</Label>
          <Input {...register("nik")} placeholder="16 Digit Angka" />
          {errors.nik && <p className="text-sm text-red-500">{errors.nik.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>No KK</Label>
          <Input {...register("no_kk")} placeholder="16 Digit Angka" />
          {errors.no_kk && <p className="text-sm text-red-500">{errors.no_kk.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Nama Lengkap</Label>
          <Input {...register("nama")} />
          {errors.nama && <p className="text-sm text-red-500">{errors.nama.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Tempat Lahir</Label>
          <Input {...register("tempat_lahir")} />
          {errors.tempat_lahir && <p className="text-sm text-red-500">{errors.tempat_lahir.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Tanggal Lahir</Label>
          <Input type="date" {...register("tgl_lahir")} />
          {errors.tgl_lahir && <p className="text-sm text-red-500">{errors.tgl_lahir.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Pekerjaan</Label>
          <Input {...register("pekerjaan")} />
          {errors.pekerjaan && <p className="text-sm text-red-500">{errors.pekerjaan.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Pendidikan</Label>
          <Input {...register("pendidikan")} />
          {errors.pendidikan && <p className="text-sm text-red-500">{errors.pendidikan.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Alamat</Label>
          <Input {...register("alamat")} />
          {errors.alamat && <p className="text-sm text-red-500">{errors.alamat.message}</p>}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <Label>RT</Label>
            <Input {...register("rt")} />
          </div>
          <div className="space-y-2">
            <Label>RW</Label>
            <Input {...register("rw")} />
          </div>
          <div className="space-y-2">
            <Label>Dusun</Label>
            <Input {...register("dusun")} />
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan Data"}
      </Button>
    </form>
  );
}
