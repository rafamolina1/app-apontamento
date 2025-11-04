// components/ShortcutCard.tsx
import Link from "next/link";
import { LucideProps, ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  href: string;
};

export default function ShortcutCard({
  title,
  description,
  icon: Icon,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="group block rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-indigo-500 border border-transparent"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-lg bg-indigo-100 p-3 text-indigo-600">
          <Icon className="h-6 w-6" />
        </span>
        <ArrowRight className="h-5 w-5 text-gray-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-indigo-600" />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
