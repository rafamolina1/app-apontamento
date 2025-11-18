// app/(auth)/sign-in/page.tsx

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
// (Opcional: importe um ícone, se quiser)
// import { Scissors } from "lucide-react";

export default function Page() {
  return (
    // 1. Layout principal dividido em duas colunas
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ======================================================= */}
      {/* LADO ESQUERDO (Branding e Marketing) */}
      {/* ======================================================= */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative">
        <div className="w-full max-w-md z-10">
          {/* Logo "custom" */}
          <Link
            href="/"
            className="flex items-center justify-center text-4xl font-bold text-white mb-8"
          >
            <span className="bg-white text-indigo-700 rounded-md p-2 w-12 h-12 flex items-center justify-center mr-3">
              C
            </span>
            <span>custom</span>
          </Link>

          {/* Slogan */}
          <h1 className="text-3xl font-bold mb-4 text-center">
            A plataforma definitiva para sua barbearia.
          </h1>
          <p className="text-lg text-indigo-100 mb-8 text-center">
            Monitore o WhatsApp, gerencie agentes e veja métricas em tempo real.
          </p>

          {/* Bloco de Citação (Prova Social Fictícia) */}
          <div className="bg-indigo-700 p-6 rounded-lg border border-indigo-500 shadow-xl">
            <p className="text-lg text-indigo-100 italic">
              "Essa plataforma mudou a forma como lidamos com os agendamentos.
              Nossos clientes no WhatsApp nunca foram tão bem atendidos."
            </p>
            <p className="text-right font-semibold text-white mt-4">
              - Dono de Barbearia Satisfeito
            </p>
          </div>
        </div>
        {/* Efeito de fundo (opcional) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
      </div>

      {/* ======================================================= */}
      {/* LADO DIREITO (Formulário de Login) */}
      {/* ======================================================= */}
      <div className="flex justify-center items-center bg-gray-100 p-8 lg:p-12">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              // O card principal: borda, sombra e fundo branco
              card: "bg-white shadow-xl rounded-lg border border-gray-200 w-full max-w-md",

              headerTitle: "text-2xl font-semibold text-gray-900",

              // Botões sociais
              socialButtonsBlockButton:
                "border border-gray-300 hover:bg-gray-50",

              // Divisor "ou"
              dividerText: "text-gray-500",

              // Labels
              formFieldLabel: "text-gray-700 font-medium",

              // Inputs
              formFieldInput:
                "rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",

              // Botão primário
              button__primary: "bg-indigo-600 text-white hover:bg-indigo-700",

              // Link de rodapé
              footerActionLink:
                "text-indigo-600 hover:text-indigo-700 font-medium",
            },
          }}
        />
      </div>
    </div>
  );
}
