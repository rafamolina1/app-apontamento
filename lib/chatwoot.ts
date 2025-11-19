// lib/chatwoot.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// --- TIPOS DE DADOS ---
interface Metrics {
  activeCount: number;
  unattendedCount: number;
  messagesToday: number;
  avgResponseTime: number;
  heatmapData: number[][];
}

// --- FUNÇÕES AUXILIARES (Mantidas e Adaptadas) ---

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
    return conversations.filter((c: any) => !c.meta?.assignee).length;
  }

  return conversations.length;
}

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

async function getHeatmapData(
  baseUrl: string,
  accountId: string,
  token: string
) {
  const heatmap = Array(7)
    .fill(0)
    .map(() => Array(24).fill(0));

  try {
    const data = await fetchChatwootAPI(
      `${baseUrl}/api/v1/accounts/${accountId}/conversations?sort=-created_at&limit=100`,
      token
    );

    if (!data) return heatmap;

    let conversations: any[] = [];
    if (data.data?.payload) conversations = data.data.payload;
    else if (data.payload) conversations = data.payload;

    conversations.forEach((conv: any) => {
      const date = new Date(conv.created_at * 1000);
      const dayIndex = date.getDay();
      const hourIndex = date.getHours();

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

// --- FUNÇÃO PRINCIPAL (Atualizada com Async Auth + Banco de Dados) ---
export async function getChatwootMetrics(): Promise<Metrics> {
  // 1. Correção para Next.js 16: 'await' no auth()
  const { orgId } = await auth();

  const defaults = {
    activeCount: 0,
    unattendedCount: 0,
    messagesToday: 0,
    avgResponseTime: 0,
    heatmapData: Array(7).fill(Array(24).fill(0)),
  };

  if (!orgId) {
    return defaults;
  }

  try {
    // 2. Busca as configurações da Organização no Banco de Dados (Supabase/Prisma)
    const settings = await prisma.organizationSettings.findUnique({
      where: { clerkOrgId: orgId },
    });

    if (!settings) {
      // Se não achou no banco, retorna zerado (ou você pode colocar um fallback para .env aqui se quiser testar local)
      console.log("⚠️ Nenhuma configuração encontrada para a Org:", orgId);
      return defaults;
    }

    const { chatwootUrl, chatwootAccountId, chatwootAccessToken } = settings;

    // 3. Usa as credenciais do banco para chamar as APIs
    const [activeCount, unattendedCount, reportData, heatmapData] =
      await Promise.all([
        getConversationCount(
          chatwootUrl,
          chatwootAccountId,
          chatwootAccessToken,
          "status=open"
        ),
        getConversationCount(
          chatwootUrl,
          chatwootAccountId,
          chatwootAccessToken,
          "status=open&assignee_type=none"
        ),
        getDailyReport(chatwootUrl, chatwootAccountId, chatwootAccessToken),
        getHeatmapData(chatwootUrl, chatwootAccountId, chatwootAccessToken),
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
