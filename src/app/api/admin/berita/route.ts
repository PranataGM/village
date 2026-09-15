import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await prisma.berita.findMany({
      orderBy: { created_at: 'desc' }
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
    const slug = body.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const berita = await prisma.berita.create({
      data: {
        judul: body.judul,
        slug: slug,
        konten: body.konten,
        thumbnail_url: body.thumbnail_url || "https://dummyimage.com/600x400",
        authorId: session.user.id,
        is_published: body.is_published ?? true,
      }
    });
    return NextResponse.json(berita, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menyimpan" }, { status: 500 });
  }
}
