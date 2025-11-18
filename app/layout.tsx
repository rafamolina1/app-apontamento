// app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import NotificationListener from "@/components/NotificationListener";

// REMOVA: import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Custom Dashboard",
  description: "Painel de Controle da Barbearia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* Removemos o atributo suppressHydrationWarning e o ThemeProvider */}
      <html lang="pt-br">
        <body className={inter.className}>
          <Toaster position="top-center" richColors closeButton />
          <NotificationListener />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
