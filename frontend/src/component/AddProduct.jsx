import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subcategory from "./Subcategory";
const AddProduct = () => {
  const navigate = useNavigate();
  let rawCategory = useRef();
  let rawSubcategory = useRef();
  let rawProductName = useRef();
  let rawImage = useRef();
  const [fetchCategorydata, setFetchCategoryData] = useState("");
  const [fetchSubcategorydata, setFetchSubcategoryData] = useState("");
  useEffect(() => {
    axios
      .post("http://localhost:8084/fetchcategorynames")
      .then((res) => setFetchCategoryData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8084/fetchsubcategorynames")
      .then((res) => setFetchSubcategoryData(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("fetchCategorydata data --->", fetchCategorydata);
  console.log("fetchSubcategorydata data --->", fetchSubcategorydata);

  // this is handleAddsubmit btn function
  const handleAddProduct = (event) => {
    event.preventDefault();
    const category = rawCategory.current.value;
    const subCategory = rawSubcategory.current.value;
    const productName = rawProductName.current.value;
    const image = rawImage.current.files[0];
    // Create a FormData object
    const formData = new FormData();
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("productName", productName);
    formData.append("image", image);

    axios
      .post("http://localhost:8084/addproduct", formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };
  const handleCancle = () => {
    navigate("/products");
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
        <h3 className="text-center"> Add Product</h3>
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
            {fetchCategorydata.length > 0 ? (
              fetchCategorydata.map((item) => (
                <option value={item.id}>{item.categoryname}</option>
              ))
            ) : (
              <option>No categories available</option>
            )}
          </select>
        </div>

        <div className="form-group" style={{ padding: "1rem" }}>
          <label htmlFor="exampleInputEmail1">Subcategory Name</label>
          <br />
          <select
            style={{ padding: "1rem", marginTop: "0.7rem", width: "20rem" }}
            required
            ref={rawSubcategory}
          >
            <option value="">Select SubCategory</option>
            {fetchSubcategorydata.length > 0 ? (
              fetchSubcategorydata.map((item) => (
                <option value={item.id}>{item.subcategoryname}</option>
              ))
            ) : (
              <option>No sub categories available</option>
            )}
          </select>
        </div>

        <div className="form-group" style={{ padding: "2rem" }}>
          <label htmlFor="exampleInputEmail1">Prduct Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="product name"
            ref={rawProductName}
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
            onClick={() => handleAddProduct(event)}
          >
            Add product
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
