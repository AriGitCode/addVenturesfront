import React, { useState }  from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ login, setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    console.log("login js")

    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:8081/users/login", { email, password });
  
        if (response.status !== 200) {
          console.log("res: ", response);
          return alert('Login failed!. Please try again.');
        }
  
        const data = response.data;
  
        console.log("login data: ", data);
  
        localStorage.setItem("userData", JSON.stringify(data.user));
        login();
        setToken(data.token);
        localStorage.setItem('token', data.token);
        navigate('/places');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    };
  
    return (
      <div>
        <h1>Sign In</h1>
        <form className="login-form" onSubmit={(e) => handleLogin(e)}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign In</button>
        </form>
        <p>Don't have an account yet?</p>
        <button className="signUp" onClick={() => navigate('/signup')}>Register</button>
      </div>
    );
  };
  
  export default Login;

// const Login = (props) => {
//     console.log("props ⭐⭐⭐⭐", props);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const onLogin = async (e) => {
//         e.preventDefault();
//         axios.post("http://localhost:8081/users/login", {email, password})
//             .then(response => {

//                 if (response.status !== 200) {
//                     console.log("res: ", response)
//                     return alert('Login failed!. Please try again.',);
//                 }
//                 return response.data
//         }).then(data => {
//             console.log("login data: ", data);
//             localStorage.setItem(
//                 "userData",
//                 JSON.stringify(data.user)
//             );
//             props.login();
//             props.setToken(data.token)
//             localStorage.setItem('token', data.token);
//             navigate('/places');
//         }).catch(error => {
//             console.error('Login failed:', error);
//             alert('Login failed. Please try again.');
//         })
//     };

//     return (
//         <div>
//             <h1>Sign In</h1>
//             <form className="login-form" onSubmit={(e) => onLogin(e)}>
//                 <label htmlFor="email">Email</label>
//                 <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
//                 <label htmlFor="password">Password</label>
//                 <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
//                 <button type="submit">Sign In</button>
//             </form>
//             <p>Don't have an account yet?</p>
//             <button className="signUp" onClick={()=>navigate('/signup')}>Register</button>
//         </div>
//     );
// }

// export default Login;