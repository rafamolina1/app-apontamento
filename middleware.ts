// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Define quais rotas são "públicas" (não exigem login)
  // Todas as outras rotas (como /dashboard) serão protegidas automaticamente.
  publicRoutes: [
    "/", // A página inicial (onde o app/page.tsx decide para onde ir)
    "/sign-in(.*)", // A página de login
    "/sign-up(.*)", // A página de cadastro
    "/api/(.*)", // As rotas de API (para o N8N)
  ],
});

export const config = {
  matcher: [
    // Protege todas as rotas, exceto as de assets (arquivos estáticos)
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
