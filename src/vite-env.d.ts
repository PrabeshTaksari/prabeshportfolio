/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IRS_PUBLIC_URL?: string;
  readonly VITE_PRINTER_PUBLIC_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
