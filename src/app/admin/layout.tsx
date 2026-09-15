import { ReactNode } from "react"
import Link from "next/link"
import { Home, Users, FileText, BarChart3, Settings, LogOut, MessageSquare, LayoutDashboard } from "lucide-react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin SIDesa</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem href="/admin/penduduk" icon={<Users size={20} />} label="Penduduk" />
          <NavItem href="/admin/layanan" icon={<FileText size={20} />} label="Layanan Surat" />
          <NavItem href="/admin/apbdes" icon={<BarChart3 size={20} />} label="Transparansi" />
          <NavItem href="/admin/konten" icon={<Home size={20} />} label="CMS Konten" />
          <NavItem href="/admin/pengaduan" icon={<MessageSquare size={20} />} label="Pengaduan" />
          <NavItem href="/admin/pengaturan" icon={<Settings size={20} />} label="Pengaturan" />
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center space-x-3 text-gray-600 hover:text-red-600 w-full px-3 py-2 rounded-md transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar (optional, if needed for mobile toggle or profile) */}
        <header className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Dashboard</h1>
          {/* Mobile menu button here later if needed */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              A
            </div>
            <span className="text-sm font-medium text-gray-700">Admin Desa</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavItem({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center space-x-3 px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}
