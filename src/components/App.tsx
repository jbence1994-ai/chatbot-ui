import { useEffect } from 'react';

import Chatbot from '@/components/chatbot/Chatbot.tsx';
import { appConfig } from '@/config/app.config.ts';

const App = () => {
  const chatbotName = appConfig.chatbotName;

  useEffect(() => {
    document.title = chatbotName;
  }, [chatbotName]);

  return (
    <main className="p-4 h-screen w-full">
      <Chatbot />
    </main>
  );
};

export default App;
