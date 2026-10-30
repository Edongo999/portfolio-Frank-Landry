const SESSION_KEY = 'chatbot_session_id';

/**
 * Retourne l'identifiant de session du visiteur.
 *
 * Si aucune session n'existe encore,
 * on en crée une et on la conserve dans localStorage.
 */
export const getChatbotSessionId = (): string => {
  let sessionId = localStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
};
