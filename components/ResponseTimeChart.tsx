// components/ResponseTimeChart.tsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Definimos o tipo de dado que esperamos
type ResponseTimeData = {
  time: string;
  response: number;
}[];

type ResponseTimeProps = {
  data: ResponseTimeData; // Recebemos os dados já prontos
};

export default function ResponseTimeChart({ data }: ResponseTimeProps) {
  // O fetch não acontece mais aqui. O componente é puramente de renderização.

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900">
        Tempo de Resposta Médio
      </h3>
      <p className="mt-1 text-sm text-gray-500">Últimas 24 horas (segundos)</p>

      {/* Altura de 256px garantida para o contêiner do gráfico */}
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data} // Dados recebidos por props!
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              labelFormatter={(value) => `Hora: ${value}`}
              formatter={(value, name) => [value, "Tempo de Resposta"]}
            />
            <Bar dataKey="response" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
