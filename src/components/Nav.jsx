import { Button, Navbar, Dropdown, Avatar } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Nav() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const signOut = () => {
    // remove data front the redux store
  };
  return (
    <Navbar fluid rounded className="border-b-2 !px-10 z-50">
      <Navbar.Brand href="*">
        <span className="self-center whitespace-nowrap dark:text-white italic font-extrabold text-lg md:text-2xl text-[#ff385c]">
          RENITFY
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {currentUser ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {currentUser.firstName} {currentUser.lastName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to="/dashboard">
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>

              <Dropdown.Item>Settings</Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </>
        ) : (
          <Link to="/signup">
            <Button>Signup</Button>
          </Link>
        )}
      </div>
      <Navbar.Collapse className="md:ml-16 ml-0">
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
