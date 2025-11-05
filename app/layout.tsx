// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; // Importa o Clerk
import { ptBR } from "@clerk/localizations"; // Importa a tradução (agora vai funcionar)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu App de Agendamentos",
  description: "Sistema de Agendamentos com Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Envolvemos o App com o ClerkProvider
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
