
import { IoMenu } from "react-icons/io5";

const SideBar = () => {
  return (
    <>
      <div className="">
        <button
          className=""
          type="button"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
        >
          <IoMenu className="text-3xl md:text-4xl"/>
        </button>
      </div>

      <div
        id="drawer-navigation"
        className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-gradient-primary sidebar sidebar-dark accordion"
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Cartopia</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/seller/dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading">Interface</div>

          {/* <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseComponents" aria-expanded="true" aria-controls="collapseComponents">
              <i className="fas fa-fw fa-cog"></i>
              <span>Components</span>
            </a>
            <div id="collapseComponents" className="collapse" aria-labelledby="headingComponents" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Components:</h6>
                <a className="collapse-item" href="/seller/add-product">Add Product</a>
                <a className="collapse-item" href="/seller/update-product">Update Product</a>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
              <i className="fas fa-fw fa-wrench"></i>
              <span>Utilities</span>
            </a>
            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <a className="collapse-item" href="/seller/delete-product">Delete Product</a>
              </div>
            </div>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading">Addons</div>

          <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
              <i className="fas fa-fw fa-folder"></i>
              <span>Pages</span>
            </a>
            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Login Screens:</h6>
                <a className="collapse-item" href="login.html">Login</a>
                <a className="collapse-item" href="register.html">Register</a>
                <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                <div className="collapse-divider"></div>
                <h6 className="collapse-header">Other Pages:</h6>
                <a className="collapse-item" href="404.html">404 Page</a>
                <a className="collapse-item" href="blank.html">Blank Page</a>
              </div>
            </div>
          </li> */}

          <li className="nav-item">
            <a className="nav-link" href="/seller/add-product">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>Add Product</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/seller/update-product">
              <i className="fas fa-fw fa-table"></i>
              <span>Update Product</span>
            </a>
          </li>


          <li className="nav-item">
            <a className="nav-link" href="/seller/delete-product">
              <i className="fas fa-fw fa-table"></i>
              <span>Delete Product</span>
            </a>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />

          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle"></button>
          </div>

          
        </ul>
      </div>
    </>
  );
};

export default SideBar;












//Tampilan lama ------------------------------------------------------

// import { IoMenu } from "react-icons/io5";

// const SideBar = () => {
//   return (
//     <>
//       <div className="">
//         <button
//           className=""
//           type="button"
//           data-drawer-target="drawer-navigation"
//           data-drawer-show="drawer-navigation"
//           aria-controls="drawer-navigation"
//         >
          
//           <IoMenu className="text-3xl md:text-4xl"/>
//         </button>
//       </div>

//       <div
//         id="drawer-navigation"
//         className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
//         tabIndex={-1}
//         aria-labelledby="drawer-navigation-label"
//       >
//         <h5
//           id="drawer-navigation-label"
//           className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
//         >
//           Menu
//         </h5>
//         <button
//           type="button"
//           data-drawer-hide="drawer-navigation"
//           aria-controls="drawer-navigation"
//           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//         >
//           <svg
//             aria-hidden="true"
//             className="w-5 h-5"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//           <span className="sr-only">Close menu</span>
//         </button>
//         <div className="py-4 overflow-y-auto">
//           <ul className="space-y-2 font-medium">
//             <li>
//               <a
//                 href="/seller/dashboard"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ms-3">Dashboard</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/seller/add-product"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 18"
//                 >
//                   <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">Add Product</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/seller/update-product"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 18 20"
//                 >
//                   <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">Update Product</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/seller/delete-product"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 18 16"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
//                   />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">Delete Product</span>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideBar;
