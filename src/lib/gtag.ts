// Google Ads & Analytics Configuration

export const GA_ADS_ID = "AW-18447660056";
export const PURCHASE_CONVERSION_ID = "AW-18447660056/A5oFCJ2I4vUcEJjow9xE";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Tracks a Google Ads conversion event.
 * Matches the Google Ads Purchase snippet:
 * gtag('event', 'conversion', {
 *   'send_to': 'AW-18447660056/A5oFCJ2I4vUcEJjow9xE',
 *   'value': 1.0,
 *   'currency': 'GBP',
 *   'transaction_id': ''
 * });
 */
export const trackPurchaseConversion = ({
  value = 1.0,
  currency = "GBP",
  transactionId = "",
}: {
  value?: number;
  currency?: string;
  transactionId?: string;
} = {}) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  const gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  gtag("event", "conversion", {
    send_to: PURCHASE_CONVERSION_ID,
    value,
    currency,
    transaction_id: transactionId,
  });
};
