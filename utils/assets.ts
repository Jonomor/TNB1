export const getAssetBase = () => {
  const baseUrl = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL;
  if (baseUrl) {
    return baseUrl;
  }

  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path.startsWith('/TNB1/')) {
    return '/TNB1/';
  }

  return '/';
};
