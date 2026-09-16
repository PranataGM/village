"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function TransparansiDataPage() {
  const [apbdes, setApbdes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/apbdes")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setApbdes(data);
        setLoading(false);
      });
  }, []);

  const chartData = apbdes.reduce((acc, curr) => {
    let group = acc.find((g: any) => g.tipe === curr.tipe);
    if (!group) {
      group = { tipe: curr.tipe, Anggaran: 0, Realisasi: 0 };
      acc.push(group);
    }
    group.Anggaran += curr.nominal;
    group.Realisasi += curr.realisasi;
    return acc;
  }, []);

  // Detailed Demographics Mock Data
  const dataGender = [
    { name: "Laki-laki", value: 927 },
    { name: "Perempuan", value: 959 },
  ];
  const dataPekerjaan = [
    { name: "Petani/Pekebun", value: 949 },
    { name: "Belum Bekerja", value: 402 },
    { name: "Pelajar/Mahasiswa", value: 349 },
    { name: "Mengurus Rumah Tangga", value: 154 },
    { name: "Lainnya", value: 32 },
  ];
  const dataAgama = [
    { name: "Islam", value: 988 },
    { name: "Katolik", value: 886 },
    { name: "Kristen", value: 7 },
    { name: "Lainnya", value: 1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Data & <span className="text-emerald-600">Transparansi</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Informasi Kependudukan, Realisasi APBDes, dan PPID secara terbuka dan akuntabel.</p>
      </div>

      {/* APBDES SECTION */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-emerald-500 pl-4">Transparansi APBDes</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden bg-emerald-600 text-white">
            <CardHeader className="pb-2 pt-8">
              <CardTitle className="text-2xl font-bold text-center">Ringkasan APBDes {apbdes.length > 0 ? apbdes[0].tahun : "2024"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <p className="text-emerald-100 mb-1">Total Pendapatan</p>
                <h3 className="text-3xl font-black">Rp 881.905.064</h3>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <p className="text-emerald-100 mb-1">Total Belanja</p>
                <h3 className="text-3xl font-black">Rp 907.942.591</h3>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <p className="text-emerald-100 mb-1">Penerimaan Pembiayaan</p>
                <h3 className="text-3xl font-black">Rp 26.037.527</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden">
            <CardHeader className="bg-emerald-50 border-b border-emerald-100 pb-6 pt-8">
              <CardTitle className="text-xl font-bold text-emerald-950 text-center">Grafik Realisasi</CardTitle>
            </CardHeader>
            <CardContent className="h-96 pt-8">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="tipe" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                    <YAxis tickFormatter={(v) => `Rp${v/1000000}M`} axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                    <Tooltip formatter={(v: any) => `Rp ${Number(v).toLocaleString()}`} cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    <Bar dataKey="Anggaran" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="Realisasi" fill="#059669" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 font-medium">Data APBDes belum tersedia</div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* DEMOGRAFI SECTION */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-emerald-500 pl-4">Data Demografi Kependudukan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-md rounded-2xl bg-emerald-50 text-center p-6">
            <p className="text-emerald-700 font-bold mb-2">Total Penduduk</p>
            <h3 className="text-4xl font-black text-gray-900">1.886 <span className="text-lg font-medium text-gray-500">Jiwa</span></h3>
          </Card>
          <Card className="border-none shadow-md rounded-2xl bg-blue-50 text-center p-6">
            <p className="text-blue-700 font-bold mb-2">Laki-Laki</p>
            <h3 className="text-4xl font-black text-gray-900">927 <span className="text-lg font-medium text-gray-500">Jiwa</span></h3>
          </Card>
          <Card className="border-none shadow-md rounded-2xl bg-pink-50 text-center p-6">
            <p className="text-pink-700 font-bold mb-2">Perempuan</p>
            <h3 className="text-4xl font-black text-gray-900">959 <span className="text-lg font-medium text-gray-500">Jiwa</span></h3>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card className="border-none shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-100 pb-4 pt-6">
              <CardTitle className="text-lg font-bold text-gray-900">Berdasarkan Pekerjaan</CardTitle>
            </CardHeader>
            <CardContent className="h-80 pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataPekerjaan} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={120} />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#059669" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-100 pb-4 pt-6">
              <CardTitle className="text-lg font-bold text-gray-900">Berdasarkan Agama</CardTitle>
            </CardHeader>
            <CardContent className="h-80 pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataAgama} cx="50%" cy="50%" innerRadius={60} outerRadius={100} label dataKey="value" stroke="none">
                    <Cell fill="#059669" />
                    <Cell fill="#34d399" />
                    <Cell fill="#a7f3d0" />
                    <Cell fill="#d1fae5" />
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PPID SECTION */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-emerald-500 pl-4">PPID / Informasi Publik</h2>
            <p className="text-gray-500 mt-2 ml-5 max-w-xl">Pejabat Pengelola Informasi dan Dokumentasi (PPID) bertanggung jawab dalam pelayanan informasi secara transparan.</p>
          </div>
        </div>

        <Card className="border-none shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 font-bold tracking-wider">Judul Dokumen</th>
                  <th className="px-8 py-5 font-bold tracking-wider">Kategori Informasi</th>
                  <th className="px-8 py-5 font-bold tracking-wider">Tanggal Diperbarui</th>
                  <th className="px-8 py-5 font-bold tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { judul: "RKA Semester 1", kategori: "Rencana Kerja Pemerintah Desa", tgl: "6 Januari 2026" },
                  { judul: "Laporan Pemeriksaan Pekerjaan", kategori: "Realisasi Pembangunan", tgl: "8 Agustus 2025" },
                  { judul: "SK PPID Desa 2025", kategori: "Peraturan & Keputusan", tgl: "7 Agustus 2025" },
                  { judul: "SOP Pengajuan Keberatan Informasi", kategori: "Daftar Informasi Publik", tgl: "7 Agustus 2025" },
                  { judul: "Daftar Hadir Musrenbang", kategori: "APBDes", tgl: "7 Agustus 2025" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-8 py-5 font-bold text-emerald-700">{item.judul}</td>
                    <td className="px-8 py-5"><span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">{item.kategori}</span></td>
                    <td className="px-8 py-5 text-gray-500">{item.tgl}</td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-emerald-600 hover:text-emerald-800 font-bold underline text-sm">Unduh</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
