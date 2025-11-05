// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// MUDANÇA 1: Adicionamos 'async' aqui
export default async function HomePage() {
  // MUDANÇA 2: Adicionamos 'await' aqui
  // Pega o ID do usuário. Se não estiver logado, userId será null
  const { userId } = await auth();

  if (userId) {
    // Se o usuário JÁ ESTÁ LOGADO, mande-o para o dashboard
    redirect("/dashboard");
  } else {
    // Se o usuário NÃO ESTÁ LOGADO, mande-o para o login
    redirect("/sign-in");
  }
}
