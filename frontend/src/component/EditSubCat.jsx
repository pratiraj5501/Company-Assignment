import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditSubCat = () => {
  const navigate = useNavigate();
  const rawCategory = useRef();
  const rawSubcategory = useRef();
  const rawStatus = useRef();
  const rawSequence = useRef();
  const rawImage = useRef();
  const location = useLocation();
  const [fetchedData, setFetchedData] = useState("");
  const [fetchedSubCatData, setFetchedSubCatData] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const { id } = location.state || {};
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8084/fetchcategorynames"
        );
        setFetchedData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);
  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8084/fetchsubcategory",
          { id }
        );
        setFetchedSubCatData(response.data.data[0]);
        setSelectedCategory(response.data.data[0].CategoryID);
        setSelectedStatus(response.data.data[0].Status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubCategory();
  }, []);

  const handleEditCat = (event) => {
    event.preventDefault();
    const subcategory = rawSubcategory.current.value;
    const sequence = rawSequence.current.value;
    const image = rawImage.current.files[0];

    const formData = new FormData();
    formData.append("id", id);
    formData.append("category", selectedCategory);
    formData.append("subcategory", subcategory);
    formData.append("status", selectedStatus);
    formData.append("sequence", sequence);
    formData.append("image", image);

    axios
      .post("http://localhost:8084/editsubcategory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/subcategory");
        }
      })
      .catch((err) => console.log(err));

    console.log("handleeditbtn");
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleCancle = () => {
    navigate("/subcategory");
  };
  return (
    <div
      className="smallContainer d-flex align-items-center justify-content-center"
      style={{
        width: "100vw",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <div
        className="formdiv col-5"
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "1rem",
        }}
      >
        <form encType="multipart/form-data">
          <h3 className="text-center">Edit Sub Category</h3>
          <hr />
          <div className="form-group">
            <label htmlFor="exampleSelect" className="form-label">
              Select Category
            </label>
            <select
              className="form-select"
              id="exampleSelect"
              // onChange={DOMRectReadOnly}
              // value={fetchedData.Status == 1 ? 1 : 0}
              ref={rawCategory}
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {fetchedData.length > 0 ? (
                fetchedData.map((item) => (
                  <option value={item.id}>{item.categoryname}</option>
                ))
              ) : (
                <option>No categories available</option>
              )}
            </select>
          </div>
          <div
            className="form-group"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <label htmlFor="exampleInputEmail1">Subcategory Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="subcategory"
              ref={rawSubcategory}
              defaultValue={fetchedSubCatData.SubCategoryName}
              style={{ marginTop: "0.7rem" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleSelect" className="form-label">
              Select Select
            </label>
            <select
              className="form-select"
              id="exampleSelect"
              // onChange={DOMRectReadOnly}
              // value={fetchedData.Status == 1 ? 1 : 0}
              ref={rawStatus}
              value={selectedStatus}
              onChange={handleStatusChange}
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
              defaultValue={fetchedSubCatData.Sequence}
              ref={rawSequence}
              style={{ padding: "1rem", marginTop: "0.7rem" }}
              // defaultValue={fetchedData.Sequence}s
            />
          </div>
          <div className="previousImg">
            <p>Previously Uploaded Image</p>
            <div className="imgbox">
              <img
                src={`http://localhost:8084/uploads/${fetchedSubCatData.SubCatImage}`}
                style={{
                  width: "80px",
                  marginLeft: "2rem",
                  marginBottom: "3rem",
                }}
              />
            </div>
          </div>
          <div className="mb-3" style={{ padding: "1rem" }}>
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
                borderRadius: "15px",
                padding: "0.5rem",
                width: "6rem",
                marginBottom: "1rem",
                marginRight: "1rem",
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
                width: "6rem",
                marginBottom: "1rem",
              }}
              onClick={() => handleEditCat(event)}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};
export default EditSubCat;
