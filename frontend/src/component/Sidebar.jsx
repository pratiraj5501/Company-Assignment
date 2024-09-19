import { IoHomeSharp } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { LiaListSolid } from "react-icons/lia";
import { FaBox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import axios from "axios";
const Sidebar = () => {
  const navigate = useNavigate();
  const logOut = (event) => {
    event.preventDefault();
    console.log("logut ji");
    axios
      .post("http://localhost:8084/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="sidebar">
      <div className="logo">ok</div>
      <ul className="menu">
        <li className="activee">
          <Link to="/dashboard">
            <i>
              <IoHomeSharp />
            </i>{" "}
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/category">
            {" "}
            <i>
              <TbCategory />
            </i>{" "}
            <span>Category</span>
          </Link>
        </li>
        <li>
          <Link to="/subcategory">
            <i>
              <LiaListSolid />
            </i>{" "}
            <span>Subcategory</span>
          </Link>
        </li>
        <li>
          <Link to="/products">
            {" "}
            <i>
              <FaBox />
            </i>{" "}
            <span>Products </span>
          </Link>
        </li>

        <li className="logout" onClick={() => logOut(event)}>
          <a href="">
            <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
