/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHATBOT_NAME: string;
  readonly VITE_PROMPT_PLACEHOLDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
