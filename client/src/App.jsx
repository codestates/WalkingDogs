// import logo from './logo.svg';
import './App.css';
import React,{useState, useEffect} from 'react'
import Nav from './Components/Nav'
import Mypage from './Pages/Mypage'
import Mypagechg from './Pages/Mypagechg'
import Landingpage from './Pages/Landingpage'
import Roomlist from './Pages/Roomlist';
import Footer from './Components/Footer'
import Oneroom from './Pages/Oneroom'
import Community from './Pages/Community'
import {BrowserRouter as Brouter, Route, Switch, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Modal from './Components/Modal';
import Signs from './Components/Signs'; 

function App() {

  const [currentHeight, setCurrentHeight] = useState(window.innerHeight);
  const {isCreateGatherModal, 
          isCreateDetailModal, 
          isSigninModal, 
          isSignupModal, 
          currentGatherInfo} = useSelector(({modalReducer}) => modalReducer);
  const isModal = isCreateGatherModal || isCreateDetailModal|| isSigninModal || isSignupModal;



  return (
    <Brouter>
        {/* Hello World<br/> */}
        <Nav/>
        <Switch>
          <Route exact path='/' conponent={Landingpage}/>
          <Route path='/mypage' conponent={Mypage}/>
          <Route path='/mypagechange' conponent={Mypagechg}/>
          <Route path='/roomlist' conponent={Roomlist}/>
          <Route path='/oneroom' conponent={Oneroom}/>
          <Route path='/community' conponent={Community}/>
          <Redirect from='*' to='/'/>
        </Switch>
        {isModal && (
          <Modal bgColor={isCreateDetailModal && 'var(--color-darkwhite)'}>
            {isSignupModal && <Signs type={"회원가입"}/>}
            {isSigninModal && <Signs type={"로그인"}/>}
          </Modal>
        )}
        <Footer/>
    </Brouter>
  );

}

export default App;
