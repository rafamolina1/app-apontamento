// components/StatCard.tsx
import React from "react";
import { LucideProps } from "lucide-react";

// Define os tipos de dados que o card espera receber (props)
type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  Icon: React.ComponentType<LucideProps>;
  iconBgColor: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
  Icon,
  iconBgColor,
}: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={`rounded-md p-2 ${iconBgColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
