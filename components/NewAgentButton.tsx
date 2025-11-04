// components/NewAgentButton.tsx
"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function NewAgentButton() {
  const handleAddAgent = () => {
    // Aqui você colocaria a lógica real: abrir um modal, navegar para uma nova página, etc.
    alert("Funcionalidade de Novo Agente Ativada!");
    console.log("Abrir Modal para Adicionar Agente");
  };

  return (
    <button
      className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
      onClick={handleAddAgent} // AGORA FUNCIONA!
    >
      <Plus className="w-5 h-5" />
      <span>Novo Agente</span>
    </button>
  );
}
