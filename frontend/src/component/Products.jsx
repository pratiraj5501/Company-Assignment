import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteProductModal from "./DeleteProductModal";
//Icons
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";

const Products = () => {
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8084/viewproducts")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleViewProductDetail = (id) => {
    console.log("iam hadneview", id);
    navigate("/viewproductdetails", { state: { id: id } });
  };
  const handelDelete = (itemID) => {
    setDeleteItemId(itemID);
    setIsModalOpen(true);
  };
  const handleEdit = (itemID) => {
    navigate("/editproduct", { state: { productid: itemID } });
  };
  console.log("3table data", data);
  return (
    <div className="contentdiv" style={{ width: "85vw" }}>
      {isModalOpen && (
        <DeleteProductModal
          setIsModalOpen={setIsModalOpen}
          deleteItemId={deleteItemId}
        />
      )}
      <div className="tablediv">
        <div className="form m-5">
          <h3 style={{ fontWeight: "500" }}>Products</h3>
          <div
            className="upperside d-flex d-flex justify-content-end"
            style={{ margin: "1rem" }}
          >
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <Link to={"/addproduct"}>
              <button
                style={{
                  backgroundColor: "#652671",
                }}
                // onClick={handleOpenModal}
              >
                Add Product
              </button>
            </Link>
          </div>
          {/* table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Product name</th>
                  <th>Sub Category</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productid}</td>
                      <td>{item.ProductName}</td>
                      <td>{item.subcategoryname}</td>
                      <td>{item.categoryname}</td>
                      <td style={{ width: "30px" }}>
                        {/* {item.Image} */}
                        <img
                          src={`http://localhost:8084/uploads/${item.ProductImage}`}
                          // alt={item.CategoryName}
                          style={{ width: "80px" }}
                        />
                      </td>
                      <td>
                        {" "}
                        <span
                          style={
                            item.Status === 0
                              ? { color: "red" }
                              : { color: "green" }
                          }
                        >
                          {item.Status === 0 ? "Inactive" : "Active"}
                        </span>
                      </td>
                      <td>
                        <IoEyeOutline
                          style={{
                            fontSize: "1.5rem",
                            marginRight: "1.3rem",
                          }}
                          onClick={() =>
                            handleViewProductDetail(item.productid)
                          }
                        />
                        <FaRegEdit
                          style={{
                            fontSize: "1.5rem",
                            marginRight: "1.3rem",
                          }}
                          onClick={() => handleEdit(item.productid)}
                        />
                        <RiDeleteBin5Line
                          style={{ fontSize: "1.5rem" }}
                          onClick={() => handelDelete(item.productid)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No categories found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
