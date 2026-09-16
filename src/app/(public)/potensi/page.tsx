import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function PotensiDesaPage() {
  const potensiList = [
    {
      title: "Kerajinan Tangan Anyaman Bambu",
      category: "UMKM",
      desc: "Produk anyaman bambu khas Muer yang diproduksi oleh kelompok ibu-ibu PKK. Cocok untuk suvenir dan dekorasi rumah.",
      icon: <ShoppingBag className="w-5 h-5 text-emerald-600" />
    },
    {
      title: "Kopi Lokal Asli Perbukitan",
      category: "Pertanian",
      desc: "Biji kopi robusta pilihan hasil panen langsung dari petani lokal di lereng bukit Muer, diroasting dengan metode tradisional.",
      icon: <ShoppingBag className="w-5 h-5 text-emerald-600" />
    },
    {
      title: "Air Terjun Bidadari",
      category: "Pariwisata",
      desc: "Destinasi wisata alam andalan desa dengan pemandangan asri dan air yang sangat jernih. Cocok untuk rekreasi keluarga.",
      icon: <MapPin className="w-5 h-5 text-emerald-600" />
    },
    {
      title: "Kain Tenun Muer",
      category: "UMKM",
      desc: "Kain tenun dengan motif warisan leluhur yang dibuat secara manual dengan alat tenun bukan mesin (ATBM).",
      icon: <ShoppingBag className="w-5 h-5 text-emerald-600" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Potensi & <span className="text-emerald-600">UMKM Desa</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Mendukung ekonomi lokal melalui pemberdayaan UMKM, Pariwisata, dan hasil bumi terbaik dari Desa Muer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {potensiList.map((item, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-lg rounded-2xl group cursor-pointer hover:-translate-y-2 transition-all duration-300 flex flex-col">
            <div className="h-56 bg-gray-200 overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors z-10" />
              <div className={`absolute inset-0 bg-[url('https://dummyimage.com/600x400/10b981/ffffff&text=${item.title.replace(/ /g, '+')}')] bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700`} />
              <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center gap-2 shadow-sm">
                {item.icon} {item.category}
              </div>
            </div>
            <CardHeader className="pt-6">
              <CardTitle className="text-xl font-bold leading-tight group-hover:text-emerald-600 transition-colors">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed">{item.desc}</p>
              <Link href="#" className="text-emerald-600 font-bold flex items-center hover:text-emerald-700 transition-colors text-sm">
                Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-emerald-50 rounded-3xl p-10 text-center border border-emerald-100">
        <h2 className="text-3xl font-bold text-emerald-900 mb-4">Ingin Produk Anda Tampil di Sini?</h2>
        <p className="text-emerald-700 mb-8 max-w-2xl mx-auto text-lg">
          Bagi warga Desa Muer yang memiliki usaha atau produk UMKM, Anda dapat mendaftarkan usaha Anda melalui balai desa agar dapat dipromosikan secara gratis di portal resmi ini.
        </p>
        <Link href="/layanan/pengajuan">
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/30">
            Daftar UMKM Sekarang
          </button>
        </Link>
      </div>
    </div>
  );
}
