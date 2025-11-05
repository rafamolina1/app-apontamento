// components/Header.tsx
// Removemos o 'use client' pois não há mais componentes interativos aqui

import { Bell, Sun } from "lucide-react";
// Removemos a importação do UserButton

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

        {/* Avatar Falso (Opcional, ou pode remover este div) */}
        <div className="h-9 w-9 cursor-pointer rounded-full bg-gray-300">
          {/* Avatar do Usuário (Placeholder) */}
        </div>
      </div>
    </header>
  );
}
