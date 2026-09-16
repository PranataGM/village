import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function LembagaPage() {
  const lembagaList = [
    {
      nama: "BPD (Badan Permusyawaratan Desa)",
      desc: "Lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa yang anggotanya merupakan wakil dari penduduk desa.",
      img: "BPD"
    },
    {
      nama: "PKK (Pemberdayaan Kesejahteraan Keluarga)",
      desc: "Gerakan nasional dalam pembangunan masyarakat yang tumbuh dari bawah, pengelolaannya dari, oleh, dan untuk masyarakat.",
      img: "PKK"
    },
    {
      nama: "Karang Taruna",
      desc: "Wadah pengembangan generasi muda non-partisan yang tumbuh atas dasar kesadaran dan rasa tanggung jawab sosial dari, oleh, dan untuk masyarakat.",
      img: "Karang+Taruna"
    },
    {
      nama: "LPM (Lembaga Pemberdayaan Masyarakat)",
      desc: "Lembaga yang dibentuk atas prakarsa masyarakat sebagai mitra pemerintah desa dalam menampung dan mewujudkan aspirasi masyarakat.",
      img: "LPM"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Lembaga <span className="text-emerald-600">Desa</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Mitra strategis Pemerintah Desa Muer dalam menggerakkan pembangunan dan pemberdayaan masyarakat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {lembagaList.map((l, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-xl shadow-emerald-900/5 rounded-3xl flex flex-col md:flex-row group hover:-translate-y-1 transition-transform">
            <div className="w-full md:w-48 h-48 md:h-auto bg-emerald-100 flex-shrink-0 relative overflow-hidden">
               <div className={`absolute inset-0 bg-[url('https://dummyimage.com/400x400/10b981/ffffff&text=${l.img}')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700`} />
            </div>
            <CardContent className="p-8 flex-1 flex flex-col justify-center bg-white">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-2xl text-gray-900">{l.nama}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">{l.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
