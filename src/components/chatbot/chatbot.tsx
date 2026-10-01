/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { FaUserCircle } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  success: boolean;
  message: string;
}

const API_URL = 'https://laravel-backend-portfolio.onrender.com/api/chat';

export default function Chatbot() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔎 Mettre à jour le message de bienvenue quand la langue change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages([{ role: 'assistant', content: t('chatbot.welcome') }]);
  }, [i18n.language, t]);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || loading) return;

    const userMessage: Message = { role: 'user', content: trimmedMessage };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post<ChatResponse>(API_URL, {
        message: trimmedMessage,
        lang: i18n.language, // on envoie la langue actuelle
      });
      const data = res.data;

      if (!data.success) throw new Error(data.message);

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: t('chatbot.error') },
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
        aria-label={t('chatbot.open')}
        className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f009] text-black shadow-lg transition-transform duration-200 hover:scale-105"
      >
        <HiChatBubbleLeftRight className="h-7 w-7" />
        <span className="absolute bottom-16 right-0 hidden w-max rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
          {t('chatbot.title')}
        </span>
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <h2 className="font-semibold text-white">{t('chatbot.title')}</h2>
              <p className="text-xs text-gray-400">{t('chatbot.subtitle')}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xl text-gray-400 hover:text-white"
              aria-label={t('chatbot.close')}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`flex items-start gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <SiOpenai className="text-yellow-400 mt-1" />
                )}
                {msg.role === 'user' && (
                  <FaUserCircle className="text-blue-400 mt-1" />
                )}
                <div
                  className={`rounded-xl px-3 py-2 max-w-[75%] text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2">
                <SiOpenai className="text-yellow-400 mt-1" />
                <div className="rounded-xl px-3 py-2 bg-gray-200 text-gray-500 text-sm">
                  {t('chatbot.thinking')}
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
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-yellow-400"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black disabled:opacity-40"
              >
                {t('chatbot.send')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
