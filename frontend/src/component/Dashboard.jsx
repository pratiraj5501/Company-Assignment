import Sidebar from "./Sidebar";
import Content from "./Content";
const Dashboard = () => {
  // ;

  return (
    // <>
    //   <h1>Welcome back {user} </h1>
    //   <button className="btn btn-primary" onClick={logout}>
    //     {" "}
    //     logout
    //   </button>
    // </>
    <div className="dashboard d-flex">
      {/* <Sidebar /> */}
      <Content />
    </div>
  );
};
export default Dashboard;
