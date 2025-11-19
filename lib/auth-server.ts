// lib/auth-server.ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getOrganizationId(): Promise<string> {
  // AWAIT ADICIONADO AQUI
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/");
  }

  return orgId;
}
