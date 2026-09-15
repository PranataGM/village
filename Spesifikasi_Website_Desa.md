# Dokumen Spesifikasi Sistem Informasi Desa (SID)
**Target Eksekusi:** AntiGravity Agent (AI Coding Agent)
**Tipe Proyek:** Fullstack Web Application (Sistem Informasi & Pelayanan Publik)

Dokumen ini berisi spesifikasi teknis dan bisnis yang sangat rinci untuk membangun Website Desa (Sistem Informasi Desa/SID). Gunakan dokumen ini sebagai cetak biru (blueprint) utama dalam melakukan generate kode.

---

## 1. Tumpukan Teknologi (Tech Stack) yang Disarankan
Agent harus mengonfigurasi proyek menggunakan tumpukan teknologi modern berikut:
*   **Frontend & Backend (Meta-framework):** Next.js (App Router, TypeScript)
*   **Styling:** Tailwind CSS + Shadcn UI (untuk komponen UI yang cepat dan dapat diakses)
*   **Database:** MySQL
*   **ORM:** Prisma ORM
*   **Authentication:** NextAuth.js (Auth.js) dengan skema Role-Based Access Control (RBAC)
*   **State Management (Client):** Zustand (jika diperlukan) atau React Query untuk fetching.
*   **Form Validation:** React Hook Form + Zod
*   **File Storage:** AWS S3 / Supabase Storage / Cloudinary (untuk menyimpan pas foto, KTP, KK, gambar berita).
*   **Document Generation:** `pdf-lib` atau `puppeteer`/`react-pdf` (untuk mencetak surat keterangan secara otomatis menjadi PDF).

---

## 2. Struktur Navigasi & Menu (Sitemap)

### A. Tampilan Publik (Public Facing - Frontend)
*   **Beranda (Home)**
*   **Profil Desa**
    *   Sejarah Desa
    *   Visi & Misi
    *   Pemerintah Desa (Struktur Organisasi)
    *   Peta & Wilayah
*   **Transparansi & Data**
    *   Data Kependudukan (Statistik)
    *   Transparansi APBDes (Anggaran Desa)
*   **Layanan Warga (E-Layanan)**
    *   Pengajuan Surat Online
    *   Cek Status Pengajuan
*   **Informasi Publik**
    *   Berita / Artikel
    *   Pengumuman
    *   Galeri Kegiatan
*   **Kontak & Pengaduan**
    *   Hubungi Kami
    *   Lapor Warga!

### B. Tampilan Admin (Dashboard Backend)
*   **Dashboard Utama** (Statistik Overview)
*   **Manajemen Penduduk** (Buku Induk Desa)
*   **Manajemen Layanan Surat** (Inbox Pengajuan, Proses, Cetak)
*   **Manajemen Transparansi** (Input APBDes)
*   **Manajemen Konten (CMS)** (Berita, Pengumuman, Galeri)
*   **Manajemen Pesan & Pengaduan**
*   **Pengaturan** (Profil Desa, Manajemen Pengguna/Admin)

---

## 3. Detail Konten & Fitur per Halaman

### Bagian 1: Portal Publik (Frontend)

#### 1. Beranda (`/`)
*   **Hero Section:** Carousel foto HD desa, teks sambutan, tombol CTA "Ajukan Surat Online".
*   **Widget Statistik Cepat:** Total Penduduk, Jumlah Laki-laki/Perempuan, Jumlah Kepala Keluarga (diambil dari DB Kependudukan).
*   **Akses Cepat (Quick Links):** Ikon menu menuju Layanan Surat, Lapor Warga, Info APBDes.
*   **Berita Terbaru:** Grid 3 berita terakhir.
*   **Sambutan Kepala Desa:** Foto Kades, nama, dan kutipan sambutan.
*   **Peta Lokasi:** Sematan Google Maps titik kordinat kantor desa.

#### 2. Profil Desa (`/profil/...`)
*   **Sejarah:** Teks panjang artikel sejarah desa.
*   **Visi Misi:** Daftar visi dan misi terstruktur.
*   **Pemerintah Desa:** Hierarki/Bagan organisasi (Kades, Sekdes, Kaur, Kadus). Menampilkan foto, nama, dan jabatan.
*   **Peta & Wilayah:** Menampilkan peta batas wilayah administrasi (bisa integrasi Leaflet.js dengan file GeoJSON desa) dan deskripsi batas utara/selatan/timur/barat.

#### 3. Transparansi & Data (`/data/...`)
*   **Data Kependudukan:** Menampilkan grafik (menggunakan Recharts/Chart.js).
    *   Grafik Piramida Penduduk (Berdasarkan Usia dan Kelamin).
    *   Grafik Lingkaran (Agama, Pendidikan, Pekerjaan).
*   **Transparansi APBDes:** Infografis interaktif atau tabel yang menunjukkan Pendapatan Desa, Belanja Desa, dan Pembiayaan. Tampilkan bar progress (Persentase penyerapan anggaran).

#### 4. Layanan Surat (`/layanan/pengajuan`)
*   Ini adalah fitur paling kritikal. Warga tidak perlu login untuk mengajukan, namun diverifikasi via NIK.
*   **Alur:**
    1. Warga memilih jenis surat (Keterangan Domisili, Keterangan Usaha, Keterangan Tidak Mampu, Pengantar SKCK).
    2. Mengisi NIK. Sistem melakukan pengecekan apakah NIK terdaftar di database kependudukan desa.
    3. Jika terdaftar, nama otomatis terisi (Read-only).
    4. Mengisi field tambahan sesuai jenis surat (misal: Nama Usaha untuk SKU).
    5. Upload syarat (Foto KTP, Foto KK).
    6. Submit. Warga mendapat "Nomor Resi / Tiket" untuk melacak.
*   **Cek Status (`/layanan/cek-status`):** Input Nomor Resi. Output: Menampilkan timeline status (Menunggu Validasi -> Diproses -> Selesai/Ditolak).

#### 5. Kontak & Pengaduan (`/pengaduan`)
*   Formulir Lapor Warga: Nama (opsional/anonim), Kategori Laporan (Infrastruktur, Sosial, Keamanan), Detail Laporan, Upload Bukti Foto.

### Bagian 2: Dashboard Admin (Backend)

*Membutuhkan Login. Terdapat dua Role: SUPERADMIN (Sekdes/Admin IT) dan STAFF (Kaur Pelayanan).*

#### 1. Dashboard (`/admin/dashboard`)
*   Statistik realtime: Surat Masuk Hari Ini, Total Surat Selesai Bulan Ini, Total Penduduk, Jumlah Aduan Belum Dibaca.
*   Log Aktivitas (Audit Trail): Menampilkan siapa admin yang login atau mengubah data terakhir kali.

#### 2. Manajemen Penduduk (`/admin/penduduk`)
*   **Tabel Data Induk:** Menampilkan seluruh warga. Fitur: Search by NIK/Nama, Filter by Dusun/RT/RW, Pagination.
*   **Aksi:** Tambah, Edit, Hapus, Detail.
*   **Form Tambah Penduduk:** NIK, No KK, Nama Lengkap, Tempat Lahir, Tanggal Lahir, Jenis Kelamin, Agama, Pendidikan Terakhir, Pekerjaan, Golongan Darah, Status Kawin, Hubungan Keluarga, Alamat, RT/RW, Dusun, Status Kependudukan (Tetap/Pindah/Meninggal).

#### 3. Manajemen Layanan Surat (`/admin/layanan`)
*   **Inbox Surat:** Tabel antrean surat masuk.
*   **Detail Pengajuan:** Menampilkan data pemohon dan dokumen lampiran (KTP/KK) bersebelahan (split screen) untuk mempermudah validasi admin.
*   **Aksi Validasi:**
    *   Tombol "Tolak" (Wajib mengisi alasan penolakan).
    *   Tombol "Proses".
    *   Tombol "Selesai & Cetak".
*   **Cetak PDF:** Sistem otomatis menghasilkan PDF surat resmi (ada Kop Surat Desa, Nomor Surat dinamis, data warga otomatis masuk, dan Tanda Tangan/Barcode/QR Code Kades di bawah).

#### 4. Manajemen Konten (`/admin/konten/berita`)
*   Tabel artikel.
*   Editor WYSIWYG (TipTap / React Quill) untuk menulis berita.
*   Input: Judul, Slug, Kategori, Thumbnail Image, Body Content, Status (Draft/Published).

#### 5. Transparansi APBDes (`/admin/apbdes`)
*   Formulir input tahun anggaran.
*   Tabel input dinamis untuk kategori Pendapatan dan Belanja beserta nominalnya.

---

## 4. Keamanan & Proteksi (Security)

Agent harus mengimplementasikan standar keamanan berikut:
1.  **Authentication & Authorization:**
    *   Admin dashboard dilindungi oleh NextAuth.js.
    *   Halaman `/admin/...` dilindungi middleware yang mengecek *session*.
    *   Password di-hash menggunakan `bcryptjs` (min. 10 salt rounds).
2.  **Proteksi API (Rate Limiting & CSRF):**
    *   API Routes publik (seperti pengajuan surat dan form pengaduan) wajib memiliki Rate Limiting (misal: 1 NIK maksimal 3 pengajuan per hari) untuk menghindari spam/DDoS.
    *   Token CSRF pada form POST.
3.  **Data Privacy:**
    *   Nomor Induk Kependudukan (NIK) dan Nomor Kartu Keluarga (KK) tidak boleh diekspos di API Publik secara utuh, kecuali untuk kebutuhan validasi pemiliknya. Terapkan data masking jika ditampilkan di UI publik (misal: `320111*******123`).
4.  **SQL Injection & XSS Protection:**
    *   Penggunaan ORM (Prisma) sudah memitigasi SQL Injection dasar, tetapi Agent harus menggunakan sanitasi untuk semua input HTML pada CMS Berita menggunakan `DOMPurify` untuk menghindari XSS.

---

## 5. Validasi Input & Aturan Bisnis (Zod Schema)

Terapkan validasi ketat menggunakan Zod di Client-side dan Server-side:

### A. Validasi Kependudukan
*   `nik`: Wajib String, tepat 16 karakter, hanya boleh angka (`/^\d{16}$/`).
*   `no_kk`: Wajib String, tepat 16 karakter, hanya boleh angka.
*   `nama`: Wajib String, minimal 3 karakter, tidak boleh mengandung angka/simbol.
*   `tanggal_lahir`: Tidak boleh lebih dari hari ini (No future dates).

### B. Validasi Pengajuan Surat
*   `jenis_surat`: Enum (DOMISILI, USAHA, TIDAK_MAMPU, PENGANTAR).
*   `lampiran_ktp`: Wajib diunggah, format file (.jpg, .jpeg, .png, .pdf), ukuran maksimal 2 MB. Mime-type checking di backend!
*   `keperluan`: String, wajib diisi, minimal 10 karakter.

### C. Validasi Pengaduan
*   `judul_laporan`: Minimal 5 karakter, maksimal 100.
*   `kategori`: Enum (INFRASTRUKTUR, KEAMANAN, LINGKUNGAN, SOSIAL).

---

## 6. Arsitektur Database (Konsep Skema Prisma)

Agent harus membuat `schema.prisma` yang setidaknya mencakup model berikut:

*   **Model User (Admin)**: `id`, `username`, `password_hash`, `role` (SUPERADMIN, STAFF), `created_at`.
*   **Model Penduduk**: `id`, `nik` (@unique), `no_kk`, `nama`, `tempat_lahir`, `tgl_lahir`, `jenis_kelamin`, `agama`, `pendidikan`, `pekerjaan`, `alamat`, `rt`, `rw`, `dusun`, `status_dasar` (HIDUP/MATI/PINDAH). Relasi 1-to-many ke model PengajuanSurat.
*   **Model PengajuanSurat**: `id`, `resi` (@unique), `pendudukId` (FK), `jenis_surat`, `keperluan`, `data_tambahan` (JSON, misal untuk nama usaha), `lampiran_ktp_url`, `lampiran_kk_url`, `status` (PENDING, PROSES, REJECTED, DONE), `alasan_tolak`, `created_at`, `updated_at`.
*   **Model Pengaduan**: `id`, `nama_pelapor` (opsional), `kategori`, `deskripsi`, `bukti_url`, `status` (UNREAD, READ, RESOLVED), `created_at`.
*   **Model Berita**: `id`, `slug` (@unique), `judul`, `konten`, `thumbnail_url`, `authorId` (FK), `is_published`, `created_at`.
*   **Model APBDes**: `id`, `tahun`, `tipe` (PENDAPATAN, BELANJA, PEMBIAYAAN), `kategori`, `nominal`, `realisasi`.

---

## 7. Urutan Pengerjaan (Agent Instructions)
Agent, kerjakan proyek ini dalam fase-fase berikut. Lakukan generate kode per fase dan jangan lanjutkan ke fase berikutnya sebelum fase saat ini selesai dan lolos tes kompilasi.

*   **Fase 1: Setup Proyek & Infrastruktur Dasar** (Init Next.js, Tailwind, setup Prisma Schema, push ke DB lokal).
*   **Fase 2: Autentikasi & Layouting Admin** (Setup NextAuth, buat Layout Admin Sidebar/Navbar, halaman Login).
*   **Fase 3: CRUD Penduduk (Admin)** (Buat API Route dan halaman antarmuka Manajemen Penduduk lengkap dengan validasi form).
*   **Fase 4: Portal Publik - Halaman Statis** (Beranda, Profil Desa, Peta).
*   **Fase 5: Sistem Layanan Surat** (Form publik pencarian NIK & upload file, Resi Tracking, Admin Inbox, Approval Logic, integrasi library cetak PDF).
*   **Fase 6: CMS Berita & Transparansi** (Dashboard CRUD Berita, Input data APBDes, render data di halaman Publik dengan Recharts).
*   **Fase 7: Form Pengaduan & Finishing** (Fitur lapor warga, dashboard statistik utama admin, proteksi endpoint, UI polish).

**CATATAN PENTING UNTUK AGENT:** Selalu perhatikan performa komponen client (`"use client"`) vs server (`Server Components`). Minimalkan *client components* hanya pada elemen yang membutuhkan interaktivitas (seperti Form, Chart, dan State Toggle).
