/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CUSTOMER_APP_URL?: string;
  readonly VITE_TRADESPERSON_APP_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
