import { gql, useQuery } from "@apollo/client";

const GET_CLIENT = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export const Clients = () => {
  const { loading, error } = useQuery(GET_CLIENT);

  if (loading) return <div> loading</div>;
  if (error) return <div>error, something went wrong</div>;

  return <div> {!loading && !error && <h1>Client</h1>} </div>;
};
