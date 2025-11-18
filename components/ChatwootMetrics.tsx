// components/ChatwootMetrics.tsx
"use client";

import { useState, useEffect } from "react";

// Definição dos tipos de dados
interface Metrics {
  activeCount: number;
  unattendedCount: number;
  messagesToday: number;
  avgResponseTime: number;
}

// Função auxiliar para formatar o tempo (de segundos para minutos/horas)
function formatTime(seconds: number) {
  if (!seconds || seconds === 0) return "0s";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  if (mins > 0) return `${mins}m`;
  return `${seconds.toFixed(0)}s`;
}

export default function ChatwootMetrics({
  initialData,
}: {
  initialData: Metrics;
}) {
  // Estado inicial é preenchido com dados do servidor (SSR)
  const [metrics, setMetrics] = useState<Metrics>(initialData);

  useEffect(() => {
    // Função para buscar dados novos da API Route
    const fetchNewData = async () => {
      try {
        const res = await fetch("/api/chatwoot"); // Chama a API Route
        if (res.ok) {
          const newData = await res.json();
          setMetrics(newData); // Atualiza o estado
        }
      } catch (error) {
        console.error("Erro ao atualizar métricas:", error);
      }
    };

    // Configura o intervalo: Executa a cada 10 segundos (10000 ms)
    const intervalId = setInterval(fetchNewData, 10000);

    // Limpa o intervalo quando o componente é destruído (boas práticas)
    return () => clearInterval(intervalId);
  }, []); // [] garante que rode apenas na montagem

  // Classes base para os cards
  const cardClasses =
    "bg-white p-6 rounded-lg shadow-sm flex items-center justify-between border border-gray-200 transition-all duration-500";
  const labelClasses = "text-sm font-medium text-gray-500";
  const valueClasses = "text-3xl font-semibold text-gray-900 mt-1";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Card 1: Mensagens Hoje (API: Reports Summary) */}
      <div className={cardClasses}>
        <div>
          <p className={labelClasses}>Mensagens Hoje</p>
          <p className={valueClasses}>{metrics.messagesToday}</p>
        </div>
        <div className="text-indigo-500 text-2xl">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Card 2: Conversas Ativas (API: status=open) */}
      <div className={cardClasses}>
        <div>
          <p className={labelClasses}>Conversas Ativas</p>
          <p className={valueClasses}>{metrics.activeCount}</p>
        </div>
        <div className="text-blue-500 text-2xl">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Card 3: Não Atendidas (API: assignee_type=none) */}
      <div className={cardClasses}>
        <div>
          <p className={labelClasses}>Não Atendidas</p>
          <p
            className={`text-3xl font-semibold mt-1 ${
              metrics.unattendedCount > 0 ? "text-red-600" : "text-gray-900"
            }`}
          >
            {metrics.unattendedCount}
          </p>
        </div>
        <div
          className={`${
            metrics.unattendedCount > 0 ? "text-red-500" : "text-gray-400"
          } text-2xl`}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Card 4: Tempo Médio (API: Reports Summary) */}
      <div className={cardClasses}>
        <div>
          <p className={labelClasses}>Tempo Médio</p>
          <p className={valueClasses}>{formatTime(metrics.avgResponseTime)}</p>
        </div>
        <div className="text-orange-500 text-2xl">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
