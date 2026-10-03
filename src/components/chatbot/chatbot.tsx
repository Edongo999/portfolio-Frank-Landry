/* eslint-disable react-hooks/static-components */
import React, { useState, useEffect, useRef } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);

  const chatRef = useRef<HTMLDivElement>(null);

  /*
   * Message d'accueil
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages([
      {
        role: 'assistant',
        content: t('chatbot.welcome'),
      },
    ]);
  }, [i18n.language, t]);

  /*
   * Affichage / masquage du chatbot selon le scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setIsVisible(y < 500 || y >= 4500);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /*
   * Fermeture lorsque l'utilisateur clique en dehors
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  /*
   * Transforme les réponses de l'assistant
   * en contenu visuellement structuré.
   */
  const formatAssistantMessage = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-2.5 text-sm leading-relaxed">
        {lines.map((line, index) => {
          const trimmedLine = line.trim();

          /*
           * Ligne vide
           */
          if (!trimmedLine) {
            return <div key={index} className="h-1" />;
          }

          /*
           * Titre Markdown :
           * ### Projets de Frank Landry
           */
          if (trimmedLine.startsWith('### ')) {
            const title = trimmedLine.replace(/^###\s*/, '');

            return (
              <h3
                key={index}
                className="mt-1 mb-3 text-base font-bold text-gray-900"
              >
                {title}
              </h3>
            );
          }

          /*
           * Sous-titre Markdown :
           * ## ...
           */
          if (
            trimmedLine.startsWith('## ') &&
            !trimmedLine.startsWith('### ')
          ) {
            const title = trimmedLine.replace(/^##\s*/, '');

            return (
              <h3
                key={index}
                className="mt-1 mb-3 text-base font-bold text-gray-900"
              >
                {title}
              </h3>
            );
          }

          /*
           * Projet numéroté :
           * **1. Portfolio professionnel**
           */
          if (
            trimmedLine.startsWith('**') &&
            trimmedLine.endsWith('**') &&
            /^\*\*\d+\./.test(trimmedLine)
          ) {
            const title = trimmedLine.replace(/^\*\*/, '').replace(/\*\*$/, '');

            return (
              <h4 key={index} className="mt-3 text-sm font-bold text-gray-900">
                {title}
              </h4>
            );
          }

          /*
           * Ligne Technologies :
           * **Technologies :** React, Laravel...
           */
          if (
            trimmedLine.startsWith('**Technologies') ||
            trimmedLine.startsWith('**Technologies :**')
          ) {
            const technologies = trimmedLine
              .replace(/^\*\*Technologies\s*:?\*\*\s*/i, '')
              .trim();

            return (
              <div
                key={index}
                className="mt-1 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2"
              >
                <span className="font-semibold text-gray-800">
                  Technologies :
                </span>{' '}
                <span className="text-gray-700">{technologies}</span>
              </div>
            );
          }

          /*
           * Liste avec •
           */
          if (trimmedLine.startsWith('• ')) {
            const text = trimmedLine.substring(2);

            return (
              <div key={index} className="flex items-start gap-2 pl-1">
                <span className="mt-1.5 text-[#8f8b00]">•</span>

                <p className="flex-1 text-gray-800">{renderBoldText(text)}</p>
              </div>
            );
          }

          /*
           * Liste avec -
           */
          if (trimmedLine.startsWith('- ')) {
            const text = trimmedLine.substring(2);

            return (
              <div key={index} className="flex items-start gap-2 pl-1">
                <span className="mt-1.5 text-[#8f8b00]">•</span>

                <p className="flex-1 text-gray-800">{renderBoldText(text)}</p>
              </div>
            );
          }

          /*
           * Liste numérotée simple :
           * 1. React
           * 2. Laravel
           */
          if (/^\d+\.\s/.test(trimmedLine)) {
            const match = trimmedLine.match(/^(\d+)\.\s(.*)$/);

            if (match) {
              const [, number, text] = match;

              return (
                <div key={index} className="flex items-start gap-2 pl-1">
                  <span className="font-semibold text-[#8f8b00]">
                    {number}.
                  </span>

                  <p className="flex-1 text-gray-800">{renderBoldText(text)}</p>
                </div>
              );
            }
          }

          /*
           * Texte normal
           */
          return (
            <p key={index} className="text-gray-800">
              {renderBoldText(trimmedLine)}
            </p>
          );
        })}
      </div>
    );
  };

  /*
   * Gestion du texte en gras :
   * **texte important**
   */
  const renderBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  /*
   * Envoi du message
   */
  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post<ChatResponse>(API_URL, {
        message: trimmedMessage,
        lang: i18n.language,
      });

      const data = res.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.message,
        },
      ]);
    } catch (error) {
      console.error('Erreur chatbot :', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: t('chatbot.error'),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Entrée clavier
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  /*
   * Animation de chargement
   */
  const TypingDots: React.FC = () => (
    <div className="flex gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500" />

      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:0.2s]" />

      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:0.4s]" />
    </div>
  );

  if (!isVisible) return null;

  return (
    <>
      {/* Bouton flottant Chatbot */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t('chatbot.open')}
        className="
          group fixed bottom-6 right-5 z-30
          flex h-12 w-12 items-center justify-center
          rounded-full bg-[#f3f009] text-black
          shadow-lg transition-transform duration-200
          hover:scale-105
          md:h-14 md:w-14
        "
      >
        <HiChatBubbleLeftRight className="h-6 w-6 md:h-7 md:w-7" />

        <span
          className="
            absolute bottom-16 right-0 hidden w-max
            rounded-md bg-black px-2 py-1
            text-xs text-white
            group-hover:block
          "
        >
          {t('chatbot.title')}
        </span>
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div
          ref={chatRef}
          className="
            fixed bottom-24 right-5 z-30
            flex h-[65vh] max-h-[500px]
            w-[90vw] flex-col
            overflow-hidden rounded-2xl
            border border-white/10
            bg-[#111111] shadow-2xl
            sm:w-[320px]
            md:w-[360px]
            lg:w-[380px]
            xl:w-[400px]
          "
        >
          {/* Header */}
          <div
            className="
              flex items-center justify-between
              border-b border-white/10
              px-4 py-3
            "
          >
            <h2 className="font-semibold text-white">{t('chatbot.title')}</h2>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="
                text-xl text-gray-400
                transition-colors
                hover:text-white
              "
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
                className={`
                  flex items-start gap-2
                  ${msg.role === 'user' ? 'justify-end' : 'justify-start'}
                `}
              >
                {/* Icône assistant */}
                {msg.role === 'assistant' && (
                  <SiOpenai
                    className="
                      mt-1 shrink-0
                      text-[#f3f009]
                    "
                  />
                )}

                {/* Icône utilisateur */}
                {msg.role === 'user' && (
                  <FaUserCircle
                    className="
                      mt-1 shrink-0
                      text-blue-400
                    "
                  />
                )}

                {/* Bulle */}
                <div
                  className={`
                    max-w-[85%]
                    rounded-xl px-3 py-2
                    text-sm
                    ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-black'
                    }
                  `}
                >
                  {msg.role === 'assistant' ? (
                    formatAssistantMessage(msg.content)
                  ) : (
                    <p className="leading-relaxed">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Chargement */}
            {loading && (
              <div className="flex items-start gap-2">
                <SiOpenai
                  className="
                    mt-1 shrink-0
                    text-[#f3f009]
                  "
                />

                <div
                  className="
                    flex items-center gap-2
                    rounded-xl
                    bg-gray-200
                    px-3 py-2
                    text-sm text-gray-500
                  "
                >
                  <span>{t('chatbot.thinking')}</span>

                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* Zone de saisie */}
          <div
            className="
              flex gap-2
              border-t border-white/10
              p-3
            "
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder={t('chatbot.placeholder')}
              className="
                flex-1 rounded-xl
                border border-white/10
                bg-white/5
                px-3 py-2
                text-sm text-white
                placeholder:text-gray-500
                focus:border-yellow-400
                focus:outline-none
              "
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="
                rounded-xl
                bg-[#f3f009]
                px-4 py-2
                text-sm font-semibold
                text-black
                transition-opacity
                disabled:opacity-40
              "
            >
              {t('chatbot.send')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
