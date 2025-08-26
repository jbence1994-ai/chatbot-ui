import { useEffect } from 'react';

interface Props {
  chatbotName: string;
}

const App = ({ chatbotName }: Props) => {
  useEffect(() => {
    document.title = chatbotName;
  }, [chatbotName]);

  return null;
};

export default App;
