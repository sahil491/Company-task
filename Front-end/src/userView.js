import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

const UserView = () => {
  const [information, setInforamation] = useState([]);

  useEffect(() => {
    getItemsList();
  }, []);

  const getItemsList = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/task");
      setInforamation(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  function deleteUser(_id) {
    // alert(_id);
    fetch(`http://localhost:5500/api/task/${_id}`, {
      method: "DELETE",
    }).then((result) => {
      alert("user Deleted");

      result.json().then((res) => {
        console.log(res);
      });
      getItemsList();
    });
  }
  // const updateItem = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:5500/api/task/${isUpdating}`,
  //       { Task_name: updateItemText }
  //     );
  //     console.log(res.data);
  //     const updatedItemIndex = listItems.findIndex(
  //       (item) => item._id === isUpdating
  //     );
  //     const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
  //     setUpdateItemText("");
  //     setIsUpdating("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   getItemsList();
  // };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Task</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {information?.length > 0 ? (
                information.map((item, id) => (
                  <tr key={id}>
                    <td>{item.Task_name}</td>
                    <td>
                      {item.isActive === true ? (
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexSwitchCheckChecked"
                          ></label>
                        </div>
                      ) : (
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                          />
                          <label
                            class="form-check-label"
                            for="flexSwitchCheckChecked"
                          ></label>
                        </div>
                      )}
                    </td>
                    <td>
                      {/* <Link
                        to={`/edit/${item._id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link> */}
                      <button
                        type="button"
                        onClick={() => deleteUser(item._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                      {/* <button
                        className="update-item"
                        onClick={() => {
                          updateItem(item._id);
                        }}
                      >
                        Update
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th></th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserView;
