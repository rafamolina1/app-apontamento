// app/(dashboard)/dashboard/page.tsx

import TrafficHeatmap from "@/components/TrafficHeatmap";
// Importamos o componente que você já tem e que atualiza sozinho!
import ChatwootMetrics from "@/components/ChatwootMetrics";
import { getChatwootMetrics } from "@/lib/chatwoot";

export default async function DashboardPage() {
  // 1. Busca dados iniciais no servidor (para a página abrir já preenchida)
  const chatwootData = await getChatwootMetrics();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Visão geral da Barbearia</p>
      </div>

      {/* ÁREA DE CARDS EM TEMPO REAL 
          Usamos o ChatwootMetrics aqui. 
          Ele vai mostrar os 4 cards e ficar atualizando sozinho.
      */}
      <ChatwootMetrics initialData={chatwootData} />

      {/* Área de Gráficos */}
      <div className="mt-8">
        {/* Gráfico de Tráfego (Heatmap) */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Tráfego de Conversa
              </h3>
              <p className="text-sm text-gray-500">
                Volume de mensagens (Últimos 7 dias)
              </p>
            </div>

            {/* Badge visual */}
            <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Em tempo real
            </span>
          </div>

          {/* O Gráfico de Calor */}
          <div className="w-full">
            <TrafficHeatmap data={chatwootData.heatmapData} />
          </div>
        </div>
      </div>
    </div>
  );
}
