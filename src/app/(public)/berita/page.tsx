"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BeritaPage() {
  const [berita, setBerita] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/berita")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBerita(data.filter((b: any) => b.is_published));
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900">Kabar Desa Muer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {berita.map((b) => (
          <Card key={b.id} className="overflow-hidden flex flex-col">
            <div className="h-48 w-full bg-gray-200">
              {b.thumbnail_url && <img src={b.thumbnail_url} alt={b.judul} className="w-full h-full object-cover" />}
            </div>
            <CardHeader>
              <p className="text-xs text-gray-500 mb-1">{new Date(b.created_at).toLocaleDateString()}</p>
              <CardTitle className="text-xl leading-tight">{b.judul}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-gray-600 line-clamp-3 mb-4">{b.konten}</p>
              <Link href={`#`} className="text-blue-600 font-medium flex items-center hover:underline">
                Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {berita.length === 0 && (
        <div className="text-center py-20 text-gray-500">Belum ada berita yang diterbitkan.</div>
      )}
    </div>
  );
}
