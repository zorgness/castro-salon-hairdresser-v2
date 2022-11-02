import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
                      <Nav.Link href="/admin_text_intro_index" className='mx-5 text-white'>AdminIntro</Nav.Link>
                      <Nav.Link href="/admin_gallery_index" className='mx-5 text-white'>AdminGallery</Nav.Link>
                      <Nav.Link href="/admin_message_index" className='mx-5 text-white'>Messages</Nav.Link>
                      <Nav.Link onClick={handleLogout} className='mx-5 text-white'>Logout</Nav.Link>
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
