import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";

const DeleteCatModal = ({ deleteItemId, setIsModalOpen }) => {
  const navigate = useNavigate();

  console.log("deleteItemId", deleteItemId);

  const handleDelete = async () => {
    console.log("handle delte called");
    try {
      await axios.post("http://localhost:8084/delete", { id: deleteItemId });

      navigate(0);
    } catch (err) {
      alert(
        "You cannot delte this item due to foreign key constraint Delete the child item first"
      );
      navigate(0);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete !!</h5>
          </div>
          <div className="modal-body">
            <p>are you sure you want to delete ?</p>
          </div>
          <div className="modal-footer align-items-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={closeModal} // Close on save as well
            >
              cancle
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleDelete()} // Close the modal on click
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCatModal;
