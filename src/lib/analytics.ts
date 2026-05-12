
// This is a simple wrapper for Google Analytics (GA4)
// Replace 'G-XXXXXXXXXX' with your real Measurement ID from Google Analytics Console

const GA_MEASUREMENT_ID = 'G-8LPZ6QC8X2';

export const initGA = () => {
  if (typeof window === 'undefined') return;

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(script2);
};

export const pageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const trackEvent = (action: string, category?: string | Record<string, any>, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const params: any = {};
    if (typeof category === 'string') {
      params.event_category = category;
      if (label) params.event_label = label;
      if (value !== undefined) params.value = value;
    } else if (typeof category === 'object') {
      Object.assign(params, category);
    }
    
    (window as any).gtag('event', action, params);
  }
};
