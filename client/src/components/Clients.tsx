import { gql, useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { Key } from "react";

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

export interface IClient {
  id: Key | null | undefined;
  name: string;
  email: string;
  phone: string;
}

export const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENT);

  if (loading) return <div> loading</div>;
  if (error) return <div>error, something went wrong</div>;

  return (
    <div>
      {" "}
      {!loading && !error && (
        <>
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client: IClient) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </>
      )}{" "}
    </div>
  );
};
