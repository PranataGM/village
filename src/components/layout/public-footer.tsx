export function PublicFooter() {
  return (
    <footer className="bg-emerald-950 text-emerald-50 py-12 mt-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight">Desa Muer</h3>
          </div>
          <p className="text-emerald-200/80 leading-relaxed max-w-sm">
            Portal resmi sistem informasi desa untuk pelayanan publik yang lebih baik, cepat, dan transparan.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 text-white">Kontak Kami</h3>
          <ul className="space-y-3 text-emerald-200/80">
            <li className="flex items-start gap-3"><span className="text-emerald-400">📍</span> Kantor Kepala Desa Muer, Kecamatan Sumbawa</li>
            <li className="flex items-center gap-3"><span className="text-emerald-400">📞</span> (0371) 123456</li>
            <li className="flex items-center gap-3"><span className="text-emerald-400">✉️</span> pemdes@muer.desa.id</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 text-white">Jam Layanan</h3>
          <ul className="space-y-3 text-emerald-200/80">
            <li className="flex justify-between border-b border-emerald-800/50 pb-2"><span>Senin - Kamis:</span> <span className="font-medium text-emerald-100">08:00 - 15:00</span></li>
            <li className="flex justify-between border-b border-emerald-800/50 pb-2"><span>Jumat:</span> <span className="font-medium text-emerald-100">08:00 - 11:30</span></li>
            <li className="flex justify-between"><span>Sabtu - Minggu:</span> <span className="font-medium text-red-400">Tutup</span></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-emerald-900 text-center text-sm text-emerald-400/60">
        &copy; {new Date().getFullYear()} Pemerintah Desa Muer. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
