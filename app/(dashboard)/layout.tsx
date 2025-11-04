// app/(dashboard)/layout.tsx
import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // "flex" por padrão é "flex-row", colocando os itens lado a lado
    <div className="flex h-screen bg-gray-100">
      {/* ITEM 1: A Sidebar. 
        Como é o primeiro item no 'flex-row', ela fica na esquerda.
      */}
      <Sidebar />

      {/* ITEM 2: A Área de Conteúdo Principal.
        "flex-1" faz ela ocupar o resto do espaço disponível.
      */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header (Topo) */}
        <Header />

        {/* Conteúdo da Página (será o page.tsx) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
