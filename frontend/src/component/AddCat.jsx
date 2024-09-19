import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const AddCat = () => {
  let rawCategory = useRef();
  let rawSequence = useRef();
  let rawImage = useRef();
  const navigate = useNavigate();
  // function to handle submitform (Add Category)
  const addCategory = (event) => {
    event.preventDefault();

    const category = rawCategory.current.value;
    const sequence = rawSequence.current.value;
    const image = rawImage.current.files[0];

    // Create a FormData object
    const formData = new FormData();
    formData.append("category", category);
    formData.append("sequence", sequence);
    formData.append("image", image);

    axios
      .post("http://localhost:8084/add", formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          navigate("/category");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCancle = () => {
    console.log("cancle ");
    navigate("/category");
  };

  return (
    <div
      className="formdiv d-flex justify-content-center align-items-start"
      style={{ width: "80vw" }}
    >
      <form
        encType="multipart/form-data"
        style={{
          marginTop: "2rem",
          padding: "1rem 5rem",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <h3 className="text-center"> Add Category</h3>
        <hr />
        <div className="form-group" style={{ padding: "2rem" }}>
          <label htmlFor="exampleInputEmail1">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="category"
            ref={rawCategory}
            style={{ padding: "1rem", marginTop: "0.7rem" }}
          />
        </div>
        <div className="form-group mb-4" style={{ padding: "2rem" }}>
          <label>Category sequence</label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="sequence"
            ref={rawSequence}
            style={{ padding: "1rem", marginTop: "0.7rem" }}
          />
        </div>
        <div className="mb-3" style={{ padding: "2rem" }}>
          <label htmlFor="formFile" className="form-label">
            upload image
          </label>
          <input
            className="form-control"
            name="image"
            type="file"
            id="formFile"
            ref={rawImage}
            style={{ padding: "1rem", marginTop: "0.7rem" }}
          />
        </div>
        <div
          className="btns d-flex  justify-content-center align-items-center "
          style={{}}
        >
          <button
            type="button"
            className="btn"
            style={{
              borderRadius: "15px",
              padding: "0.5rem",
              width: "6rem",
              marginRight: "1.5rem",
              border: "1px solid black",
            }}
            onClick={() => handleCancle()}
          >
            Cancle
          </button>
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: "#662671",
              color: "white",
              borderRadius: "15px",
              padding: "0.5rem",
              width: "8rem",
            }}
            onClick={addCategory}
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddCat;
