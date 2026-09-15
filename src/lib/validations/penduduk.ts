import { z } from "zod";

export const pendudukSchema = z.object({
  nik: z.string().regex(/^\d{16}$/, "NIK harus berupa 16 digit angka"),
  no_kk: z.string().regex(/^\d{16}$/, "Nomor KK harus berupa 16 digit angka"),
  nama: z.string().min(3, "Nama minimal 3 karakter").regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh berisi huruf dan spasi"),
  tempat_lahir: z.string().min(3, "Tempat lahir minimal 3 karakter"),
  tgl_lahir: z.string().refine((val) => {
    const date = new Date(val);
    return date <= new Date();
  }, "Tanggal lahir tidak boleh di masa depan"),
  jenis_kelamin: z.string().min(1, "Pilih jenis kelamin"),
  agama: z.string().min(1, "Pilih agama"),
  pendidikan: z.string().min(1, "Pilih pendidikan terakhir"),
  pekerjaan: z.string().min(1, "Pilih pekerjaan"),
  alamat: z.string().min(5, "Alamat minimal 5 karakter"),
  rt: z.string().min(1, "Pilih RT"),
  rw: z.string().min(1, "Pilih RW"),
  dusun: z.string().min(1, "Pilih dusun"),
  status_dasar: z.enum(["HIDUP", "MATI", "PINDAH"]),
});

export type PendudukFormValues = z.infer<typeof pendudukSchema>;
