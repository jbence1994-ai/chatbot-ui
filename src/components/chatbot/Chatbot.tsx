import React, { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

import axios from 'axios';

import { Button } from '@/components/ui/button.tsx';
import { appConfig } from '@/config/app.config.ts';

type FormData = { prompt: string };

type ChatResponse = {
  message: string;
};

type Message = {
  content: string;
  role: 'user' | 'chatbot';
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatBotTyping, setIsChatBotTyping] = useState(false);
  const [error, setError] = useState('');
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const conversationId = useRef(crypto.randomUUID());
  const { register, handleSubmit, reset, formState } = useForm<FormData>();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSubmit = async ({ prompt }: FormData) => {
    try {
      setMessages((previousMessages) => [
        ...previousMessages,
        { content: prompt, role: 'user' },
      ]);
      setIsChatBotTyping(true);
      setError('');

      reset({ prompt: '' });

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
      setError('Something went wrong. Please try again later');
    } finally {
      setIsChatBotTyping(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`px-3 py-1 rounded-xl ${
              message.role === 'user'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-100 text-black self-start'
            }`}
            onCopy={onCopyMessage}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
        {isChatBotTyping && (
          <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-3xl">
            <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s]"></div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <form
        className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (data) => data.trim().length > 0,
          })}
          className="w-full border-0 focus:outline-0 resize-none"
          placeholder={appConfig.promptPlaceholder}
          maxLength={1000}
          autoFocus
        />
        <Button className="rounded-full w-9 h-9" disabled={!formState.isValid}>
          <FaArrowUp />
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
