import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Hamburger from '../images/hamburger.png'
import Logo from '../images/logo.jpg'


const Navigation = ({authData, logout}) => {

console.log(authData);


  const handleLogout = () => logout();


  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="white" variant="white" className="border border-bottom-dark">
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} alt="logo" className='avatar-large'/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <img src={Hamburger} alt="hamburger-nav" className="avatar-small" />
          </Navbar.Toggle>
          </Container>

          <Container className="mx-5">

            <Navbar.Collapse id="responsive-navbar-nav"  >
              <Nav className="pattaya text-center" >
                <Nav.Link href="/" className='mx-5'>{authData?.userData?.username}</Nav.Link>
                <Nav.Link href="/" className='mx-5'>Acceuil</Nav.Link>
                <Nav.Link href="/gallerie" className='mx-5'>Gallerie</Nav.Link>
                <Nav.Link href="/contact" className='mx-5'>Contact</Nav.Link>
                {
                  authData.isAuthenticated && (
                    <>
                      <Nav.Link href="/admin_text_intro_index" className='mx-5'>AdminIntro</Nav.Link>
                      <Nav.Link href="/admin_gallery_index" className='mx-5'>AdminGallery</Nav.Link>
                      <Nav.Link onClick={handleLogout} className='mx-5'>Logout</Nav.Link>
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
