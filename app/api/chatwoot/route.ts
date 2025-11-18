// app/api/chatwoot/route.ts
import { getChatwootMetrics } from "@/lib/chatwoot";
import { NextResponse } from "next/server";

// Força o Next.js a não fazer cache dessa rota (queremos dados frescos)
export const dynamic = "force-dynamic";

export async function GET() {
  const metrics = await getChatwootMetrics();
  return NextResponse.json(metrics);
}
