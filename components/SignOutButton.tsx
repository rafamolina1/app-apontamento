// components/SignOutButton.tsx
"use client"; // Componente cliente, pois usa hooks

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react"; // Ícone de "Sair"

export default function SignOutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = () => {
    // Faz o logout no Clerk e redireciona para a raiz ('/') após o sucesso
    signOut(() => router.push("/"));
  };

  return (
    <button
      onClick={handleSignOut}
      // Usamos as mesmas classes da sidebar para parecer um link
      className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    >
      <LogOut className="mr-3 h-5 w-5" />
      Sair
    </button>
  );
}
