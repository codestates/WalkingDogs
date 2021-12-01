// import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import Nav from './Components/Nav'
import Mypage from './Pages/Mypage'
import Mypagechg from './Pages/Mypagechg'
import Landingpage from './Pages/Landingpage'
import Roomlist from './Pages/Roomlist';
import Footer from './Components/Footer'
import Oneroom from './Pages/Oneroom'
import Community from './Pages/Community'
import {BrowserRouter as Brouter, Route, Switch, Redirect} from 'react-router-dom';


function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [isUser, setIsUser] = useState(false);


  return (
    <Brouter>
      <div className="App">
        {/* Hello World<br/> */}
        <Nav/>
        <Switch>
          <Route exact path='/' render={(props)=><Landingpage/>}/>
          <Route path='/mypage' render={(props)=><Mypage/>}/>
          <Route path='/mypagechange' render={(props)=><Mypagechg/>}/>
          <Route path='/roomlist' render={(props)=><Roomlist/>}/>
          <Route path='/oneroom' render={(props)=><Oneroom/>}/>
          <Route path='/community' render={(props)=><Community/>}/>
        </Switch>
        </div>
        <Footer/>
    </Brouter>
  );

}

export default App;
