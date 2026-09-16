import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Megaphone, Users, MapPin, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 flex items-center justify-center overflow-hidden text-center text-white px-4">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto space-y-8 mt-12 mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-800/50 border border-emerald-500/30 text-emerald-50 text-sm font-medium backdrop-blur-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            Portal Resmi Pemerintah Desa Muer
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Desa Inovatif, <br className="hidden md:block"/>Masyarakat Sejahtera.
          </h1>
          
          <p className="text-lg md:text-2xl text-emerald-50/90 max-w-2xl mx-auto font-light leading-relaxed">
            Mewujudkan pelayanan publik yang transparan, modern, dan responsif untuk kemajuan kita bersama.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/layanan/pengajuan">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white border-none shadow-lg shadow-emerald-900/20 w-full sm:w-auto h-14 px-8 text-lg rounded-xl transition-all hover:scale-105">
                <FileText className="mr-2 h-5 w-5" /> Ajukan Surat Online
              </Button>
            </Link>
            <Link href="/pengaduan">
              <Button size="lg" variant="outline" className="text-emerald-900 border-white hover:bg-emerald-50 w-full sm:w-auto bg-white h-14 px-8 text-lg rounded-xl shadow-lg transition-all hover:scale-105">
                <Megaphone className="mr-2 h-5 w-5" /> Lapor Warga
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Curved Bottom Divider */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none z-20 transform translate-y-1">
          <svg className="relative block w-full h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,137.9,132.83,204.4,119.53c65.86-13.16,132-45.69,198.61-59.5z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* Widget Statistik Cepat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="shadow-xl shadow-emerald-900/5 border-none rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-8 flex items-center space-x-6 bg-white">
              <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Users size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Penduduk</p>
                <h3 className="text-4xl font-black text-gray-900">2.450</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-xl shadow-emerald-900/5 border-none rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-8 flex items-center space-x-6 bg-white">
              <div className="p-4 bg-teal-100 text-teal-600 rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                <Users size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Kepala Keluarga</p>
                <h3 className="text-4xl font-black text-gray-900">620</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-xl shadow-emerald-900/5 border-none rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-8 flex items-center space-x-6 bg-white">
              <div className="p-4 bg-green-100 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <MapPin size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Luas Wilayah</p>
                <h3 className="text-4xl font-black text-gray-900">12 <span className="text-xl">km&sup2;</span></h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sambutan Kepala Desa */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl shadow-lg border border-emerald-100/50 p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
          <div className="w-56 h-56 bg-emerald-200 rounded-full flex-shrink-0 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative">
             <div className="absolute inset-0 bg-[url('https://dummyimage.com/300x300/10b981/ffffff&text=Kades')] bg-cover bg-center" />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold uppercase tracking-widest">
              Sambutan Kepala Desa
            </div>
            <h2 className="text-4xl font-black text-gray-900">Bersama Membangun Desa Muer</h2>
            <p className="text-gray-600 leading-relaxed text-xl italic font-serif">
              "Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa. Melalui website portal terintegrasi ini, kami berkomitmen penuh untuk menghadirkan pelayanan publik yang cepat, transparan, dan akuntabel demi kesejahteraan seluruh warga Desa Muer."
            </p>
            <div>
              <p className="font-bold text-2xl text-gray-900">Bapak Budi Santoso</p>
              <p className="text-emerald-600 font-medium text-lg">Kepala Desa Muer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-black text-gray-900">Kabar Desa</h2>
            <p className="text-gray-500 mt-2 text-lg">Informasi dan pengumuman terbaru seputar Desa Muer.</p>
          </div>
          <Link href="/berita" className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline flex items-center text-lg transition-colors">
            Lihat Semua <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border-none shadow-lg rounded-2xl group cursor-pointer hover:-translate-y-2 transition-all duration-300">
              <div className="h-56 bg-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors z-10" />
                <div className={`absolute inset-0 bg-[url('https://dummyimage.com/600x400/10b981/ffffff&text=Berita+${i}')] bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700`} />
              </div>
              <CardHeader className="pt-6">
                <p className="text-sm font-semibold text-emerald-600 mb-2 uppercase tracking-wider">10 Agustus 2024</p>
                <CardTitle className="text-2xl font-bold leading-tight group-hover:text-emerald-600 transition-colors">
                  Pembangunan Fasilitas Umum Tahap {i} Telah Dimulai
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 text-base leading-relaxed">
                  Pemerintah Desa Muer resmi memulai proyek peningkatan fasilitas umum sebagai bagian dari optimalisasi APBDes tahun ini...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Potensi Desa / UMKM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-black text-gray-900">Potensi Desa & UMKM</h2>
            <p className="text-gray-500 mt-2 text-lg">Mendukung karya lokal dan kekayaan alam Desa Muer.</p>
          </div>
          <Link href="/potensi" className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline flex items-center text-lg transition-colors">
            Lihat Semua <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Kerajinan Tangan", "Kopi Lokal Asli", "Wisata Alam", "Kain Tenun"].map((item, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-md rounded-2xl group cursor-pointer hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 bg-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors z-10" />
                <div className={`absolute inset-0 bg-[url('https://dummyimage.com/400x400/10b981/ffffff&text=${item.replace(' ', '+')}')] bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700`} />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">{item}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Peta Lokasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-gray-900">Peta Lokasi Desa</h2>
          <p className="text-gray-500 mt-2 text-lg">Kunjungi balai desa kami untuk layanan tatap muka.</p>
        </div>
        <div className="w-full h-[500px] bg-gray-200 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311654129782!3d-6.903444341687889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
