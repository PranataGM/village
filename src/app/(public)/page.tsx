import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Megaphone, Users, MapPin, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] bg-blue-900 flex items-center justify-center overflow-hidden text-center text-white px-4">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* You can add next/image here later for background photo */}
        <div className="relative z-20 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Selamat Datang di Desa Muer</h1>
          <p className="text-lg md:text-xl text-gray-200">
            Mewujudkan pelayanan publik yang transparan, inovatif, dan responsif untuk kesejahteraan masyarakat.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/layanan/pengajuan">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <FileText className="mr-2 h-5 w-5" /> Ajukan Surat Online
              </Button>
            </Link>
            <Link href="/pengaduan">
              <Button size="lg" variant="outline" className="text-blue-900 border-white hover:bg-white/90 w-full sm:w-auto bg-white">
                <Megaphone className="mr-2 h-5 w-5" /> Lapor Warga!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Widget Statistik Cepat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-24 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="shadow-lg border-none">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Users size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Penduduk</p>
                <h3 className="text-3xl font-bold">2.450</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-none">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <Users size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Kepala Keluarga</p>
                <h3 className="text-3xl font-bold">620</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-none">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                <MapPin size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Luas Wilayah</p>
                <h3 className="text-3xl font-bold">12 km&sup2;</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sambutan Kepala Desa */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 bg-gray-200 rounded-full flex-shrink-0">
            {/* Foto Kades Placeholder */}
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold">Sambutan Kepala Desa</h2>
            <p className="text-gray-600 leading-relaxed italic">
              "Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa. Melalui website ini, kami berharap dapat memberikan pelayanan informasi dan administrasi yang lebih baik, cepat, dan transparan kepada seluruh warga Desa Muer."
            </p>
            <div>
              <p className="font-bold text-lg">Bapak Budi Santoso</p>
              <p className="text-gray-500">Kepala Desa Muer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-3xl font-bold">Berita Terbaru</h2>
          <Link href="/berita" className="text-blue-600 hover:underline flex items-center">
            Lihat Semua <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-gray-200" />
              <CardHeader>
                <p className="text-xs text-gray-500 mb-1">10 Agustus 2024</p>
                <CardTitle className="text-xl">Pembangunan Jalan Dusun Baru Telah Dimulai</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">
                  Pemerintah Desa Muer resmi memulai proyek pengaspalan jalan...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Peta Lokasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl font-bold mb-6">Peta Lokasi Desa</h2>
        <div className="w-full h-[400px] bg-gray-200 rounded-2xl overflow-hidden border">
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
