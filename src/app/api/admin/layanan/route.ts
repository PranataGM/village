import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await prisma.pengajuanSurat.findMany({
      include: {
        penduduk: {
          select: { nik: true, nama: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
