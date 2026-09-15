export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">SIDesa Muer</h3>
          <p className="text-gray-400">Sistem Informasi Desa Muer. Memberikan pelayanan publik yang transparan, cepat, dan mudah bagi seluruh warga.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/profil" className="hover:text-white">Profil Desa</a></li>
            <li><a href="/layanan/pengajuan" className="hover:text-white">Ajukan Surat</a></li>
            <li><a href="/pengaduan" className="hover:text-white">Lapor Warga</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontak</h3>
          <p className="text-gray-400">Jl. Raya Muer No. 1</p>
          <p className="text-gray-400">Kecamatan, Kabupaten</p>
          <p className="text-gray-400 mt-2">Email: info@desa-muer.go.id</p>
          <p className="text-gray-400">Telepon: (021) 1234567</p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Pemerintah Desa Muer. All rights reserved.</p>
      </div>
    </footer>
  );
}
