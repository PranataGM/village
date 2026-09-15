import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ resi: string }> }) {
  try {
    const resolvedParams = await params;
    const pengajuan = await prisma.pengajuanSurat.findUnique({
      where: { resi: resolvedParams.resi },
      include: {
        penduduk: {
          select: { nama: true }
        }
      }
    });

    if (!pengajuan) {
      return NextResponse.json({ message: "Nomor resi tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      resi: pengajuan.resi,
      nama: pengajuan.penduduk.nama,
      jenis_surat: pengajuan.jenis_surat,
      status: pengajuan.status,
      alasan_tolak: pengajuan.alasan_tolak,
      tanggal_pengajuan: pengajuan.created_at
    });
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
