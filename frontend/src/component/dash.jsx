<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="dashboard.css" />
    <script
      src="https://kit.fontawesome.com/14850a9668.js"
      crossorigin="anonymous"
    ></script>
    <title>Document</title>
  </head>
  <body>
   
    <div className="main--content">
      <div className="header-wrapper">
        <div className="header-title">
          <span>Primary</span>
          <h2>Dashboard</h2>
        </div>
        <div className="user-info">
          <div className="search--box">
            <i className="fa-solid fa-search"></i>
            <input type="text" name="" placeholder="search..." id="" />
          </div>
          <img src="./images/user.png" alt="" />
        </div>
      </div>
      <!-- card container -->
      <div className="card-container">
        <h3 className="main-title">Today's data</h3>

        <div className="card-wrapper">
          <div className="payment-card light-red">
            <div className="card-header">
              <div className="amount">
                <span className="title"> payment amount </span>
                <span className="amount-value">Rs.500.00</span>
              </div>
              <i className="fas fa-dollar-sign icon"></i>
            </div>
            <span className="card-detail">**** **** **** 3458</span>
          </div>
          <!-- second card -->
          <div className="payment-card light-purple">
            <div className="card-header">
              <div className="amount">
                <span className="title"> payment amount </span>
                <span className="amount-value">Rs.500.00</span>
              </div>
              <i className="fas fa-list icon dark-purple"></i>
            </div>
            <span className="card-detail">**** **** **** 5521</span>
          </div>
          <!-- third card -->
          <div className="payment-card light-green">
            <div className="card-header">
              <div className="amount">
                <span className="title"> payment amount </span>
                <span className="amount-value">Rs.500.00</span>
              </div>
              <i className="fas fa-users icon dark-green"></i>
            </div>
            <span className="card-detail">**** **** **** 3458</span>
          </div>
          <!-- forth card -->
          <div className="payment-card light-blue">
            <div className="card-header">
              <div className="amount">
                <span className="title"> payment amount </span>
                <span className="amount-value">Rs.500.00</span>
              </div>
              <i className="fa-solid fa-check dark-blue icon"></i>
            </div>
            <span className="card-detail">**** **** **** 3458</span>
          </div>
        </div>
      </div>
      <!-- tabular content -->
      <div className="tabular-wrapper" style="display: flex">
        <h3 className="main-title">Finance Data</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023/05/2024</td>
                <td>dinner</td>
                <td>dinner with friends</td>
                <td>980Rs</td>
                <td>dinner</td>
                <td>paid</td>
                <td>ok</td>
              </tr>
              <tr>
                <td>2023/05/2024</td>
                <td>dinner</td>
                <td>dinner with friends</td>
                <td>980Rs</td>
                <td>dinner</td>
                <td>paid</td>
                <td>ok</td>
              </tr>
              <tr>
                <td>2023/05/2024</td>
                <td>dinner</td>
                <td>dinner with friends</td>
                <td>980Rs</td>
                <td>dinner</td>
                <td>paid</td>
                <td>ok</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="7 ">Total:Rs.10000</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </body>
</html>
