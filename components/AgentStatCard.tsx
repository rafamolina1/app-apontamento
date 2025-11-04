// components/AgentStatCard.tsx
import React from "react";
import { LucideProps } from "lucide-react";

type AgentStatCardProps = {
  title: string;
  value: string;
  Icon: React.ComponentType<LucideProps>;
  iconBgColor: string;
  iconColor: string;
};

export default function AgentStatCard({
  title,
  value,
  Icon,
  iconBgColor,
  iconColor,
}: AgentStatCardProps) {
  return (
    <div className="flex flex-col justify-between bg-white p-5 rounded-lg shadow-sm border border-gray-100 min-h-[140px]">
      <div className="flex items-start justify-between">
        <div className={`rounded-full p-2 ${iconBgColor}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <span className="text-sm font-medium text-gray-500">{title}</span>
      </div>
      <p className="mt-4 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
