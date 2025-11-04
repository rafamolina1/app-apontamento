// app/(dashboard)/dashboard/agentes/page.tsx
import React from "react";
import AgentStatCard from "@/components/AgentStatCard";
import AgentDetailCard from "@/components/AgentDetailCard";
import NewAgentButton from "@/components/NewAgentButton"; // NOVO: Componente Cliente
import { Users, Zap, X } from "lucide-react";

// --- DADOS MOCADOS PARA OS CARDS DE VISÃO GERAL ---
const topStats = [
  {
    title: "Total de Agentes",
    value: "12",
    Icon: Users,
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Agentes Ativos",
    value: "9",
    Icon: Users,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Interações/Hora",
    value: "156",
    Icon: Zap,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Com Erros",
    value: "1",
    Icon: X,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
];

// --- DADOS MOCADOS PARA O CARD DETALHADO ---
const agentVendasData = {
  conexoes: 45,
  interacoes: 342,
  nps: 9.1,
  tempoResposta: "1.2s",
  taxaSucesso: 94,
};

// --- DADOS MOCADOS PARA A BARRA DE STATUS ---
const statusTabs = [
  { label: "Todos", count: 12 },
  { label: "Ativos", count: 9 },
  { label: "Inativos", count: 2 },
  { label: "Com Erros", count: 1 },
];

export default function AgentesPage() {
  const activeTab = "Ativos";

  return (
    <div className="space-y-8">
      {/* HEADER DA PÁGINA */}
      <div className="flex justify-between items-center pb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciamento de Agentes
          </h1>
          <p className="mt-1 text-gray-600">
            Crie, configure e monitore seus agentes de IA
          </p>
        </div>

        {/* BOTÃO DE AÇÃO (AGORA É O COMPONENTE CLIENTE) */}
        <NewAgentButton />
      </div>

      {/* CARDS DE VISÃO GERAL (O GRID DE 4 CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topStats.map((stat) => (
          <AgentStatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* BARRA DE STATUS/FILTRO (Os botões de filtro também precisariam ser Client Components) */}
      <div className="flex border-b border-gray-200">
        {statusTabs.map((tab) => (
          <button
            key={tab.label}
            // NOTE: Os botões de filtro não têm onClick, o que os torna seguros no Server Component.
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab.label === activeTab
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* VISÃO DETALHADA DOS AGENTES */}
      <div className="space-y-4">
        <AgentDetailCard
          name="Agente Vendas"
          status="Ativo"
          role="Vendas"
          data={agentVendasData}
        />
        {/* Outros cards de agente iriam aqui */}
      </div>
    </div>
  );
}
