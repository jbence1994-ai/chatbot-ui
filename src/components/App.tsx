import { useEffect } from 'react';

import Chatbot from '@/components/chat/Chatbot.tsx';
import { ModeToggle } from '@/components/mode-toggle.tsx';
import { ThemeProvider } from '@/components/theme-provider';
import { appConfig } from '@/config/app.config.ts';

const App = () => {
  const chatbotName = appConfig.chatbotName;

  useEffect(() => {
    document.title = chatbotName;
  }, [chatbotName]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header className="p-2">
        <nav>
          <ModeToggle />
        </nav>
      </header>
      <main className="p-2 h-screen w-full">
        <Chatbot />
      </main>
    </ThemeProvider>
  );
};

export default App;
