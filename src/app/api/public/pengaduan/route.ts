import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const pengaduan = await prisma.pengaduan.create({
      data: {
        nama_pelapor: body.nama_pelapor,
        kategori: body.kategori || "INFRASTRUKTUR",
        deskripsi: body.laporan,
      }
    });

    return NextResponse.json({ message: "Pengaduan berhasil dikirim", id: pengaduan.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
