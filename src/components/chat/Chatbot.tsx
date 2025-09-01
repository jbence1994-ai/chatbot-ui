import { useRef, useState } from 'react';

import axios from 'axios';

import notificationSound from '@/assets/sounds/notification.mp3';
import popSound from '@/assets/sounds/pop.mp3';
import MessageSkeleton from '@/components/chat/MessageSkeleton.tsx';
import MessagesPanel, {
  type ChatMessage,
} from '@/components/chat/MessagesPanel.tsx';
import PromptWindow, {
  type PromptWindowData,
} from '@/components/chat/PromptWindow.tsx';
import { appConfig } from '@/config/app.config.ts';

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
  message: string;
};

const Chatbot = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatBotTyping, setIsChatBotTyping] = useState(false);
  const [error, setError] = useState('');
  const conversationId = useRef(crypto.randomUUID());

  const onSubmit = async ({ prompt }: PromptWindowData) => {
    try {
      setChatMessages((previousChatMessages) => [
        ...previousChatMessages,
        { content: prompt, type: 'user' },
      ]);
      setIsChatBotTyping(true);
      setError('');
      await popAudio.play();

      const { data } = await axios.post<ChatResponse>(appConfig.chatbotUrl, {
        prompt,
        conversationId: conversationId.current,
      });

      setChatMessages((previousChatMessages) => [
        ...previousChatMessages,
        { content: data.message, type: 'chatbot' },
      ]);
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    } finally {
      await notificationAudio.play();
      setIsChatBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto hide-scrollbar">
        <MessagesPanel chatMessages={chatMessages} />
        {isChatBotTyping && <MessageSkeleton />}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <PromptWindow onSubmit={onSubmit} />
    </div>
  );
};

export default Chatbot;
