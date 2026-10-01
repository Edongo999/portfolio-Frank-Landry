import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// 👉 Interface pour typer la réponse du backend Laravel
interface ChatResponse {
  success: boolean;
  message: string;
}

const API_URL = 'https://laravel-backend-portfolio.onrender.com/api/chat';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Bonjour  Je suis l'assistant de Frank Landry. Comment puis-je vous aider ?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || loading) return;

    const userMessage: Message = { role: 'user', content: trimmedMessage };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      // 👉 Typage explicite de la réponse
      const res = await axios.post<ChatResponse>(API_URL, {
        message: trimmedMessage,
      });
      const data = res.data;

      if (!data.success) throw new Error(data.message);

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            ' Désolé, je rencontre actuellement un problème de connexion. Veuillez réessayer dans quelques instants.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Ouvrir le chatbot"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg transition-transform duration-200 hover:scale-105"
      >
        💬
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <h2 className="font-semibold text-white">
                Assistant Frank Landry
              </h2>
              <p className="text-xs text-gray-400">Assistant virtuel IA</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xl text-gray-400 transition-colors hover:text-white"
              aria-label="Fermer le chatbot"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}
              >
                <div
                  className={`chat-bubble ${
                    msg.role === 'user'
                      ? 'chat-bubble-primary'
                      : 'chat-bubble-secondary'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-secondary text-gray-400">
                  L'assistant réfléchit...
                </div>
              </div>
            )}
          </div>

          {/* Zone de saisie */}
          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Écrivez votre message..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
