import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { z } from "zod";
import crypto from "crypto";

const ajukanSuratSchema = z.object({
  nik: z.string().length(16),
  jenis_surat: z.enum(["DOMISILI", "USAHA", "TIDAK_MAMPU", "PENGANTAR"]),
  keperluan: z.string().min(10, "Keperluan minimal 10 karakter"),
  // Mock url lampiran karena belum ada upload s3, di tahap produksi gunakan FormData untuk file
  lampiran_ktp_url: z.string().url("URL KTP tidak valid").default("https://dummyimage.com/ktp"),
  lampiran_kk_url: z.string().url("URL KK tidak valid").default("https://dummyimage.com/kk"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = ajukanSuratSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Validasi gagal", errors: result.error.flatten() }, { status: 400 });
    }

    // 1. Pastikan NIK ada di database penduduk
    const penduduk = await prisma.penduduk.findUnique({
      where: { nik: result.data.nik },
    });

    if (!penduduk) {
      return NextResponse.json({ message: "NIK tidak valid / tidak terdaftar" }, { status: 404 });
    }

    // 2. Generate Nomor Resi unik (contoh: REQ-YYYYMMDD-XXXX)
    const dateStr = new Date().toISOString().slice(0,10).replace(/-/g,"");
    const randomStr = crypto.randomBytes(3).toString("hex").toUpperCase();
    const resi = `REQ-${dateStr}-${randomStr}`;

    // 3. Simpan ke database
    const pengajuan = await prisma.pengajuanSurat.create({
      data: {
        resi,
        pendudukId: penduduk.id,
        jenis_surat: result.data.jenis_surat,
        keperluan: result.data.keperluan,
        lampiran_ktp_url: result.data.lampiran_ktp_url,
        lampiran_kk_url: result.data.lampiran_kk_url,
      }
    });

    return NextResponse.json({
      message: "Pengajuan berhasil",
      resi: pengajuan.resi
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
