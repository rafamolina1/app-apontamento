// lib/chatwoot.ts

// Função auxiliar para requisições
async function fetchChatwootAPI(url: string, token: string) {
  try {
    const response = await fetch(url, {
      headers: {
        api_access_token: token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`[Chatwoot] Erro na requisição:`, error);
    return null;
  }
}

// Helper para contar conversas (Ativas/Não Atendidas)
async function getConversationCount(
  baseUrl: string,
  accountId: string,
  token: string,
  params: string
) {
  const data = await fetchChatwootAPI(
    `${baseUrl}/api/v1/accounts/${accountId}/conversations?${params}`,
    token
  );

  if (!data) return 0;

  let conversations: any[] = [];
  if (data.data?.payload && Array.isArray(data.data.payload))
    conversations = data.data.payload;
  else if (data.payload && Array.isArray(data.payload))
    conversations = data.payload;
  else if (Array.isArray(data)) conversations = data;

  if (params.includes("assignee_type=none")) {
    return conversations.filter((c) => !c.meta?.assignee).length;
  }

  return conversations.length;
}

// Helper para Relatório Diário (Mensagens + Tempo)
async function getDailyReport(
  baseUrl: string,
  accountId: string,
  token: string
) {
  const now = new Date();
  const startOfDay =
    new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
  const endOfDay = Math.floor(now.getTime() / 1000);

  const data = await fetchChatwootAPI(
    `${baseUrl}/api/v2/accounts/${accountId}/reports/summary?type=account&since=${startOfDay}&until=${endOfDay}`,
    token
  );

  if (!data) return { messagesToday: 0, avgResponseTime: 0 };

  const incoming = data.incoming_messages_count || 0;
  const outgoing = data.outgoing_messages_count || 0;
  const avgTime = data.avg_response_time || 0;

  return {
    messagesToday: incoming + outgoing,
    avgResponseTime: avgTime,
  };
}

// --- NOVO: Helper para Mapa de Calor (Tráfego) ---
async function getHeatmapData(
  baseUrl: string,
  accountId: string,
  token: string
) {
  // Cria uma matriz vazia: 7 dias (linhas) x 24 horas (colunas)
  const heatmap = Array(7)
    .fill(0)
    .map(() => Array(24).fill(0));

  try {
    // Busca as últimas 100 conversas recentes para popular o gráfico
    const data = await fetchChatwootAPI(
      `${baseUrl}/api/v1/accounts/${accountId}/conversations?sort=-created_at&limit=100`,
      token
    );

    if (!data) return heatmap;

    let conversations: any[] = [];
    if (data.data?.payload) conversations = data.data.payload;
    else if (data.payload) conversations = data.payload;

    // Mapeia cada conversa no grid
    conversations.forEach((conv: any) => {
      const date = new Date(conv.created_at * 1000);
      const dayIndex = date.getDay(); // 0 (Dom) a 6 (Sáb)
      const hourIndex = date.getHours(); // 0 a 23

      if (heatmap[dayIndex] && heatmap[dayIndex][hourIndex] !== undefined) {
        heatmap[dayIndex][hourIndex] += 1;
      }
    });

    return heatmap;
  } catch (error) {
    console.error("Erro ao gerar heatmap:", error);
    return heatmap;
  }
}

// --- Função Principal ---
export async function getChatwootMetrics() {
  const baseUrl = process.env.CHATWOOT_API_URL;
  const accountId = process.env.CHATWOOT_ACCOUNT_ID;
  const token = process.env.CHATWOOT_ACCESS_TOKEN;

  const defaults = {
    activeCount: 0,
    unattendedCount: 0,
    messagesToday: 0,
    avgResponseTime: 0,
    heatmapData: Array(7).fill(Array(24).fill(0)),
  };

  if (!baseUrl || !token || !accountId) return defaults;

  try {
    const [activeCount, unattendedCount, reportData, heatmapData] =
      await Promise.all([
        getConversationCount(baseUrl, accountId, token, "status=open"),
        getConversationCount(
          baseUrl,
          accountId,
          token,
          "status=open&assignee_type=none"
        ),
        getDailyReport(baseUrl, accountId, token),
        getHeatmapData(baseUrl, accountId, token), // Nova chamada
      ]);

    return {
      activeCount,
      unattendedCount,
      messagesToday: reportData.messagesToday,
      avgResponseTime: reportData.avgResponseTime,
      heatmapData,
    };
  } catch (error) {
    console.error("Erro geral no Chatwoot Metrics:", error);
    return defaults;
  }
}
