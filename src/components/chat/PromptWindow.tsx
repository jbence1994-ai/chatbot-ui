import type { KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';

import { Button } from '@/components/ui/button.tsx';
import { appConfig } from '@/config/app.config.ts';

export type PromptWindowData = { prompt: string };

interface Props {
  onSubmit: (data: PromptWindowData) => void;
}
const PromptWindow = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset, formState } =
    useForm<PromptWindowData>();

  const submit = handleSubmit((data) => {
    reset({ prompt: '' });
    onSubmit(data);
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      onSubmit={submit}
      onKeyDown={handleKeyDown}
    >
      <textarea
        {...register('prompt', {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder={appConfig.chatbotPromptWindowPlaceholder}
        maxLength={1000}
        autoFocus
      />
      <Button className="rounded-full w-9 h-9" disabled={!formState.isValid}>
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default PromptWindow;
