/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHATBOT_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
