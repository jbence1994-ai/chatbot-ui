import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export type ChatMessage = {
  content: string;
  type: 'user' | 'chatbot';
};

interface Props {
  chatMessages: ChatMessage[];
}

const ChatMessages = ({ chatMessages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {chatMessages.map((chatMessage, index) => (
        <div
          key={index}
          className={`${
            chatMessage.type === 'user'
              ? 'px-3 py-1 rounded-xl bg-gray-400 text-white dark:bg-gray-500 self-end'
              : 'text-gray-900 dark:text-gray-200 self-start'
          } max-w-md text-justify`}
          onCopy={onCopyMessage}
          ref={index === chatMessages.length - 1 ? lastMessageRef : null}
        >
          <ReactMarkdown>{chatMessage.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
