/* eslint-disable no-underscore-dangle */
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import routes from './routes';

import './App.less';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const MyRouter = () => {
  const element = useRoutes(routes);
  return element;
};

interface AppProps {
  basename?: string;
}

function App({ basename = '/' }:AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={basename}>
        <MyRouter />
      </Router>
    </QueryClientProvider>
  );
}


export default App;
