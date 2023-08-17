import React from 'react'

const SideNav = (props) => {

  const {
    userLogo,
    user,
    Link,
    showProfileContent,
    showProfileCont,
    roleDetails,
    showManageProduct,
    showManageProds,
    showManageUser,
    showManageuser,
    logoutUser,
    showOrderpage,
    showOrderPage,
    showManageOrder,
    showManageOrders,
  } = props.data;


  return (
    <>
      <div className="sidenav">
        <div className="sidenavborder">
          <div className="profile">
            <img src={userLogo} className="alpesNoob-img" alt="" width="80px" height="80px" />
          </div>
          <div className="name">{user.username}</div>
          <div className="sidenav-url">
            <div className="url">
              <Link
                onClick={showProfileContent}
                className={`listofform ${showProfileCont ? "active" : ""
                  }`}
              >
                Profile
              </Link>
            </div>
            <div className="url">
              <Link
                onClick={showOrderpage}
                className={`listofform ${showOrderPage ? "active" : ""
                  }`}
              >
                Orders
              </Link>
            </div>
            {roleDetails.role === "admin" ? (
              <>
                <div className="url">
                  <Link
                    onClick={showManageProduct}
                    className={`listofform ${showManageProds ? "active" : ""
                      }`}
                  >
                    Manage Products
                  </Link>
                </div>
                <div className="url">
                  <Link
                    onClick={showManageOrders}
                    className={`listofform ${showManageOrder ? "active" : ""
                      }`}
                  >
                    Manage Orders
                  </Link>
                </div>
                <div className="url">
                  <Link
                    onClick={showManageUser}
                    className={`listofform ${showManageuser ? "active" : ""
                      }`}
                  >
                    Manage Users
                  </Link>
                </div>
              </>
            ) : null}
            <div className="url">
              <Link className="listofform" onClick={logoutUser}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideNav