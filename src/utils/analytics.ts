/*
 * Copyright (c) 2026, SoftlaneIT (https://softlaneit.com/) All Rights Reserved.
 *
 * SoftlaneIT licenses this file to you under the Apache License,
 * Version 2.0 (the "LICENSE"); you may not use this file except
 * in compliance with the LICENSE.
 * You may obtain a copy of the LICENSE at
 *
 * https://softlaneit.com/LICENSE.txt
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the LICENSE is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the LICENSE for the
 * specific language governing permissions and limitations
 * under the LICENSE.
 */

/**
 * Initialize Google Analytics (gtag.js) dynamically.
 * The measurement ID is read from the VITE_GA_MEASUREMENT_ID env variable
 * so it never gets committed to source control.
 */
export function initGoogleAnalytics(): void {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!gaId) {
    if (import.meta.env.DEV) {
      console.warn('[GA] VITE_GA_MEASUREMENT_ID is not set — Google Analytics disabled.');
    }
    return;
  }

  // Avoid double-initialisation
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
    return;
  }

  // 1. Load the gtag.js library asynchronously
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  // 2. Initialise the dataLayer and configure
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.dataLayer as any[]).push(args);
  }
  gtag('js', new Date());
  gtag('config', gaId);
}

// Extend Window so TypeScript knows about dataLayer
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
