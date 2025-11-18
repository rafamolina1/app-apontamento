// lib/auth-server.ts
// (Versão limpa, sem a lógica de Admin)

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Retorna o organizationId (RealID da Barbearia) do Clerk.
 * Lança um erro se o usuário não pertencer a uma organização (Multi-Tenancy).
 */
export function getOrganizationId(): string {
  const { orgId } = auth();

  if (!orgId) {
    // Redireciona para um setup se não estiver em uma organização
    redirect("/");
  }

  return orgId;
}

// A função 'enforceAdminRole' foi removida.
