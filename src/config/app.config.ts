type AppConfig = {
  chatbotName: string;
  promptPlaceholder: string;
  chatbotUrl: string;
};

const appConfig: AppConfig = {
  chatbotName: import.meta.env.VITE_CHATBOT_NAME,
  promptPlaceholder: import.meta.env.VITE_PROMPT_PLACEHOLDER,
  chatbotUrl: import.meta.env.VITE_CHATBOT_URL,
};

export { appConfig };
