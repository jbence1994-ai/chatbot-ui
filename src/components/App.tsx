import { useEffect } from 'react';

import Chatbot from '@/components/chat/Chatbot.tsx';
import { ModeToggle } from '@/components/ui/mode-toggle.tsx';
import { ThemeProvider } from '@/components/ui/theme-provider.tsx';
import { appConfig } from '@/config/app.config.ts';

const App = () => {
  const chatbotName = appConfig.chatbotName;

  useEffect(() => {
    document.title = chatbotName;
  }, [chatbotName]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen">
        <header className="p-4">
          <nav className="container flex justify-between items-center mx-auto px-4">
            <span className="text-2xl font-bold tracking-wide text-gray-900 dark:text-gray-200">
              {appConfig.chatbotNameAcronym}
            </span>
            <ModeToggle />
          </nav>
        </header>
        <main className="flex-1 p-4 sm:p-8 w-full overflow-hidden">
          <div className="max-w-screen-lg mx-auto w-full h-full flex flex-col">
            <Chatbot />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
