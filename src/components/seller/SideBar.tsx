import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="">
        <button
          className=""
          type="button"
          onClick={toggleSidebar}
        >
          <IoMenu className="text-3xl md:text-4xl" />
        </button>
      </div>

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-gradient-primary sidebar sidebar-dark accordion ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
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

          <li className="nav-item">
            <a className="nav-link" href="/seller/add-product">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>Add Product</span>
            </a>
          </li>

          {/* <li className="nav-item">
            <a className="nav-link" href="/seller/update-product">
              <i className="fas fa-fw fa-table"></i>
              <span>Update Product</span>
            </a>
          </li> */}

          <li className="nav-item">
            <a className="nav-link" href="/seller/delete-product">
              <i className="fas fa-fw fa-table"></i>
              <span>Delete Product</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

          <li className="nav-item">
            <a className="nav-link" href="/">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>Return</span>
            </a>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />

          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
              onClick={toggleSidebar}
            ></button>
          </div>

        </ul>
      </div>
    </>
  );
};

export default SideBar;
