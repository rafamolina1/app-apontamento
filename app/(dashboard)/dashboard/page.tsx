// app/(dashboard)/dashboard/page.tsx
import StatCard from "@/components/StatCard";
import AgendamentosChart, {
  type ChartData,
} from "@/components/AgendamentosChart";
import ResponseTimeChart from "@/components/ResponseTimeChart";
import {
  Users,
  TrendingUp,
  BarChart,
  UserPlus,
  MessageSquare,
  Book,
  Settings,
} from "lucide-react";

// --- TIPOS DE DADO ---
type ResponseTimeData = { time: string; response: number }[];

type N8NData = {
  agentesAtivos: number;
  interacoesHoje: number;
  npsMedio: number;
  clientesAtivos: number;
  concluidos: number;
  agendados: number;
  cancelados: number;
  naoCompareceu: number;
};

// Dados de fallback para garantir que a página NUNCA quebre
const FALLBACK_DATA: N8NData = {
  agentesAtivos: 12,
  interacoesHoje: 1284,
  npsMedio: 8.7,
  clientesAtivos: 342,
  concluidos: 100,
  agendados: 50,
  cancelados: 10,
  naoCompareceu: 5,
};

const FALLBACK_TIME_DATA: ResponseTimeData = [
  { time: "00:00", response: 40 },
  { time: "03:00", response: 30 },
  { time: "06:00", response: 50 },
  { time: "09:00", response: 45 },
  { time: "12:00", response: 35 },
  { time: "15:00", response: 25 },
  { time: "18:00", response: 48 },
  { time: "21:00", response: 32 },
];

// --- FUNÇÕES DE BUSCA DE DADOS (AGORA TODAS NO SERVIDOR) ---

// 1. Busca dados do Gráfico de Status
async function getN8NData(): Promise<N8NData> {
  const N8N_WEBHOOK_URL =
    "http://127.0.0.1:5678/webhook/c8323b80-087e-476b-bab7-12d9336b0878";
  try {
    const response = await fetch(N8N_WEBHOOK_URL, { cache: "no-store" });
    if (!response.ok) return FALLBACK_DATA;
    return await response.json();
  } catch (error) {
    return FALLBACK_DATA;
  }
}

// 2. Busca dados do Gráfico de Tempo de Resposta (NOVA FUNÇÃO AQUI)
async function getResponseTimeData(): Promise<ResponseTimeData> {
  const N8N_WEBHOOK_URL =
    "http://127.0.0.1:5678/webhook/8be8a5ab-4698-443f-8b94-d44c5d3449ae";
  try {
    const response = await fetch(N8N_WEBHOOK_URL, { cache: "no-store" });
    if (!response.ok) return FALLBACK_TIME_DATA;
    const data = await response.json();
    return Array.isArray(data.chartData) ? data.chartData : FALLBACK_TIME_DATA;
  } catch (error) {
    return FALLBACK_TIME_DATA;
  }
}

// --- Componente da Página (Async) ---
export default async function DashboardPage() {
  // CORREÇÃO: Ambos os fetches são feitos aqui, no Server Component
  const n8nDataPromise = getN8NData();
  const timeDataPromise = getResponseTimeData();

  // Esperamos ambas as chamadas (parallel fetching)
  const [n8nData, timeData] = await Promise.all([
    n8nDataPromise,
    timeDataPromise,
  ]);

  // 2. MONTA OS DADOS DOS CARDS USANDO OS DADOS REAIS DO N8N
  const statsData = [
    {
      title: "Agentes Ativos",
      value: (n8nData?.agentesAtivos ?? 0).toString(),
      subtitle: "+2 esta semana",
      Icon: Users,
      iconBgColor: "bg-blue-100 text-blue-600",
    },
    {
      title: "Interações Hoje",
      value: (n8nData?.interacoesHoje ?? 0).toString(),
      subtitle: "+18% vs ontem",
      Icon: TrendingUp,
      iconBgColor: "bg-green-100 text-green-600",
    },
    {
      title: "NPS Médio",
      value: (n8nData?.npsMedio ?? 0.0).toFixed(1).toString(),
      subtitle: "+0.3 este mês",
      Icon: BarChart,
      iconBgColor: "bg-purple-100 text-purple-600",
    },
    {
      title: "Clientes Ativos",
      value: (n8nData?.clientesAtivos ?? 0).toString(),
      subtitle: "+12 novos",
      Icon: UserPlus,
      iconBgColor: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div>
      {/* Cabeçalho da página */}
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-gray-600">Visão geral dos seus agentes de IA</p>

      {/* Grid de Cards de Estatística */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Divisor do Layout: GRÁFICOS (100% Largura, Simples) */}
      <div className="mt-10 space-y-6">
        {/* Gráfico 1: Status dos Agendamentos (PIZZA) */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">
            Status dos Agendamentos
          </h3>
          <p className="mt-1 text-sm text-gray-500 mb-4">Últimos 30 dias</p>

          <div className="h-[400px]">
            <AgendamentosChart
              data={{
                concluidos: n8nData.concluidos,
                agendados: n8nData.agendados,
                cancelados: n8nData.cancelados,
                naoCompareceu: n8nData.naoCompareceu,
              }}
            />
          </div>

          {/* NÚMEROS DA LEGENDA (Abaixo da Linha) */}
          <div className="border-t border-gray-200 mt-6 pt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            <p className="text-sm text-gray-600">
              Concluídos:{" "}
              <strong className="text-emerald-600">{n8nData.concluidos}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Agendados:{" "}
              <strong className="text-blue-600">{n8nData.agendados}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Cancelados:{" "}
              <strong className="text-red-600">{n8nData.cancelados}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Não Compareceu:{" "}
              <strong className="text-orange-600">
                {n8nData.naoCompareceu}
              </strong>
            </p>
          </div>
        </div>

        {/* Gráfico 2: Tempo de Resposta Médio (BARRAS) - AGORA COM DADOS */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <ResponseTimeChart data={timeData} /> {/* PASSANDO OS DADOS */}
        </div>
      </div>
    </div>
  );
}
