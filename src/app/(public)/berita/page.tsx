"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BeritaPage() {
  const [berita, setBerita] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/berita")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBerita(data.filter((b: any) => b.is_published));
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Kabar Desa <span className="text-emerald-600">Muer</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Ikuti terus perkembangan, pengumuman, dan berita terbaru dari Pemerintah Desa.</p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {berita.map((b) => (
            <Card key={b.id} className="overflow-hidden border-none shadow-lg rounded-2xl group cursor-pointer hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="h-56 bg-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors z-10" />
                {b.thumbnail_url ? (
                  <img src={b.thumbnail_url} alt={b.judul} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                    <span className="text-emerald-300 text-6xl">📰</span>
                  </div>
                )}
              </div>
              <CardHeader className="pt-6">
                <p className="text-sm font-semibold text-emerald-600 mb-2 uppercase tracking-wider">{new Date(b.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <CardTitle className="text-2xl font-bold leading-tight group-hover:text-emerald-600 transition-colors">{b.judul}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-gray-600 line-clamp-3 mb-6 text-base leading-relaxed">{b.konten}</p>
                <Link href={`#`} className="text-emerald-600 font-bold flex items-center hover:text-emerald-700 transition-colors">
                  Baca Selengkapnya <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {!loading && berita.length === 0 && (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-xl text-gray-500 font-medium">Belum ada berita yang diterbitkan saat ini.</p>
        </div>
      )}
    </div>
  );
}
