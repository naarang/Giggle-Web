import Router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useUserFcmTokenStore } from './store/user';

const queryClient = new QueryClient();

function App() {
  const { updateToken } = useUserFcmTokenStore();
  useEffect(() => {
    const handleToken = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData?.type === 'RECEIVE_TOKEN') {
        updateToken(parsedData.payload);
      }
    };

    window.addEventListener('message', handleToken);
    return () => window.removeEventListener('message', handleToken);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
