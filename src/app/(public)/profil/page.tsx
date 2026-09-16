import { Card, CardContent } from "@/components/ui/card";
import { Users, History, Target } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Profil Desa <span className="text-emerald-600">Muer</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Mengenal lebih dekat sejarah, visi misi, dan jajaran Pemerintah Desa Muer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Sejarah Section */}
          <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-emerald-900/5 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <History className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Sejarah Desa</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
              <p>
                Desa Muer didirikan pada tahun 1920 oleh sekelompok masyarakat yang bermigrasi dari wilayah pegunungan sekitarnya. 
                Nama "Muer" sendiri diambil dari bahasa lokal kuno yang berarti "Mata Air Kehidupan", melambangkan sumber air 
                yang tak pernah putus yang mengaliri lahan pertanian warga hingga saat ini.
              </p>
              <p>
                Seiring berjalannya waktu, Desa Muer terus berkembang menjadi desa mandiri, dengan mayoritas penduduk 
                bermata pencaharian sebagai petani padi dan peternak. Pemerintahan desa pertama kali dibentuk secara formal pada tahun 1945 
                pasca kemerdekaan, dan terus beradaptasi dengan kemajuan teknologi hingga kini memiliki portal pelayanan administrasi digital mandiri.
              </p>
            </div>
          </section>

          {/* Visi Misi Section */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Visi & Misi</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg shadow-emerald-900/5 border-none rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-2">
                <CardContent className="p-8">
                  <h3 className="font-black text-2xl mb-4 text-emerald-50">Visi</h3>
                  <p className="text-xl leading-relaxed italic text-emerald-100">
                    "Mewujudkan Desa Muer yang Mandiri, Sejahtera, dan Berbudaya melalui Tata Kelola Pemerintahan yang Bersih, Digital, dan Transparan."
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg shadow-emerald-900/5 border-none rounded-3xl p-2 bg-white">
                <CardContent className="p-6">
                  <h3 className="font-black text-2xl mb-4 text-gray-900">Misi</h3>
                  <ul className="space-y-4 text-gray-600 font-medium">
                    <li className="flex items-start gap-3">
                      <span className="bg-emerald-100 text-emerald-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      Meningkatkan kualitas dan kecepatan pelayanan publik berbasis digital.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-emerald-100 text-emerald-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      Mendorong perekonomian desa melalui pemberdayaan UMKM dan optimalisasi lahan pertanian.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-emerald-100 text-emerald-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      Menjaga kelestarian lingkungan hidup dan kekayaan budaya lokal.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-emerald-100 text-emerald-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                      Mengoptimalkan transparansi informasi dan partisipasi warga dalam pembangunan.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Kondisi Geografis & Demografi */}
          <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-emerald-900/5 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Kondisi Geografis & Demografi</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Batas Wilayah</p>
                <ul className="text-gray-700 space-y-1">
                  <li><span className="font-medium">Utara:</span> Desa Sukamaju</li>
                  <li><span className="font-medium">Selatan:</span> Hutan Lindung</li>
                  <li><span className="font-medium">Timur:</span> Sungai Brantas</li>
                  <li><span className="font-medium">Barat:</span> Desa Karanganyar</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Topografi</p>
                <p className="text-gray-700">Mayoritas Dataran Rendah dan Perbukitan (Ketinggian 200 - 450 mdpl).</p>
                
                <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mt-4">Luas Wilayah</p>
                <p className="text-gray-700">± 1.250 Hektar (12.5 km&sup2;)</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Aparatur Desa */}
          <section className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-600/30">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Perangkat Desa</h2>
            </div>
            
            <div className="grid gap-6">
              {/* Kepala Desa */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 bg-[url('https://dummyimage.com/150x150/10b981/fff&text=Kades')] bg-cover" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Budi Santoso</h4>
                  <p className="text-sm font-semibold text-emerald-600">Kepala Desa</p>
                </div>
              </div>
              {/* Sekdes */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 bg-[url('https://dummyimage.com/150x150/10b981/fff&text=Sekdes')] bg-cover" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Ahmad Fauzi, S.E.</h4>
                  <p className="text-sm font-semibold text-emerald-600">Sekretaris Desa</p>
                </div>
              </div>
              {/* Kaur */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 bg-[url('https://dummyimage.com/150x150/10b981/fff&text=Kaur')] bg-cover" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Siti Aminah, S.Ak.</h4>
                  <p className="text-sm font-semibold text-emerald-600">Kaur Keuangan</p>
                </div>
              </div>
              {/* Kasi */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 bg-[url('https://dummyimage.com/150x150/10b981/fff&text=Kasi')] bg-cover" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Rahmad Hidayat</h4>
                  <p className="text-sm font-semibold text-emerald-600">Kasi Pemerintahan</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
