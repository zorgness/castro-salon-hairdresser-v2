import React, {useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Hamburger from '../images/hamburger.png'
import Logo from '../images/logo.jpg'
import { connect } from 'react-redux'
import { userLogout } from '../Redux/actions/loginAction'
import { fetchData} from '../Api/FecthData'



const Navigation = ({authData, logout}) => {



  const [user, setUser] = useState()
  const [authenticated, setAuthenticated] = useState()
  const [load, setLoad] = useState(true)


  // localStorage.clear()
  // sessionStorage.clear()

  const userId = localStorage.getItem('userId');
  const isAuthenticated = localStorage.getItem('authenticated');

  useEffect(() => {




    if (load) {

      if (userId) {

        if (sessionStorage.getItem('userData')) {

          console.log('storage auth')
          setUser(JSON.parse(sessionStorage.getItem('userData')))
          setAuthenticated(isAuthenticated)


        } else {

            console.log('api auth')
            getUserData(userId)
            setAuthenticated(isAuthenticated)

        }
      }
    }
    return(() => {
      setLoad(false)
    })
  }, [load]);


  const getUserData = id => {

    const urlMain = process.env.REACT_APP_URL_MAIN
    const userProfileUrl = `${urlMain}/api/users`

    fetchData(userProfileUrl + '/' + id).then(res => {
      setUser(res)
      sessionStorage.setItem('userData', JSON.stringify(res))
    })
  };

  const handleLogout = () => {
    logout()
    localStorage.clear()
    sessionStorage.clear()

  };

  console.log(authData.isAuthenticated)



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
                <Nav.Link href="/" className='mx-5'>{user?.username}</Nav.Link>
                <Nav.Link href="/" className='mx-5'>Acceuil</Nav.Link>
                <Nav.Link href="/gallerie" className='mx-5'>Gallerie</Nav.Link>
                <Nav.Link href="/contact" className='mx-5'>Contact</Nav.Link>
                {
                  authenticated && (
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

const mapStateToProps = (state) => {
  return {
    authData: state.auth
  }
};


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userLogout())
  }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Navigation);
