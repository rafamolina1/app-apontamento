// components/Header.tsx
"use client"; // Continua 'use client' por causa do CustomUserButton

import { Bell, Sun } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import CustomUserButton from "./CustomUserButton"; // NOVO: Importamos nosso botão customizado

export default function Header() {
  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-end border-b bg-white px-6">
      <div className="flex items-center space-x-4">
        {/* Ícone de Tema (Dark/Light) */}
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <Sun className="h-6 w-6" />
        </button>

        {/* Ícone de Notificações */}
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <Bell className="h-6 w-6" />
        </button>

        {/* 1. O Seletor de Organizações (o seu 'realID') */}
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/dashboard"
          afterSelectOrganizationUrl="/dashboard"
          appearance={{
            elements: {
              organizationSwitcherTrigger: "p-2 rounded-lg hover:bg-gray-100",
            },
          }}
        />

        {/* 2. O Botão de Perfil/Sair (AGORA CUSTOMIZADO) */}
        <CustomUserButton />
      </div>
    </header>
  );
}
