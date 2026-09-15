import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { z } from "zod";

const updateStatusSchema = z.object({
  status: z.enum(["PENDING", "PROSES", "REJECTED", "DONE"]),
  alasan_tolak: z.string().optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const result = updateStatusSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Validasi gagal", errors: result.error.flatten() }, { status: 400 });
    }

    if (result.data.status === "REJECTED" && !result.data.alasan_tolak) {
      return NextResponse.json({ message: "Alasan penolakan wajib diisi" }, { status: 400 });
    }

    const resolvedParams = await params;
    const updated = await prisma.pengajuanSurat.update({
      where: { id: resolvedParams.id },
      data: {
        status: result.data.status,
        alasan_tolak: result.data.status === "REJECTED" ? result.data.alasan_tolak : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
