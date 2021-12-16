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
import {BrowserRouter as Brouter, Route, Switch, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Modal from './Components/Modal';
import Signs from './Components/Signs'; 
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { signinAction } from './store/actions';
import Maps from './Pages/Maps'
import RoomCreate from './Components/RoomCreate'
import PwChange from './Components/PwChange'

import auth from './api/auth';
import users from './api/users';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { isLogin } = useSelector(({authReducer})=> authReducer);
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight);
  const {isCreateGatherModal, 
          isCreateDetailModal, 
          isSigninModal, 
          isSignupModal,
          isPasswordChgModal,
          currentGatherInfo} = useSelector(({modalReducer}) => modalReducer);
  const isModal = isCreateGatherModal || isCreateDetailModal|| isSigninModal || isSignupModal || isPasswordChgModal;
  const dispatch = useDispatch();

  const getAccessToken = async (url) => {
    const where = url.searchParams.get('where')
    const authorizationCode = url.searchParams.get('code')
    let result
    if(where === 'google')
      result = await auth.googleApi(authorizationCode)
    else
      result = await auth.kakaoApi(authorizationCode)

    console.log(result)
    localStorage.setItem('userData', JSON.stringify({ ...result.data.data }))
    dispatch(signinAction(JSON.parse(localStorage.getItem('userData'))))
  }

  useEffect(async () => {
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    if(authorizationCode) {
      await getAccessToken(url)
    }

    if(cookies.accessToken){
      await users.checkApi()
      .then(res => {
        if(res.data.data) {
          // 로그인 작업을 실시
          localStorage.setItem('userData', JSON.stringify({ ...res.data.data }))
          dispatch(signinAction(JSON.parse(localStorage.getItem('userData'))));
        }
        else {
          // 원래 쓰던거 사용
          dispatch(signinAction(JSON.parse(localStorage.getItem('userData'))))
        }
      })
      .catch(err => {
        // 서버가 터졌을 때,
        localStorage.clear();
        removeCookie('accessToken')
        removeCookie('refreshToken')
        // 서버가 응답을 제대로 줬지만 400일 때,
        window.location.assign('http://localhost:3000')
      })
    }
  }, [])

  useEffect(() => {
    let timer;
    window.addEventListener("resize", (event) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setCurrentHeight(event.target.innerHeight);
      }, 200);
    });
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      window.removeEventListener("resize", (event) => {
        setCurrentHeight(event.target.innerHeight);
      });
    };
  }, []);

  useEffect (() => {
    const vh = currentHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    return () => {
      document.documentElement.style.removeProperty("--vh", `${vh}px`);
    }
  }, [currentHeight]);


  return (
    <Brouter>
        {/* Hello World<br/> */}
        <Nav />
        <Switch>
          <Route path='/' exact component={Landingpage}/>
          <Route path='/mypage' component={Mypage}/>
          <Route path='/mypagechange' component={Mypagechg}/>
          <Route path='/roomlist' component={Roomlist}/>
          <Route path='/room/:room_id' component={Oneroom}/>
          <Route path='/maps' component={Maps}/>
          <Redirect from='*' to='/'/>
        </Switch>
        {isModal && (
          <Modal bgColor={isCreateDetailModal && 'grey'}>
            {isCreateGatherModal && <RoomCreate />}
            {isPasswordChgModal && <PwChange />}
            {isSignupModal && <Signs type={"회원가입"} />}
            {isSigninModal && <Signs type={"로그인"} />}
          </Modal>
        )}
        <Footer/>
    </Brouter>
  );

}

export default App;
