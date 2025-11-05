// app/page.tsx
import { auth } from "@clerk/nextjs/server"; // Importamos o 'auth' do servidor
import { redirect } from "next/navigation";

export default function HomePage() {
  // Pega o ID do usuário. Se não estiver logado, userId será null
  const { userId } = auth();

  if (userId) {
    // Se o usuário JÁ ESTÁ LOGADO, mande-o para o dashboard
    redirect("/dashboard");
  } else {
    // Se o usuário NÃO ESTÁ LOGADO, mande-o para o login
    redirect("/sign-in");
  }
}
