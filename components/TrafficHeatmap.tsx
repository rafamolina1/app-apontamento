// components/TrafficHeatmap.tsx
"use client";

import React, { useMemo } from "react";

const HOURS = Array.from({ length: 24 }, (_, i) => i); // [0, 1, ... 23]

export default function TrafficHeatmap({ data }: { data: number[][] }) {
  // 1. Gera os últimos 7 dias dinamicamente (Cronológico)
  const rows = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i); // Subtrai dias de hoje

      // Formata: "Quarta-feira"
      const weekDay = d.toLocaleDateString("pt-BR", { weekday: "long" });
      // Capitaliza a primeira letra (quarta-feira -> Quarta-feira)
      const weekDayCapitalized =
        weekDay.charAt(0).toUpperCase() + weekDay.slice(1);

      // Formata: "Nov 12, 2025" (Estilo solicitado)
      // Nota: O pt-BR padrão seria "12 de nov.", forçamos um estilo mais limpo
      const month = d
        .toLocaleDateString("pt-BR", { month: "short" })
        .replace(".", "");
      const dayNum = d.getDate();
      const year = d.getFullYear();
      const dateStr = `${
        month.charAt(0).toUpperCase() + month.slice(1)
      } ${dayNum}, ${year}`;

      days.push({
        labelMain: weekDayCapitalized, // "Quarta-feira"
        labelSub: dateStr, // "Nov 12, 2025"
        dataIndex: d.getDay(), // 0-6 (Para buscar no array de dados correto)
      });
    }
    return days;
  }, []);

  // Define a cor baseada no volume
  const getColor = (value: number) => {
    if (value === 0) return "bg-gray-100/50"; // Muito claro
    if (value <= 2) return "bg-indigo-200";
    if (value <= 5) return "bg-indigo-400";
    return "bg-indigo-600";
  };

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-[750px]">
        <div className="flex flex-col gap-2">
          {/* Mapeia os dias gerados cronologicamente */}
          {rows.map((row, index) => (
            <div key={index} className="flex items-center gap-1">
              {/* Cabeçalho da Linha (Data) */}
              <div className="w-24 flex flex-col items-end justify-center pr-3 text-right">
                <span className="text-[11px] font-bold text-gray-700 leading-tight">
                  {row.labelMain}
                </span>
                <span className="text-[9px] text-gray-400 leading-tight">
                  {row.labelSub}
                </span>
              </div>

              {/* Colunas (Horas) */}
              {HOURS.map((hour) => {
                // Pega o dado correspondente ao dia da semana (0-6) daquela data
                const value = data[row.dataIndex]
                  ? data[row.dataIndex][hour]
                  : 0;

                return (
                  <div
                    key={`${row.dataIndex}-${hour}`}
                    title={`${row.labelMain}, ${hour}h: ${value} conversas`}
                    className={`h-8 flex-1 rounded-sm transition-all hover:ring-2 hover:ring-indigo-300 cursor-default ${getColor(
                      value
                    )}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Eixo X (Horas) */}
        <div className="flex items-center gap-1 mt-3 ml-24 pl-1">
          {HOURS.map((hour) => (
            <div key={hour} className="flex-1 text-center">
              <span className="text-[9px] text-gray-400 font-medium">
                {/* Mostra hora a cada 2 saltos (0, 2, 4...) */}
                {hour % 2 === 0 ? hour : ""}
              </span>
            </div>
          ))}
        </div>

        {/* Legenda da escala de horas */}
        <div className="ml-24 mt-1 flex justify-between text-[9px] text-gray-300 px-1">
          <span>0-1</span>
          <span>23-24</span>
        </div>
      </div>
    </div>
  );
}
