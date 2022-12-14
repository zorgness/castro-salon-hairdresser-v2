import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Hamburger from "../images/hamburger.png";
import Logo from "../images/logo.jpg";
import { notify } from "./admin/notify";
import { ToastContainer } from "react-toastify";

const Navigation = ({ authData, logout }) => {
  const handleLogout = () => {
    notify(`Bye bye ${authData.userData.username}`, "logout");
    logout();
  };

  const appBarIntialStyle = {
    background: "none",
    boxShadow: "none",
  };

  const linkIntialStyle = {
    color: "white",
  };

  const handleMouseOver = (e) => {
    e.target.style.color = isNavTransparent ? "lightgrey" : "black";
  };

  const handleMouseOut = (e) => {
    e.target.style.color = isNavTransparent ? "white" : "grey";
  };

  const [appBarStyle, setAppBarStyle] = React.useState(appBarIntialStyle);
  const [linkStyle, setLinkStyle] = React.useState(linkIntialStyle);
  const [isNavTransparent, setIsNavTransparent] = React.useState(true);

  React.useEffect(() => {
    const onScroll = (e) => {
      if (e.target.documentElement.scrollTop >= 100) {
        setAppBarStyle({
          background: "white",
          transition: "background .5s ease-out",
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
        });
        setIsNavTransparent(false);
        setLinkStyle({
          color: "grey",
          hover: {
            color: "black",
          },
        });
      } else {
        setAppBarStyle({
          background: "transparent",
          transition: "background .5s ease-out",
          boxShadow: "none",
        });
        setIsNavTransparent(true);
        setLinkStyle({
          color: "white",
          hover: {
            color: "grey",
          },
        });
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const expand = "sm";

  return (
    <>
      <ToastContainer />
      <Navbar
        collapseOnSelect
        expand="lg"
        bg={authData.isAuthenticated ? "dark" : ""}
        variant={authData.isAuthenticated ? "dark" : "navigate"}
        className={!authData.isAuthenticated ? "" : "border border-dark"}
        style={appBarStyle}
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} alt="logo" className="avatar-large" />
          </Navbar.Brand>
          {!authData.isAuthenticated ? (
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className={
                authData.isAuthenticated ? "bg-dark" : "bg-white opacity-75"
              }
            >
              <img
                src={Hamburger}
                alt="hamburger-nav"
                className="avatar-small"
              />
            </Navbar.Toggle>
          ) : (
            <Navbar.Toggle aria-controls="navbarScroll" />
          )}
        </Container>

        <Container className="mx-5">
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            className={
              authData.isAuthenticated
                ? "bg-dark offcanvas-container"
                : "bg-white offcanvas-container"
            }
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img src={Logo} alt="logo" className="avatar-large" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="pattaya text-center">
                <Nav.Link
                  href="/"
                  className="mx-5"
                  style={linkStyle}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  Acceuil
                </Nav.Link>
                <Nav.Link
                  href="/gallerie"
                  className="mx-5"
                  style={linkStyle}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  Gallerie
                </Nav.Link>
                <Nav.Link
                  href="/contact"
                  className="mx-5"
                  style={linkStyle}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  Contact
                </Nav.Link>
                {authData.isAuthenticated && (
                  <>
                    <NavDropdown title="Admin" id="collasible-nav-dropdown">
                      <NavDropdown.Item
                        href="/admin_text_intro_index"
                        className="mb-2 "
                      >
                        AdminIntro
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/admin_gallery_index"
                        className="mb-2 "
                      >
                        AdminGallery
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/admin_message_index"
                        className="mb-2 "
                      >
                        Messages
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={handleLogout}
                        className="mb-2 "
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
