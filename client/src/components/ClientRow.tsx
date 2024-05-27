import {
  //  FaEnvelope, FaIdBadge, FaPhone,
<<<<<<< HEAD

  FaTrash,
} from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { DELETE_CLIENT } from "../mutations/ClientMutations";

import { IClient } from "./Clients";
=======
    FaTrash } from "react-icons/fa";
import { IClient } from "./Clients";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
>>>>>>> 9b6d26d60e4cf28dfc0c3586f9a402c07281b7bc
import { GET_CLIENT } from "../queries/ClientQuery";

interface IProps {
  client: IClient;
}

const ClientRow = ({ client }: IProps) => {
<<<<<<< HEAD
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
=======

  const [deleteClient] = useMutation( DELETE_CLIENT,{
    variables:{id:client.id},
    // refetchQueries:[{query:GET_CLIENT}],
    update(cache, { data: { deleteClient } }) {
      const data:
        | { clients: IClient[] }
        | null
        | undefined = cache.readQuery({ query: GET_CLIENT });
      if (data) {
        const { clients } = data;
        cache.writeQuery({
          query: GET_CLIENT,
          data: {
            clients: clients.filter((c) => c.id !== deleteClient.id),
>>>>>>> 9b6d26d60e4cf28dfc0c3586f9a402c07281b7bc
          },
        });
      }
    },
<<<<<<< HEAD
  });

  const handleDeleteClient = () => {
    // Invoke the deleteClient mutation function
    deleteClient();
  };
=======
  } )

  const handleDelete = () => {
    deleteClient()
  }
>>>>>>> 9b6d26d60e4cf28dfc0c3586f9a402c07281b7bc

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
<<<<<<< HEAD
          <button
            onClick={handleDeleteClient}
            className="btn btn-danger btn-sm"
          >
            <FaTrash />
          </button>
=======
            <button
            onClick={ handleDelete}
            className="btn btn-danger btn-sm">
                <FaTrash />
            </button>
>>>>>>> 9b6d26d60e4cf28dfc0c3586f9a402c07281b7bc
        </td>
      </tr>
    </>
  );
};

export default ClientRow;
