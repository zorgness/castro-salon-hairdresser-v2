import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Hamburger from '../images/hamburger.png'
import Logo from '../images/logo.jpg'
import { notify } from './admin/notify'
import { ToastContainer } from 'react-toastify';


const Navigation = ({authData, logout}) => {

  const handleLogout = () => {
    notify(`Bye bye ${authData.userData.username}`, 'logout')
    logout()
  };

  return (
    <>
      <ToastContainer />
      <Navbar
       collapseOnSelect expand="lg"
       bg={ authData.isAuthenticated ? 'dark' : "white"}
       variant={ authData.isAuthenticated ? 'dark' : "white"}
       className={ !authData.isAuthenticated && "border border-bottom-dark"}
       >
        <Container>
          <Navbar.Brand href="/" >
            <img src={Logo} alt="logo" className='avatar-large'/>
          </Navbar.Brand>
          { !authData.isAuthenticated ? <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <img src={Hamburger}  alt="hamburger-nav" className="avatar-small" />
          </Navbar.Toggle> : <Navbar.Toggle aria-controls="navbarScroll" /> }
          </Container>

          <Container className="mx-5">

            <Navbar.Collapse id="responsive-navbar-nav"  >
              <Nav className="pattaya text-center" >

                <Nav.Link href="/" className='mx-5'>Acceuil</Nav.Link>
                <Nav.Link href="/gallerie" className='mx-5'>Gallerie</Nav.Link>
                <Nav.Link href="/contact" className='mx-5'>Contact</Nav.Link>
                {
                  authData.isAuthenticated && (
                    <>
                      <NavDropdown title="Admin" id="collasible-nav-dropdown" >
                          <NavDropdown.Item  href="/admin_text_intro_index" className='mb-2 '>AdminIntro</NavDropdown.Item>
                          <NavDropdown.Item  href="/admin_gallery_index" className='mb-2 '>AdminGallery</NavDropdown.Item>
                          <NavDropdown.Item  href="/admin_message_index" className='mb-2 '>Messages</NavDropdown.Item>
                            <NavDropdown.Divider />
                          <NavDropdown.Item  onClick={handleLogout} className='mb-2 '>Logout</NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )
                }
              </Nav>
            </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
};



export default Navigation;
