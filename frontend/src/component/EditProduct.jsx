import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();

  const rawCatid = useRef();
  const rawProductName = useRef();
  const rawSubCatid = useRef();
  const rawStatus = useRef();
  const rawImage = useRef();

  const location = useLocation();
  const [fetchedData, setFetchedData] = useState("");
  const [fetchedSubCatData, setFetchedSubCatData] = useState("");
  const [fetchProductData, setFetchProductData] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const { productid } = location.state || {};

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

    if (productid) {
      fetchCategory();
    }
  }, []);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8084/fetchsubcategorynames"
        );
        setFetchedSubCatData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubCategory();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post("http://localhost:8084/viewproduct", {
          productid,
        });
        setFetchProductData(response.data.data[0]);
        setSelectedCategory(response.data.data[0].CatID);
        setSelectedSubCategory(response.data.data[0].SubCatID);
        setSelectedStatus(response.data.data[0].Status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const handleEditCat = (event) => {
    event.preventDefault();
    const productName = rawProductName.current.value;
    const catID = rawCatid.current.value;
    const subCatID = rawSubCatid.current.value;
    const status = rawStatus.current.value;
    const image = rawImage.current.files[0];
    // Create a FormData object
    const formData = new FormData();
    formData.append("productid", productid);
    formData.append("productName", productName);
    formData.append("catID", selectedCategory);
    formData.append("subCatID", selectedSubCategory);
    formData.append("status", selectedStatus);
    formData.append("image", image);

    axios
      .post("http://localhost:8084/editproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          navigate("/products");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Update the selected category when changed
  };
  const handleSubCategoryChange = (event) => {
    selectedSubCategory(event.target.value); // Update the selected category when changed
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value); // Update the selected category when changed
  };
  const handleCancle = () => {
    navigate("/products");
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
          <h3 className="text-center">Edit Product</h3>
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
              ref={rawCatid}
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Choose a option</option>
              {fetchedData.length > 0 ? (
                fetchedData.map((item) => (
                  <option value={item.id}>{item.categoryname}</option>
                ))
              ) : (
                <option>No categories available</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="exampleSelect" className="form-label">
              Select SubCategory
            </label>
            <select
              className="form-select"
              id="exampleSelect"
              ref={rawSubCatid}
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
              <option value="">Choose a option</option>
              {fetchedSubCatData.length > 0 ? (
                fetchedSubCatData.map((item) => (
                  <option value={item.id}>{item.subcategoryname}</option>
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
            <label htmlFor="exampleInputEmail1">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Product Name"
              ref={rawProductName}
              defaultValue={fetchProductData.ProductName}
              style={{ marginTop: "0.7rem" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleSelect" className="form-label">
              Select Status
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

          <div className="previousImg">
            <p>Previously Uploaded Image</p>
            <div className="imgbox">
              <img
                src={`http://localhost:8084/uploads/${fetchProductData.ProductImage}`}
                // alt={item.CategoryName}
                style={{ width: "80px" }}
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
export default EditProduct;
