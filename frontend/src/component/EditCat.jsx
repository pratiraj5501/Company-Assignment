import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditCat = () => {
  const [fetchedData, setFetchedData] = useState("");

  let rawCategory = useRef();
  let rawSequence = useRef();
  let rawImage = useRef();
  let rawStatus = useRef();
  const navigate = useNavigate();
  let changleVal;

  const location = useLocation();
  const { id, data } = location.state || {}; // Access the data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8084/fetchcategory",
          { id }
        );
        setFetchedData(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  // function to handle EditCategory
  const handleEditCat = (event) => {
    event.preventDefault();
    console.log("selected id ", id);
    const category = rawCategory.current.value;
    const status = rawStatus.current.value;
    const sequence = rawSequence.current.value;
    const image = rawImage.current.files[0] || null;
    // Create a FormData object
    const formData = new FormData();
    formData.append("id", id);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("sequence", sequence);
    formData.append("image", image);
    console.log("handleeditbtn");
    axios
      .post("http://localhost:8084/editcategory", formData, {
        headers: {
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
    navigate("/category");
  };
  return (
    <div
      className="formdiv"
      style={{
        padding: "1rem",
        width: "100vw",
        border: "1px solid blue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        encType="multipart/form-data"
        style={{
          width: "35rem",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "1.5rem",
        }}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="category"
            ref={rawCategory}
            defaultValue={fetchedData.CategoryName}
            style={{ marginTop: "0.7rem" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleSelect" className="form-label">
            Select an option
          </label>
          <select
            className="form-select"
            id="exampleSelect"
            // onChange={DOMRectReadOnly}
            // value={fetchedData.Status == 1 ? 1 : 0}
            ref={rawStatus}
            defaultValue={""}
          >
            <option value="">Choose status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label>Category sequence</label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="sequence"
            ref={rawSequence}
            defaultValue={fetchedData.Sequence}
          />
        </div>
        <div className="previousImg">
          <p>Previously Uploaded Image</p>
          <div className="imgbox">
            <img
              src={`http://localhost:8084/uploads/${fetchedData.Image}`}
              style={{
                width: "70px",
                marginLeft: "2rem",
                marginBottom: "3rem",
              }}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload Image
          </label>
          <input
            className="form-control"
            name="image"
            type="file"
            id="formFile"
            ref={rawImage}
          />
        </div>
        <div className="btns d-flex align-items-center justify-content-center">
          <button
            type="button"
            className="btn"
            style={{
              border: "1px solid black",
              borderRadius: "15px",
              padding: "0.5rem",
              width: "6rem",
              marginRight: "1rem",
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
              width: "6rem",
            }}
            onClick={() => handleEditCat(event)}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCat;
