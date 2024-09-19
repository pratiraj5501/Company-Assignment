import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";

const DeleteProductModal = ({ deleteItemId, setIsModalOpen }) => {
  const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log("deleteItemId", deleteItemId);

  const handleDelete = () => {
    console.log("handle delte called", deleteItemId);
    axios
      .post("http://localhost:8084/deleteproduct", { id: deleteItemId })
      .then((res) => navigate(0))
      .catch((err) => console.log(err));
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
            <p>are you sure you want to delete product ?</p>
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

export default DeleteProductModal;
