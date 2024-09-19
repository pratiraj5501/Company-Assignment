import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewProudctDetails = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [subCatData, setSubCatData] = useState("");
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    axios
      .post("http://localhost:8084/viewproduct", { productid: id })
      .then((res) => {
        // console.log(res);
        setProductData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(productData.CatID);
  useEffect(() => {
    axios
      .post("http://localhost:8084/fetchcategorynames", {
        categoryid: productData.CatID,
      })
      .then((res) => setCategoryData(res.data.data[0]))
      .catch((err) => {
        console.error("Error fetching category names:", err);
        // Display error message to the user or handle it appropriately
      });
  }, [productData.CatID]);

  console.log(productData);

  useEffect(() => {
    axios
      .post("http://localhost:8084/fetchsubcategorynames", {
        subcatID: productData.SubCatID,
      })
      .then((res) => setSubCatData(res.data.data[0]))
      .catch((err) => {
        console.error("Error fetching category names:", err);
        // Display error message to the user or handle it appropriately
      });
  }, [productData.SubCatID]);
  const cancleView = () => {
    navigate("/products");
  };
  return (
    <div
      className="container "
      style={{
        border: "1px solid black",
        borderRadius: "20px",
        width: "75vw",
        marginLeft: "30vh",
        height: "75vh",
        marginTop: "30vh",
        padding: "3rem",
        marginTop: "4rem",
        marginLeft: "7rem",
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Product Details</h1>
      <hr />
      <div className="divcontainer  d-flex align-items-center justify-content-between">
        <div className="productname mt-5">
          <p style={{ fontWeight: "400", fontSize: "2rem" }}>Product Name</p>{" "}
          <span style={{ textAlign: "center", fontSize: "1.2rem" }}>
            {productData.ProductName}
          </span>
        </div>
        <div className="category mt-5">
          <p style={{ fontWeight: "400", fontSize: "2rem" }}>
            Product Category
          </p>{" "}
          <span style={{ textAlign: "center", fontSize: "1.2rem" }}>
            {categoryData.categoryname}
          </span>
        </div>
        <div className="status mt-5">
          <p style={{ fontWeight: "400", fontSize: "2rem" }}> status</p>
          <span
            style={
              productData.Status === 0 ? { color: "red" } : { color: "green" }
            }
          >
            {productData.Status === 0 ? "Inactive" : "Active"}
          </span>
        </div>
        <div className="subcategroy mt-5">
          <p style={{ textAlign: "center", fontSize: "2rem" }}>subcategory</p>{" "}
          <span>{subCatData.subcategoryname}</span>
        </div>
      </div>

      <div
        className="btncontainer d-flex justify-content-between"
        style={{ marginTop: "20%" }}
      >
        <div
          className="imgcontainer "
          style={{
            height: " 15rem",
            marginTop: "-12rem",
            width: "21.875rem",
            borderRadius: "5px",
          }}
        >
          <img
            src={`http://localhost:8084/uploads/${productData.ProductImage}`}
            alt={productData.ProductName}
            style={{ width: "100%" }}
          />
        </div>
        <div className="btncollection d-flex">
          <div
            className="btn-btn"
            style={{
              border: "1px solid black",
              marginRight: "3rem",
              padding: "0.6rem",
              width: "5rem",
              height: "3rem",
              textAlign: "center",
              borderRadius: "15px",
              backgroundColor: "rgb(230,226,235)",
            }}
            onClick={() => cancleView()}
          >
            Cancle
          </div>
          <div
            className="btn-btn"
            style={{
              border: "1px solid red",
              marginRight: "3rem",
              padding: "0.6rem",
              width: "5rem",
              height: "3rem",
              textAlign: "center",
              borderRadius: "15px",
              backgroundColor: "rgb(48,212,111)",
            }}
            onClick={() => cancleView()}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewProudctDetails;
