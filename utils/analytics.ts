export const GA_MEASUREMENT_ID = 'G-B9SXZFC59W'; 

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Log a specific event (e.g., "click", "download", "scroll")
export const trackEvent = (
  action: string, 
  params: { 
    category?: string; 
    label?: string; 
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  } else {
    // Fallback for development or if GA is blocked
    console.debug(`[Analytics] ${action}:`, params);
  }
};

// Helper for standard button clicks
export const trackButtonClick = (label: string) => {
  trackEvent('button_click', {
    category: 'User Interaction',
    label: label
  });
};
