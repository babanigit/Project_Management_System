import {
  //  FaEnvelope, FaIdBadge, FaPhone,
    FaTrash } from "react-icons/fa";
import { IClient } from "./Clients";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENT } from "../queries/ClientQuery";
interface IProps {
  client: IClient;
}
const ClientRow = ({ client }: IProps) => {

  const [deleteClient] = useMutation( DELETE_CLIENT,{
    variables:{id:client.id},
    refetchQueries:[{query:GET_CLIENT}],
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
          },
        });
      }
    },
  } )

  const handleDelete = () => {
    deleteClient()
  }
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
            onClick={ handleDelete}
            className="btn btn-danger btn-sm">
                <FaTrash />
            </button>
        </td>
      </tr>
    </>
  );
};
export default ClientRow;