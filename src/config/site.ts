const trimUrl = (value: string | undefined) => value?.trim().replace(/\/$/, "") ?? "";

export const SITE = {
  irsPublicUrl: trimUrl(import.meta.env.VITE_IRS_PUBLIC_URL),
  printerPublicUrl: trimUrl(import.meta.env.VITE_PRINTER_PUBLIC_URL),
  isDev: import.meta.env.DEV,
} as const;

/** True when the portfolio is built for public hosting (not `npm run dev`). */
export const isPublicDeployment = import.meta.env.PROD;

/** Local-only Vite middleware APIs exist only during development. */
export function canUseLocalDevApis(): boolean {
  return SITE.isDev;
}

export function getIrsAppUrl(asOwner = false): string {
  const base = SITE.irsPublicUrl
    ? `${SITE.irsPublicUrl}/`
    : SITE.isDev
      ? `${window.location.protocol}//${window.location.hostname}:8080/`
      : "";

  if (!base) {
    return "";
  }

  return asOwner ? `${base}?owner=1` : base;
}

export function getPrinterAppUrl(): string {
  if (SITE.printerPublicUrl) {
    return SITE.printerPublicUrl;
  }

  if (SITE.isDev) {
    return "http://localhost:8010/html/index.html";
  }

  return "";
}

export function canOpenIrsLive(): boolean {
  return Boolean(getIrsAppUrl(false));
}
