import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteSubcatModal = ({ setIsModalOpen, deleteItemId }) => {
  const navigate = useNavigate();
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    console.log("handle delte called");
    try {
      await axios.post("http://localhost:8084/deletesubcat", {
        id: deleteItemId,
      });
      navigate(0);
    } catch (err) {
      alert(
        "You cannot delte this item due to foreign key constraint Delete the child item first"
      );
      navigate(0);
    }
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
export default DeleteSubcatModal;
