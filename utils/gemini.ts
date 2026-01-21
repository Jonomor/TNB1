type ImportMetaEnv = {
  VITE_GEMINI_API_KEY?: string;
};

export const getGeminiApiKey = () => {
  const key =
    (import.meta as { env?: ImportMetaEnv }).env?.VITE_GEMINI_API_KEY ||
    (window as { process?: { env?: Record<string, string> } }).process?.env?.API_KEY ||
    (window as { process?: { env?: Record<string, string> } }).process?.env?.GEMINI_API_KEY ||
    '';

  return key.trim();
};

export const requireGeminiApiKey = () => {
  const key = getGeminiApiKey();
  if (!key) {
    throw new Error('Missing Gemini API key.');
  }
  return key;
};
