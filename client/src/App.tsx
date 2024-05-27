import { AddClientModel } from "./components/AddClientModel";
import { Clients } from "./components/Clients";
import { Header } from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

<<<<<<< HEAD
const cache= new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        clients:{
          merge(existing,incoming){
            return incoming;
          }
        },
        projects:{
          merge(existing,incoming){
            return incoming;
          }
        }
      }
    }
  }
})
=======
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
>>>>>>> 9b6d26d60e4cf28dfc0c3586f9a402c07281b7bc

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  // cache: new InMemoryCache(),
<<<<<<< HEAD
  cache
=======
  cache,
>>>>>>> 9b6d26d60e4cf28dfc0c3586f9a402c07281b7bc
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModel />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
};

export default App;
