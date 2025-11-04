// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  // Redireciona o usuário da raiz ('/') para a página de login
  redirect("/login");
}
