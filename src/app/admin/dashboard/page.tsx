export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="font-semibold tracking-tight text-sm text-muted-foreground">Total Penduduk</div>
          <div className="text-2xl font-bold mt-2">1,234</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="font-semibold tracking-tight text-sm text-muted-foreground">Surat Diproses</div>
          <div className="text-2xl font-bold mt-2">12</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="font-semibold tracking-tight text-sm text-muted-foreground">Aduan Masuk</div>
          <div className="text-2xl font-bold mt-2">3</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="font-semibold tracking-tight text-sm text-muted-foreground">Berita Terbit</div>
          <div className="text-2xl font-bold mt-2">24</div>
        </div>
      </div>
    </div>
  )
}
