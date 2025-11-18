// app/(dashboard)/dashboard/whatsapp/page.tsx

import { getChatwootMetrics } from "@/lib/chatwoot";
import ChatwootMetrics from "@/components/ChatwootMetrics";

export default async function WhatsAppPage() {
  // 1. Busca dados iniciais no servidor (Server-Side Rendering)
  const initialMetrics = await getChatwootMetrics();

  // 2. URL de acesso ao Chatwoot (deve estar no .env)
  const chatwootLoginUrl =
    "https://chatwoot-chatwoot.nu0wew.easypanel.host/app/login";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Integração WhatsApp
        </h1>
        <p className="mt-1 text-gray-600">
          Gerencie suas conexões e conversas do WhatsApp
        </p>
      </div>

      {/* 3. Componente Dinâmico: Renderiza os 4 cards e atualiza sozinho */}
      {/* Passamos os dados iniciais para evitar um "loading" na primeira pintura */}
      <ChatwootMetrics initialData={initialMetrics} />

      {/* 4. Botão de Ação Principal (Abre em Nova Aba) */}
      <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-200 text-center mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Central de Atendimento
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Sua central de atendimento do Chatwoot está pronta. Clique no botão
          abaixo para abrir o painel dedicado em uma nova aba.
        </p>

        <a
          href={chatwootLoginUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 text-lg font-medium shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          Abrir Central de Chat
        </a>
      </div>
    </div>
  );
}
