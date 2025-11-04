// components/AgentDetailCard.tsx
import React from "react";
import { User, Zap, BarChart3, Clock, MoreVertical } from "lucide-react";

type AgentDetailCardProps = {
  name: string;
  status: "Ativo" | "Inativo";
  role: string;
  data: {
    conexoes: number;
    interacoes: number;
    nps: number;
    tempoResposta: string;
    taxaSucesso: number;
  };
};

// Componente para exibir um único KPI
const KPIItem = ({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<any>;
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col space-y-1">
    <div className="flex items-center text-sm text-gray-500">
      <Icon className="w-4 h-4 mr-1 text-indigo-500" />
      <span>{label}</span>
    </div>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

export default function AgentDetailCard({
  name,
  status,
  role,
  data,
}: AgentDetailCardProps) {
  const statusColor =
    status === "Ativo"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      {/* HEADER DO AGENTE */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <div className="flex space-x-2 mt-1 text-sm">
            <span
              className={`px-2 py-0.5 rounded-full ${statusColor} font-medium`}
            >
              {status}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 font-medium">
              {role}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Ativo agora</p>
        </div>
        <button>
          <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-900" />
        </button>
      </div>

      {/* LINHA DE KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 border-t border-b border-gray-100">
        <KPIItem Icon={User} label="Conexões Ativas" value={data.conexoes} />
        <KPIItem Icon={Zap} label="Interações Hoje" value={data.interacoes} />
        <KPIItem Icon={BarChart3} label="NPS Médio" value={data.nps} />
        <KPIItem
          Icon={Clock}
          label="Tempo de Resposta"
          value={data.tempoResposta}
        />
      </div>

      {/* TAXA DE SUCESSO (Barra de Progresso) */}
      <div className="mt-6">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>Taxa de Sucesso</span>
          <span>{data.taxaSucesso}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${data.taxaSucesso}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
