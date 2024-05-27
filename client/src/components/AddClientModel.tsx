import { ChangeEvent, useState } from "react";
import { FaUser } from "react-icons/fa";

import { ADD_CLIENT } from "../mutations/clientMutations";

export const AddClientModel = () => {
  const [formData, setFormData] = useState({});

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleClicked = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    console.log(formData)
  }

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
              <form
              onSubmit={handleClicked}
              action="">
                <div className="mb 3">
                  <label className="form-label"> Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb 3">
                  <label className="form-label"> Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb 3">
                  <label className="form-label"> Phone</label>
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    onChange={handleChange}
                  />
                </div>

                  <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className=" btn btn-secondary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
