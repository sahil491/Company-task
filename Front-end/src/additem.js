import axios from "axios";
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [Task_name, setTaskName] = useState("");
  const [isActive, setIsActive] = useState(true);

  //   const navigate = useNavigate();
  const [information, setInforamation] = useState([]);
  useEffect(() => {
    getItemsList();
  }, []);

  const getItemsList = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/task");
      setInforamation(res.data);
      //   console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      Task_name,
      isActive,
    };

    console.log(data);
    const response = await fetch("http://localhost:5500/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Task_name,
        isActive,
      }),
    });
    const output = await response.json();
    if (output.message === "successfull") {
      //   navigate("/userview");
      window.location.reload(true);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Task</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Task Name"
                value={Task_name}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="checkbox"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add User"
              />
            </div>
            {/* <div className="form-group">
              <input
                onClick={cancel}
                className="btn btn-block btn-primary"
                type="submit"
                value="Cancel"
              />
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
