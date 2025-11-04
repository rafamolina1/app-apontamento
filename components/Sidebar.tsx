// components/Sidebar.tsx
"use client"; // Este componente usa hooks (usePathname)

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare, // Ícone para WhatsApp
  Book, // Ícone para Base de Conhecimento
  Settings,
  LucideProps,
  UserCog, // Ícone para Perfil
} from "lucide-react";
import React from "react";

// Define o tipo para os links
type NavLink = {
  href: string;
  label: string;
  icon: React.ComponentType<LucideProps>;
};

// ATUALIZADO: Agora com todos os links
const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/agentes", label: "Agentes", icon: Users },
  { href: "/dashboard/whatsapp", label: "WhatsApp", icon: MessageSquare },
  {
    href: "/dashboard/conhecimento",
    label: "Base de Conhecimento",
    icon: Book,
  },
  {
    href: "/dashboard/configuracoes",
    label: "Configurações",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // Alterado para flex-col para o Perfil ficar no final
    <aside className="hidden w-64 flex-col bg-white shadow-md md:flex">
      <div>
        {/* Logo/Header da Sidebar */}
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
            C
          </div>
          <span className="ml-3 text-lg font-semibold text-gray-800">
            custom
          </span>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-gray-100 text-gray-900" // Estilo ativo
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900" // Estilo inativo
                  }`}
                >
                  <link.icon className="mr-3 h-5 w-5" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* NOVO: Navegação Inferior (Perfil) */}
      {/* "mt-auto" empurra este item para o final */}
      <nav className="mt-auto p-4">
        <Link
          href="/dashboard/perfil"
          className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
            pathname === "/dashboard/perfil"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <UserCog className="mr-3 h-5 w-5" />
          Perfil
        </Link>
      </nav>
    </aside>
  );
}
