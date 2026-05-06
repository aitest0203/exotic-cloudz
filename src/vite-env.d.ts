/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_ENDPOINT?: string;
  readonly VITE_FORMSPREE_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
