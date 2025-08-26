import { appConfig } from '@/config/app.config.ts';

const TypingIndicator = () => {
  return (
    <div className="text-3xl animate-pulse">
      {appConfig.chatbotTypingIndicatorSymbol}
    </div>
  );
};

export default TypingIndicator;
