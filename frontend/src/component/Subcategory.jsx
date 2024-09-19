import Sidebar from "./Sidebar";
import Content from "./Content";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteSubcatModal from "./deleteSubcatModal";

//Icons
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const Subcategory = () => {
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:8084/viewsubcategory")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleEdit = (id) => {
    navigate("/editsubcat", { state: { id: id } });
  };
  const handelDelete = (itemID) => {
    setDeleteItemId(itemID);
    setIsModalOpen(true);
  };
  return (
    <div className="contentdiv" style={{ width: "90vw" }}>
      {isModalOpen && (
        <DeleteSubcatModal
          setIsModalOpen={setIsModalOpen}
          deleteItemId={deleteItemId}
        />
      )}
      <div className="tablediv">
        <div className="form m-5">
          <h3 style={{ fontWeight: "500" }}>SubCategory</h3>
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
            <Link to={"/addsubcategory"}>
              <button
                style={{
                  backgroundColor: "#652671",
                }}
                // onClick={handleOpenModal}
              >
                Add SubCategory
              </button>
            </Link>
          </div>
          {/* table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>SubCategory name</th>
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
                      <td>{item.SubCategoryName}</td>
                      <td>{item.categoryname}</td>
                      <td style={{ width: "30px" }}>
                        {/* {item.Image} */}
                        <img
                          src={`http://localhost:8084/uploads/${item.SubCatImage}`}
                          alt={item.SubCategoryName}
                          style={{ width: "80px" }}
                        />
                      </td>
                      <td>
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
        </div>
      </div>
    </div>
  );
};
export default Subcategory;
