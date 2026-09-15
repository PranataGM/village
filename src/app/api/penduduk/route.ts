import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { pendudukSchema } from "@/lib/validations/penduduk";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const pendudukList = await prisma.penduduk.findMany({
      orderBy: { nama: "asc" }
    });

    return NextResponse.json(pendudukList);
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = pendudukSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Validasi gagal", errors: result.error.flatten() }, { status: 400 });
    }

    const { tgl_lahir, ...rest } = result.data;
    
    // check if NIK exists
    const existing = await prisma.penduduk.findUnique({ where: { nik: rest.nik } });
    if (existing) {
      return NextResponse.json({ message: "NIK sudah terdaftar" }, { status: 400 });
    }

    const newPenduduk = await prisma.penduduk.create({
      data: {
        ...rest,
        tgl_lahir: new Date(tgl_lahir),
      }
    });

    return NextResponse.json(newPenduduk, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
