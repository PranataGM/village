import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { pendudukSchema } from "@/lib/validations/penduduk";
import { getServerSession } from "next-auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const penduduk = await prisma.penduduk.findUnique({
      where: { id: params.id },
    });

    if (!penduduk) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

    return NextResponse.json(penduduk);
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const result = pendudukSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Validasi gagal", errors: result.error.errors }, { status: 400 });
    }

    const { tgl_lahir, ...rest } = result.data;

    const existing = await prisma.penduduk.findUnique({ where: { nik: rest.nik } });
    if (existing && existing.id !== params.id) {
      return NextResponse.json({ message: "NIK sudah terdaftar pada data lain" }, { status: 400 });
    }

    const updated = await prisma.penduduk.update({
      where: { id: params.id },
      data: {
        ...rest,
        tgl_lahir: new Date(tgl_lahir),
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await prisma.penduduk.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
