import Sidebar from "./Sidebar";
import AddCatModal from "./DeleteCatModal";
import CategoryTableBody from "./CategoryTableBody";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";

//Icons
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeleteCatModal from "./DeleteCatModal";

const Category = () => {
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // const [refreshKey, setRefreshKey] = useState(0);
  // console.log("refreshKey", refreshKey);

  const navigate = useNavigate();

  let fetchedData;
  useEffect(() => {
    axios
      .get("http://localhost:8084/viewcategory")
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log("data-->", data);
  // const handleOpenModal = () => {
  //   setOpenModal(true);
  // };

  //Handle delete
  const handelDelete = (itemID) => {
    console.log("delete called..");
    setDeleteItemId(itemID);
    setIsModalOpen(true);
    console.log(isModalOpen);
  };
  const handleEdit = (id) => {
    navigate("/editcat", { state: { id: id, data: "sdadf" } });
  };

  return (
    <div className="contentdiv" style={{ width: "85vw" }}>
      {isModalOpen && (
        <DeleteCatModal
          setIsModalOpen={setIsModalOpen}
          deleteItemId={deleteItemId}
        />
      )}
      <div className="tablediv">
        <div className="form m-5">
          <h3 style={{ fontWeight: "500" }}>Category</h3>
          <div
            className="upperside d-flex justify-content-end"
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
            {/* <Link to={"/category/addcat"}> */}
            <Link to={"/category/addcat"}>
              {" "}
              <button
                style={{
                  backgroundColor: "#652671",
                }}
              >
                Add Category
              </button>
            </Link>
            {/* </Link> */}
          </div>
          {/* table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Category name</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Sequence</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.CategoryName}</td>
                      <td style={{ width: "30px" }}>
                        {/* {item.Image} */}
                        <img
                          src={`http://localhost:8084/uploads/${item.Image}`}
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
                      <td>{item.Sequence}</td>
                      <td>
                        <FaRegEdit
                          style={{
                            fontSize: "1.5rem",
                            marginRight: "1.3rem",
                          }}
                          onClick={() => handleEdit(item.id)}
                        />
                        <RiDeleteBin5Line
                          style={{ fontSize: "1.5rem" }}
                          onClick={() => handelDelete(item.id)}
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

          {/* table */}
        </div>
      </div>
    </div>
  );
};
export default Category;
