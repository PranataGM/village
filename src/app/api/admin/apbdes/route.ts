import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const data = await prisma.aPBDes.findMany({
      orderBy: { tahun: 'desc' }
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const result = await prisma.aPBDes.create({
      data: {
        tahun: Number(body.tahun),
        tipe: body.tipe,
        kategori: body.kategori,
        nominal: Number(body.nominal),
        realisasi: Number(body.realisasi || 0),
      }
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menyimpan" }, { status: 500 });
  }
}
