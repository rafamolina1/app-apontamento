// components/CustomUserButton.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { LogOut, User, Settings } from "lucide-react";

export default function CustomUserButton() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Função de logout que FORÇA um hard reload
  const handleSignOut = () => {
    signOut(() => {
      // Usamos window.location.href em vez de router.push
      // para forçar um recarregamento da página, limpando o cache.
      window.location.href = "/";
    });
  };

  // Fecha o menu se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  if (!user) return null; // Não mostra nada se o usuário ainda não carregou

  return (
    <div className="relative" ref={menuRef}>
      {/* O Avatar clicável */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <img
          src={user.imageUrl}
          alt={user.fullName || "Avatar do usuário"}
          className="w-9 h-9 rounded-full border-2 border-transparent hover:border-gray-300 transition-colors"
        />
      </button>

      {/* O Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-2">
            {/* Informação do Usuário */}
            <div className="flex items-center p-2 border-b border-gray-100 mb-2">
              <img
                src={user.imageUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>

            {/* Opções (Gerenciar Conta) */}
            <a
              href="/dashboard/perfil" // Link para a página de perfil que já existe
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
            >
              <User className="w-4 h-4 mr-2" />
              Gerenciar Perfil
            </a>

            {/* Botão Sair */}
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-md hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
