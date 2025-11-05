// components/AgendamentosChart.tsx
"use client";

import React from "react";

// Tipos de dados
// --- CORREÇÃO AQUI ---
export type ChartData = {
  concluidos: number;
  agendados: number;
  cancelados: number;
  naoCompareceu: number;
};
// --------------------

interface Props {
  data: ChartData;
}

const COLORS = ["#10b981", "#3b82f6", "#ef4444", "#f59e0b"]; // Verde, Azul, Vermelho, Laranja

export default function AgendamentosChart({ data }: Props) {
  const total =
    data.concluidos + data.agendados + data.cancelados + data.naoCompareceu;

  const chartData = [
    { name: "Concluídos", value: data.concluidos, color: COLORS[0] },
    { name: "Agendados", value: data.agendados, color: COLORS[1] },
    { name: "Cancelados", value: data.cancelados, color: COLORS[2] },
    { name: "Não Compareceu", value: data.naoCompareceu, color: COLORS[3] },
  ];

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Nenhum dado de agendamento encontrado.
      </div>
    );
  }

  return (
    // Renderiza a barra de porcentagem de "pizza" e a legenda
    <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 h-full">
      {/* GRÁFICO FALSO (Simulação Visual de Barra de Porcentagem) */}
      <div className="relative h-48 w-48 rounded-full shadow-lg overflow-hidden flex flex-row">
        {chartData.map((item, index) => {
          const percentage = Math.round((item.value / total) * 100);
          return (
            <div
              key={item.name}
              style={{ backgroundColor: item.color, width: `${percentage}%` }}
              className="h-full"
            >
              {/* Texto de porcentagem centralizado na fatia */}
              {percentage > 5 && (
                <span className="text-white text-xs font-bold flex items-center justify-center h-full">
                  {percentage}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* LEGENDA */}
      <div className="flex flex-col space-y-2 w-full max-w-xs">
        {chartData.map((item) => {
          const percentage = Math.round((item.value / total) * 100);
          return (
            <div key={item.name} className="flex justify-between items-center">
              <div className="flex items-center">
                <span
                  style={{ backgroundColor: item.color }}
                  className="h-3 w-3 rounded-full mr-2"
                ></span>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-semibold">
                {item.value} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
