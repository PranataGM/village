import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";

// Endpoint publik untuk mengecek NIK saat warga akan mengajukan surat
export async function GET(req: Request, { params }: { params: Promise<{ nik: string }> }) {
  try {
    const resolvedParams = await params;
    const penduduk = await prisma.penduduk.findUnique({
      where: { nik: resolvedParams.nik },
      select: {
        id: true,
        nama: true, // Hanya mengembalikan nama untuk keamanan (tanpa data sensitif lain)
        nik: true
      }
    });

    if (!penduduk) {
      return NextResponse.json({ message: "NIK tidak terdaftar dalam database penduduk" }, { status: 404 });
    }

    return NextResponse.json(penduduk);
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
