// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define as rotas públicas (NÃO protegidas)
const isPublicRoute = createRouteMatcher([
  "/", // Landing Page
  "/sign-in(.*)", // Login
  "/sign-up(.*)", // Cadastro
  "/api/(.*)", // API (N8N)
]);

// 2. Exporta o middleware V4
export default clerkMiddleware((auth, req) => {
  // 3. Se a rota NÃO for pública, o middleware irá protegê-la
  if (!isPublicRoute(req)) {
    // A V4 usa auth() para inicializar a sessão
    auth();
  }
});

export const config = {
  // 4. O Matcher (está correto)
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
