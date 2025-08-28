type AppConfig = {
  chatbotName: string;
  chatbotNameAcronym: string;
  chatbotUrl: string;
  chatbotPromptWindowPlaceholder: string;
};

const appConfig: AppConfig = {
  chatbotName: import.meta.env.VITE_CHATBOT_NAME,
  chatbotNameAcronym: import.meta.env.VITE_CHATBOT_NAME_ACRONYM,
  chatbotUrl: import.meta.env.VITE_CHATBOT_URL,
  chatbotPromptWindowPlaceholder: import.meta.env
    .VITE_CHATBOT_PROMPT_WINDOW_PLACEHOLDER,
};

export { appConfig };
