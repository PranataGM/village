"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center space-x-3 text-gray-600 hover:text-red-600 w-full px-3 py-2 rounded-md transition-colors"
    >
      <LogOut size={20} />
      <span className="font-medium">Logout</span>
    </button>
  );
}
