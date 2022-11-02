import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import Navigation from './components/Navigation';
import Footer from './components/Footer'
import Index from './components/Index';
import Login from './components/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Gallery from './components/Gallery';
import GalleryShow from './components/GalleryShow';
import Contact from './components/Contact';
import GalleryNewAdmin from './components/admin/GalleryNewAdmin';
import GalleryIndexAdmin from './components/admin/GalleryIndexAdmin';
import GalleryEditAdmin from './components/admin/GalleryEditAdmin';
import TextIntroNewAdmin from './components/admin/TextIntroNewAdmin';
import TextIntroIndexAdmin from './components/admin/TextIntroIndexAdmin';
import MessageIndexAdmin from './components/admin/MessageIndexAdmin';
import MyCookie from './components/MyCookie';
import ErrorPage from './components/ErrorPage';
import RequireAuth from './components/admin/RequireAuth';
import ScrollToTop from './util/ScrollToTop'
import { connect } from 'react-redux'
import { userProfileFetch, userSetId, userLogout } from '../src/Redux/actions/loginAction'


const App = ({authData, logout, setId, fetchProfile}) =>  {


  const userId = window.localStorage.getItem('userId');

  useEffect(() => {

    if (userId) {
      setId(userId);
    }
  }, [userId, setId])

  useEffect(() => {
    if(userId) {
      fetchProfile(userId)
    }

  }, [userId, fetchProfile]);



  return (
    <div className="App">

      <MyCookie />

      <Navigation authData={authData} logout={logout}  />

      <BrowserRouter>
        <ScrollToTop >
          <Routes>
              <Route path="/" element={<Index />}/>
              <Route path="/gallerie" element={<Gallery />}/>
              <Route path="/gallerie/:id" element={<GalleryShow />}/>
              <Route path="/contact" element={<Contact />}/>
              <Route path="/login" element={<Login />}/>

              {/* protected routes */}
              <Route element={<RequireAuth />} >
                <Route path="/admin_text_intro_new" element={<TextIntroNewAdmin />}/>
                <Route path="/admin_text_intro_index" element={<TextIntroIndexAdmin />}/>
                <Route path="/admin_gallery_new" element={<GalleryNewAdmin />}/>
                <Route path="/admin_gallery_index" element={<GalleryIndexAdmin />}/>
                <Route path="/admin_gallery_edit/:id" element={<GalleryEditAdmin />}/>
                <Route path="/admin_message_index" element={<MessageIndexAdmin />}/>
              </Route>

              <Route path="*" element={<ErrorPage />} />

          </Routes>
        </ScrollToTop>
      </BrowserRouter>

      <Footer />



    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authData: state.auth
  }
};


const mapDispatchToProps = dispatch => {
  return {
    setId: userId => dispatch(userSetId(userId)),
    fetchProfile: userId => dispatch(userProfileFetch(userId)),
    logout: () => dispatch(userLogout())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
