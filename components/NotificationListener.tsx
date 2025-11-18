"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner"; // Biblioteca de notificação
import { MessageCircle } from "lucide-react";

export default function NotificationListener() {
  // Usamos useRef para guardar o valor anterior sem renderizar a tela de novo
  const lastCountRef = useRef<number | null>(null);

  useEffect(() => {
    const checkNewMessages = async () => {
      try {
        const res = await fetch("/api/chatwoot");
        if (!res.ok) return;

        const data = await res.json();
        const currentCount = data.messagesToday;

        // Se for a primeira vez que carrega, só salva o número
        if (lastCountRef.current === null) {
          lastCountRef.current = currentCount;
          return;
        }

        // SE o número atual for MAIOR que o anterior = NOVA MENSAGEM!
        if (currentCount > lastCountRef.current) {
          const diff = currentCount - lastCountRef.current;

          // 1. Toca um som (opcional)
          const audio = new Audio("/notification.mp3"); // Você pode adicionar um arquivo mp3 na pasta public depois
          audio.play().catch(() => {}); // Ignora erro se o navegador bloquear som automático

          // 2. Mostra o Pop-up bonito
          toast.success(`Você tem ${diff} nova(s) mensagem(ns)!`, {
            description: "Verifique o WhatsApp agora.",
            icon: <MessageCircle className="w-5 h-5 text-green-600" />,
            duration: 5000,
          });

          // Atualiza a referência
          lastCountRef.current = currentCount;
        }
      } catch (error) {
        console.error("Erro ao checar notificações", error);
      }
    };

    // Checa a cada 10 segundos
    const interval = setInterval(checkNewMessages, 10000);

    return () => clearInterval(interval);
  }, []);

  // Este componente não desenha nada na tela, ele é invisível
  return null;
}
