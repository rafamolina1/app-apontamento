// app/(dashboard)/dashboard/whatsapp/page.tsx

// Importações (se necessário para componentes futuros)
// import { getOrganizationId } from '@/lib/auth-server'; // Para pegar o ID da organização se for usar Server Actions aqui.

export default function WhatsAppPage() {
  // NOTA: Se precisar de dados do servidor (como getOrganizationId),
  // esta page.tsx pode ser um 'async Server Component'.
  // Ex: const orgId = await getOrganizationId();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho da Página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Integração WhatsApp
        </h1>
        <p className="mt-1 text-gray-600">
          Gerencie suas conexões e conversas do WhatsApp
        </p>
      </div>

      {/* Seção de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card de Métrica: Mensagens Hoje */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500">Mensagens Hoje</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">1,284</p>
          </div>
          <div className="text-indigo-500 text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.352 3.42.54 1.482.228 2.904 1.25 3.689 2.504A3.375 3.375 0 0 0 16.5 19.5h3.375c1.59 0 3.065-1.161 3.375-2.653c.221-1.015-.421-2.462-1.181-3.15c-.625-.579-1.124-.91-1.639-1.205L19 14.25M4.75 12C3.364 12 2 12.812 2 14.25c0 1.437 1.364 2.25 2.75 2.25h1.75a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H4.75Z"
              />
            </svg>
          </div>
        </div>

        {/* Card de Métrica: Conversas Ativas */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Conversas Ativas
            </p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">87</p>
          </div>
          <div className="text-blue-500 text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a4.5 4.5 0 0 0 2.343-3.378A4.924 4.924 0 0 0 19.119 12h-1.071a5.012 5.012 0 0 1-.582-4.16.59.59 0 0 0-.108-.242 4.924 4.924 0 0 0-3.07-1.317m6.072 6.516a4.5 4.5 0 0 1-2.343 3.378m3.07-1.317a.59.59 0 0 0 .108-.242c.323-1.025.432-2.19.38-3.378-1.748-.094-3.416-.546-4.925-1.317M13.5 4.5c-.773 0-1.53.044-2.28.138a7.017 7.017 0 0 0-2.378 1.134 2.926 2.926 0 0 0-1.034 2.098c-.22.754-.157 1.628-.157 2.549v.828l-1.094.73a.75.75 0 0 0-.252.588c0 .265.189.497.45.559l1.094.33c-.735.097-1.47.243-2.2.428-.4.1-.7.436-.7.836V18c0 .465.375.839.84.839h.265A2.91 2.91 0 0 0 7.84 20.25H9.75v-2.25m3.307-4.114a6.993 6.993 0 0 1 1.777-2.735 2.926 2.926 0 0 0 1.034-2.098c.22-.754.157-1.628.157-2.549V4.5M19.5 12h.75c.12 0 .24.015.36.045M2.25 12h.75"
              />
            </svg>
          </div>
        </div>

        {/* Card de Métrica: Taxa de Resposta */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Taxa de Resposta
            </p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">94%</p>
          </div>
          <div className="text-green-500 text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>

        {/* Card de Métrica: Tempo Médio */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500">Tempo Médio</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">1.8s</p>
          </div>
          <div className="text-orange-500 text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Seções de Conexões e Conversas Ativas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da Esquerda: Conexões WhatsApp */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Conexões</h2>
            <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Adicionar
            </button>
          </div>

          {/* Card de Conexão WhatsApp */}
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 1.01-.9 1.83-2.004 1.83H15.75m-1.5 0-.824 4.757A4.5 4.5 0 0 1 10.5 21h-1.5c-1.5 0-2.835-1.178-2.91-2.623L6 14.25m15 0c-.457 0-7.189-.045-7.189-.045L12 11.25H3.75m0 0h-.375a3.75 3.75 0 0 0-3.75 3.75v1.5c0 1.01.9 1.83 2.004 1.83h1.5M12 10.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75H12v-.75Z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">WhatsApp Vendas</p>
                <p className="text-sm text-gray-600">+55 11 98765-4321</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="bg-green-500 w-2 h-2 rounded-full mr-1"></span>
                  Conectado • Há 2 minutos
                </div>
                <p className="text-xs text-gray-500 mt-1">Agente: Vendas</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0M3.75 18H7.5m3-6h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0M3.75 12H7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Coluna da Direita: Conversas Ativas */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Conversas Ativas
            </h2>
          </div>

          {/* Campo de Busca */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Buscar conversas..."
              className="w-full p-2 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Lista de Conversas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card de Conversa: João Silva */}
            <div className="border border-gray-200 rounded-lg flex p-4">
              <div className="bg-gray-200 text-gray-700 w-10 h-10 flex items-center justify-center rounded-full font-bold mr-3">
                JS
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900">João Silva</p>
                  <p className="text-xs text-gray-500">14:32</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Obrigado pela ajuda!
                </p>
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full mt-2">
                  Agente: Vendas
                </span>
              </div>
            </div>

            {/* Card de Conversa: Ana Oliveira */}
            <div className="border border-gray-200 rounded-lg flex p-4">
              <div className="bg-gray-200 text-gray-700 w-10 h-10 flex items-center justify-center rounded-full font-bold mr-3">
                AO
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900">Ana Oliveira</p>
                  <p className="text-xs text-gray-500">14:30</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Perfeito, muito obrigada!
                </p>
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full mt-2">
                  Agente: Vendas
                </span>
              </div>
            </div>

            {/* Mensagens de Exemplo (para simular a conversa) */}
            <div className="md:col-span-2 mt-4 space-y-3">
              <div className="flex justify-start">
                <div className="bg-gray-200 p-3 rounded-xl rounded-bl-none max-w-[70%] text-sm text-gray-800 shadow-sm">
                  Olá! Claro, ficarei feliz em ajudar. Temos diversos serviços
                  disponíveis. Qual área te interessa mais?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-indigo-600 text-white p-3 rounded-xl rounded-br-none max-w-[70%] text-sm shadow-sm">
                  Estou interessado em consultoria para o meu negócio.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-200 p-3 rounded-xl rounded-bl-none max-w-[70%] text-sm text-gray-800 shadow-sm">
                  Ótimo! Para consultoria, nossa equipe especializada pode te
                  guiar. Você prefere uma consulta online ou presencial?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-indigo-600 text-white p-3 rounded-xl rounded-br-none max-w-[70%] text-sm shadow-sm">
                  Online seria melhor para mim.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
