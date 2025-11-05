// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define as rotas públicas (NÃO protegidas)
const isPublicRoute = createRouteMatcher([
  "/", // A página inicial (onde o app/page.tsx decide para onde ir)
  "/sign-in(.*)", // A página de login
  "/sign-up(.*)", // A página de cadastro
  "/api/(.*)", // As rotas de API (para o N8N)
]);

// 2. Exporta o middleware do Clerk
export default clerkMiddleware((auth, req) => {
  // 3. Se a rota NÃO for pública, o middleware irá protegê-la
  // A função auth().protect() NÃO é necessária aqui
  if (!isPublicRoute(req)) {
    // Nós apenas chamamos auth() para inicializá-lo,
    // e o middleware do Clerk cuidará do redirecionamento
    auth();
  }
});

export const config = {
  // 4. O Matcher
  // Roda o middleware em todas as rotas, exceto arquivos estáticos
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
