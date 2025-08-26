type AppConfig = {
  chatbotName: string;
};

const appConfig: AppConfig = {
  chatbotName: import.meta.env.VITE_CHATBOT_NAME,
};

export { appConfig };
