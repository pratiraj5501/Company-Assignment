import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Subcategory from "./Subcategory";
const AddSubcategory = () => {
  const navigate = useNavigate();
  let rawCategory = useRef();
  let rawSubcategory = useRef();
  let rawSubcategorySequence = useRef();
  let rawImage = useRef();
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .post("http://localhost:8084/fetchcategorynames")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // this is handleAddsubmit btn function
  const handleAddSubcategory = (event) => {
    event.preventDefault();
    const category = rawCategory.current.value;
    const subCategory = rawSubcategory.current.value;
    const subCategorySequence = rawSubcategorySequence.current.value;
    const image = rawImage.current.files[0];
    // Create a FormData object
    const formData = new FormData();
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("subcategorysequence", subCategorySequence);
    formData.append("image", image);

    axios
      .post("http://localhost:8084/addsubcategory", formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/subcategory");
      })
      .catch((err) => console.log(err));
  };
  const handleCancle = () => {
    navigate("/subcategory");
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
        <h3 className="text-center"> Add Subcategory</h3>
        <hr />
        <div className="form-group" style={{ padding: "1rem" }}>
          <label htmlFor="exampleInputEmail1">Category Name</label>
          <br />
          <select
            style={{ padding: "1rem", marginTop: "0.7rem", width: "20rem" }}
            required
            ref={rawCategory}
          >
            <option value="">Select Category</option>
            {data.length > 0 ? (
              data.map((item) => (
                <option value={item.id}>{item.categoryname}</option>
              ))
            ) : (
              <option>No categories available</option>
            )}
          </select>
        </div>
        <div className="form-group" style={{ padding: "2rem" }}>
          <label htmlFor="exampleInputEmail1">Subcategory Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="subcategory"
            ref={rawSubcategory}
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
            ref={rawSubcategorySequence}
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
              width: "9rem",
            }}
            onClick={() => handleAddSubcategory(event)}
          >
            Add Subcategory
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddSubcategory;
