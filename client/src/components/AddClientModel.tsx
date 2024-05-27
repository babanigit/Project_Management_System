import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENT } from "../queries/ClientQuery";

// Define interface for formData
interface FormData {
  name?: string;
  email?: string;
  phone?: string;
}

export const AddClientModel = () => {
  const [formData, setFormData] = useState<FormData>({});

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery<{ clients: unknown[] }>({
        query: GET_CLIENT,
      }) || { clients: [] };

      cache.writeQuery({
        query: GET_CLIENT,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);

    console.log(formData.name, formData.email, formData.phone);
  };

  const handleClicked = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      formData.name === " " ||
      formData.email === " " ||
      formData.phone === " "
    ) {
      return alert("please fill in all fields");
    }

    // addClient(formData.name, formData.email, formData.phone);
    addClient({
      variables: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
    });

    console.log("clicked");
    console.log(formData);

    setFormData({
      name: " ",
      email: " ",
      phone: " ",
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModel"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModel"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Client{" "}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleClicked} action="">
                <div className="mb 3">
                  <label className="form-label"> Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb 3">
                  <label className="form-label"> Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb 3">
                  <label className="form-label"> Phone</label>
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleClicked}
                  data-bs-dismiss="modal"
                  className=" btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
