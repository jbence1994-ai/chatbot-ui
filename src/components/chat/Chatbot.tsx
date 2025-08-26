import { useRef, useState } from 'react';

import axios from 'axios';

import ChatInput, { type ChatFormData } from '@/components/chat/ChatInput.tsx';
import ChatMessages, { type Message } from '@/components/chat/ChatMessages.tsx';
import TypingIndicator from '@/components/chat/TypingIndicator.tsx';
import { appConfig } from '@/config/app.config.ts';

type ChatResponse = {
  message: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatBotTyping, setIsChatBotTyping] = useState(false);
  const [error, setError] = useState('');
  const conversationId = useRef(crypto.randomUUID());

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      setMessages((previousMessages) => [
        ...previousMessages,
        { content: prompt, role: 'user' },
      ]);
      setIsChatBotTyping(true);
      setError('');

      const { data } = await axios.post<ChatResponse>(appConfig.chatbotUrl, {
        prompt,
        conversationId: conversationId.current,
      });

      setMessages((previousMessages) => [
        ...previousMessages,
        { content: data.message, role: 'chatbot' },
      ]);
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsChatBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isChatBotTyping && <TypingIndicator />}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default Chatbot;
