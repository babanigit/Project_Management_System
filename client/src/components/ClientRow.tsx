import { FaEnvelope, FaIdBadge, FaPhone, FaTrash } from "react-icons/fa";
import { IClient } from "./Clients";

interface IProps {
  client: IClient;
}

const ClientRow = ({ client }: IProps) => {
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
            <button className="btn btn-danger btn-sm">
                <FaTrash />
            </button>
        </td>

      </tr>
    </>
  );
};

export default ClientRow;
