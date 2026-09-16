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

  // Mock data untuk kependudukan
  const pendudukGender = [
    { name: "Laki-laki", value: 1250 },
    { name: "Perempuan", value: 1200 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Data & <span className="text-emerald-600">Transparansi</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Informasi Kependudukan dan Realisasi APBDes secara terbuka dan akuntabel.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden">
          <CardHeader className="bg-emerald-50 border-b border-emerald-100 pb-6 pt-8">
            <CardTitle className="text-2xl font-bold text-emerald-950 text-center">Data Demografi Penduduk</CardTitle>
          </CardHeader>
          <CardContent className="h-96 pt-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pendudukGender} cx="50%" cy="50%" innerRadius={80} outerRadius={120} label dataKey="value" stroke="none">
                  <Cell fill="#059669" /> {/* emerald-600 */}
                  <Cell fill="#34d399" /> {/* emerald-400 */}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden">
          <CardHeader className="bg-emerald-50 border-b border-emerald-100 pb-6 pt-8">
            <CardTitle className="text-2xl font-bold text-emerald-950 text-center">Transparansi APBDes {apbdes.length > 0 ? apbdes[0].tahun : ""}</CardTitle>
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

      {apbdes.length > 0 && (
        <Card className="border-none shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden">
          <CardHeader className="bg-emerald-50 border-b border-emerald-100 pb-6 pt-8">
            <CardTitle className="text-2xl font-bold text-emerald-950">Rincian APBDes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-5 font-bold tracking-wider">Tipe</th>
                    <th className="px-8 py-5 font-bold tracking-wider">Kategori</th>
                    <th className="px-8 py-5 font-bold tracking-wider text-right">Nominal Anggaran</th>
                    <th className="px-8 py-5 font-bold tracking-wider text-right">Realisasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {apbdes.map((item, i) => (
                    <tr key={i} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="px-8 py-5 font-semibold text-gray-900">{item.tipe}</td>
                      <td className="px-8 py-5">{item.kategori}</td>
                      <td className="px-8 py-5 text-right font-medium text-gray-600">Rp {item.nominal.toLocaleString()}</td>
                      <td className="px-8 py-5 text-right font-bold text-emerald-600">Rp {item.realisasi.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
