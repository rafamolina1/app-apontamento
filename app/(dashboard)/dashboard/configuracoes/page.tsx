// app/(dashboard)/dashboard/configuracoes/page.tsx

"use client"; // <-- Obrigatório para usar hooks e componentes de UI do Clerk

import {
  useUser,
  useOrganization,
  OrganizationProfile, // 1. Importe o componente de perfil da organização
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react"; // (Opcional: ícone de loading)

export default function ConfiguracoesPage() {
  // --- Hooks do Clerk para buscar dados ---
  const { user, isLoaded: userLoaded } = useUser();
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const isLoading = !userLoaded || !orgLoaded;

  // --- Estado de Carregamento ---
  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="mt-1 text-gray-600">Carregando dados da sua conta...</p>
        <div className="flex items-center justify-center h-40">
          {/* Você pode precisar instalar 'lucide-react' (npm install lucide-react) */}
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      </div>
    );
  }

  // --- Determina o nome do usuário ---
  const userName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`
    : user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="mt-1 text-gray-600">
          Gerencie as configurações gerais da plataforma.
        </p>
      </div>

      {/* --- Card de Perfil do Usuário (Estático) --- */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Seu Perfil
        </h2>
        <div className="space-y-4">
          <div className="flex">
            <span className="text-sm font-medium text-gray-500 w-40">
              Nome de Usuário:
            </span>
            <span className="text-gray-900 font-medium">{userName}</span>
          </div>
          <div className="flex">
            <span className="text-sm font-medium text-gray-500 w-40">
              E-mail Principal:
            </span>
            <span className="text-gray-900 font-medium">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </div>
      </div>

      {/* --- Card de Organização (Interativo) --- */}
      <div className="mt-6 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Organização (Barbearia)
        </h2>

        {organization ? (
          // 2. Renderiza o componente nativo do Clerk com a correção
          <OrganizationProfile routing="hash" />
        ) : (
          // 3. Caso o usuário não esteja em uma organização
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600">
              Você não está atualmente em nenhuma organização (Barbearia). Crie
              uma ou peça um convite.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
