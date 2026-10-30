import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

import { sendChatMessage } from './chatbot.api';

import type { Message } from './chatbot.types';

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
   * Affichage / masquage selon le scroll
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
   * Fermeture lorsque l'utilisateur
   * clique en dehors du chatbot
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
   * Envoi du message
   */
  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage('');

    setLoading(true);

    try {
      const data = await sendChatMessage(trimmedMessage, i18n.language);

      if (!data.success) {
        throw new Error(data.message);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erreur chatbot :', error);

      const errorMessage: Message = {
        role: 'assistant',
        content: t('chatbot.error'),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Chatbot invisible dans certaines
   * parties de la page
   */
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <ChatButton
        title={t('chatbot.title')}
        ariaLabel={t('chatbot.open')}
        onToggle={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <ChatWindow
          chatRef={chatRef}
          messages={messages}
          message={message}
          loading={loading}
          title={t('chatbot.title')}
          closeLabel={t('chatbot.close')}
          thinkingText={t('chatbot.thinking')}
          placeholder={t('chatbot.placeholder')}
          sendText={t('chatbot.send')}
          onClose={() => setIsOpen(false)}
          onMessageChange={setMessage}
          onSend={sendMessage}
        />
      )}
    </>
  );
}
