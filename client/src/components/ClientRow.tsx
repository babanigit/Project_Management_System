import {
  //  FaEnvelope, FaIdBadge, FaPhone,
  FaTrash,
} from "react-icons/fa";
import { IClient } from "./Clients";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/ClientQuery";
interface IProps {
  client: IClient;
}
const ClientRow = ({ client }: IProps) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },

    refetchQueries:[{query:GET_CLIENTS}],
    // update(cache, { data: { deleteClient } }) {
    //   const data:
    //     | { clients: IClient[] }
    //     | null
    //     | undefined = cache.readQuery({ query: GET_CLIENTS });
    //   if (data) {
    //     const { clients } = data;
    //     cache.writeQuery({
    //       query: GET_CLIENTS,
    //       data: {
    //         clients: clients.filter((c) => c.id !== deleteClient.id),
    //       },
    //     });
    //   }
    // },
  });

  const handleDelete = () => {
    deleteClient();
  };
  return (
    <>

      <tr>
        <td> {client.name} </td>
        <td> {client.email} </td>
        <td> {client.phone} </td>
        <td>
          <button onClick={handleDelete} className="btn btn-danger btn-sm">
            <FaTrash />
          </button>
        </td>
      </tr>
    </>
  );
};
export default ClientRow;
