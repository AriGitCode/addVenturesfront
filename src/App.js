
import React , {useState, useEffect} from 'react';
import './App.css'
import {  Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import Home from './pages/homePage/Home';
import Places from  './pages/map/Places';
import Memories from './pages/memories/memories';
import Login from './components/user/Login';
import mapboxgl from 'mapbox-gl';
import Signup from "./components/user/Signup";


const App = () => {

  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [token, setUserToken] = useState(()=>{
    if(localStorage.getItem("token")){
        return localStorage.getItem("token")
    }
    return null
});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const logout = () => {
    localStorage.clear()
    setIsLoggedIn(false);
    setUser (false);
    navigate('/');
  }

    console.log("token: ", token)

  const login = () => {

      const localStorData = JSON.parse(localStorage.getItem('userData',userData));
      console.log("local: ", localStorData)
      if(localStorData){
          console.log(localStorData);
          setUserData(localStorData);
          setUserID(localStorData._id);
          setIsLoggedIn(true);
          setUser(localStorData.firstName);
      }
      console.log("no localStorData ❌");
  }

  useEffect(() => {
    console.log('useEffect');
    login();
    console.log("token after login:", token); 
  }, [isLoggedIn])



   let routes;
   if(isLoggedIn){
    routes = (
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/places" element={<Places userID={userID} token={token}/>} />
        <Route path="/memories" element={<Memories userID={userID} token={token}/>} />
        <Route path="/login" element={<Login login={login}  setToken={setUserToken}/>} />
        <Route path="/signup" element={<Signup login={login}  setToken={setUserToken}/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    )
   }else{
    routes = (
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/places" element={<Places userID={userID} token={token}/>} />
        <Route path="/login" element={<Login login={login}  setToken={setUserToken}/>} />
        <Route path="/signup" element={<Signup login={login}  setToken={setUserToken}/>} />
        <Route path="*" element={<Navigate to="/"  />} />
      </Routes>
    )
   }


  return (
    <>
    {isLoggedIn ? <Navbar logout={logout} userProp={user}/> : <Navbar/>}
        
    {routes}

    </>
  );
};

export default App;
