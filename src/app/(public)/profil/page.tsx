import { Card, CardContent } from "@/components/ui/card";
import { Users, History, Target } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Profil Desa Muer</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Mengenal lebih dekat sejarah, visi misi, dan jajaran Pemerintah Desa Muer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <History className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold">Sejarah Desa</h2>
            </div>
            <div className="prose max-w-none text-gray-600 leading-relaxed">
              <p>
                Desa Muer didirikan pada tahun 1920 oleh sekelompok masyarakat yang bermigrasi dari wilayah sekitarnya. 
                Nama "Muer" sendiri diambil dari bahasa lokal yang berarti "Air yang Mengalir", melambangkan sumber kehidupan 
                yang tak pernah putus bagi masyarakat setempat.
              </p>
              <p className="mt-4">
                Seiring berjalannya waktu, Desa Muer terus berkembang menjadi desa yang mandiri, dengan mayoritas penduduk 
                bermata pencaharian sebagai petani dan peternak. Pemerintahan desa pertama kali dibentuk secara formal pada tahun 1945 
                pasca kemerdekaan, dan terus mengalami pergantian kepemimpinan hingga saat ini.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold">Visi & Misi</h2>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Visi</h3>
                <p className="italic text-gray-600 mb-6">"Mewujudkan Desa Muer yang Mandiri, Sejahtera, dan Berbudaya melalui Tata Kelola Pemerintahan yang Bersih dan Transparan."</p>
                
                <h3 className="font-bold text-lg mb-2">Misi</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Meningkatkan kualitas pelayanan publik.</li>
                  <li>Mendorong perekonomian desa melalui pemberdayaan UMKM dan Pertanian.</li>
                  <li>Menjaga kelestarian lingkungan dan budaya lokal.</li>
                  <li>Mengoptimalkan transparansi informasi dan tata kelola keuangan desa.</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold">Pemerintah Desa</h2>
            </div>
            <div className="grid gap-4">
              {/* Kepala Desa */}
              <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Budi Santoso</h4>
                  <p className="text-sm text-emerald-600">Kepala Desa</p>
                </div>
              </div>
              {/* Sekdes */}
              <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Ahmad Fauzi</h4>
                  <p className="text-sm text-emerald-600">Sekretaris Desa</p>
                </div>
              </div>
              {/* Kaur */}
              <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Siti Aminah</h4>
                  <p className="text-sm text-emerald-600">Kaur Keuangan</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
