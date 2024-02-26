import './App.css';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import FirstMethod from './pages/first_method.js';
import SecondMethod from './pages/second_method.js';
import ThirdMethod from './pages/third_method.js';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <FirstMethod />
        <SecondMethod />
        <ThirdMethod />
      </div>
    </ApolloProvider>
  );
}

export default App;
