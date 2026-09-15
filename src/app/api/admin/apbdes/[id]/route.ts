import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const resolvedParams = await params;
    await prisma.aPBDes.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ message: "Dihapus" });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menghapus" }, { status: 500 });
  }
}
