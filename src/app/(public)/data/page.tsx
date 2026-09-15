"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function TransparansiDataPage() {
  const [apbdes, setApbdes] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/apbdes")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setApbdes(data);
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
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Transparansi & Data Desa</h1>
        <p className="text-xl text-gray-600">Informasi Kependudukan dan Realisasi APBDes secara terbuka.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Data Demografi Penduduk</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pendudukGender} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                  {pendudukGender.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transparansi APBDes {apbdes.length > 0 ? apbdes[0].tahun : ""}</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tipe" />
                  <YAxis tickFormatter={(v) => `Rp${v/1000000}M`} />
                  <Tooltip formatter={(v: any) => `Rp ${Number(v).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="Anggaran" fill="#8884d8" />
                  <Bar dataKey="Realisasi" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">Data APBDes belum tersedia</div>
            )}
          </CardContent>
        </Card>
      </div>

      {apbdes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Rincian APBDes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Tipe</th>
                    <th className="px-6 py-3">Kategori</th>
                    <th className="px-6 py-3 text-right">Nominal Anggaran</th>
                    <th className="px-6 py-3 text-right">Realisasi</th>
                  </tr>
                </thead>
                <tbody>
                  {apbdes.map((item, i) => (
                    <tr key={i} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium">{item.tipe}</td>
                      <td className="px-6 py-4">{item.kategori}</td>
                      <td className="px-6 py-4 text-right text-blue-600 font-medium">Rp {item.nominal.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right text-green-600 font-medium">Rp {item.realisasi.toLocaleString()}</td>
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
