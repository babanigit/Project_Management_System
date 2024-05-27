import {
  //  FaEnvelope, FaIdBadge, FaPhone,

  FaTrash,
} from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { DELETE_CLIENT } from "../mutations/ClientMutations";

import { IClient } from "./Clients";
import { GET_CLIENT } from "../queries/ClientQuery";

interface IProps {
  client: IClient;
}

const ClientRow = ({ client }: IProps) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries:[{query:GET_CLIENT}]

    update(cache, { data: { deleteClient } }) {
      // Use type assertion to define the shape of data returned by cache.readQuery
      const cachedData = cache.readQuery<{ clients: IClient[] }>({ query: GET_CLIENT });

      if (cachedData) {
        cache.writeQuery({
          query: GET_CLIENT,
          data: {
            clients: cachedData.clients.filter((c) => c.id !== deleteClient.id),
          },
        });
      }
    },
  });

  const handleDeleteClient = () => {
    // Invoke the deleteClient mutation function
    deleteClient();
  };

  return (
    <>
      {/* <h5 className="mt-5">Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" /> {client.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon" /> {client.email}
        </li>
        <li className="list-group-item">
          <FaPhone className="icon" /> {client.phone}
        </li>
      </ul> */}

      <tr>
        <td> {client.name} </td>
        <td> {client.email} </td>
        <td> {client.phone} </td>
        <td>
          <button
            onClick={handleDeleteClient}
            className="btn btn-danger btn-sm"
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ClientRow;
