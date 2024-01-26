import React from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import './Login.css';

function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setUsername] = useState('');
    const [lastName, setLastname] = useState('');
    const navigate = useNavigate();

    const onSignUp = async (e) => {
        e.preventDefault();
        fetch('http://localhost:8081/users/signup', {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                firstName,
                lastName,
                password
            })
        }).then(response => {
            if (!response.ok) {
                return alert('signup failed. Please try again.');
            }

            response.json()
                .then(data => {
                    console.log(data);
                    props.setToken(data.token)
                    localStorage.setItem('token', data.token);
                    localStorage.setItem(
                        "userData",
                        JSON.stringify(data.user)
                    );
                    props.login();
                    console.log("props ", props);
                    navigate('/places');
            })

        }).catch(error => {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        })
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form className="login-form" onSubmit={(e) => onSignUp(e)}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="lastname">Lastname</label>
                <input type="text" id="lastname" name="lastname" onChange={(e) => setLastname(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Sign Up</button>
            </form>
            <p style={{marginTop: 120}}>Have an account?</p>
            <button className="signUp" style={{marginTop: 0}} onClick={()=>navigate('/login')}>Login</button>
        </div>
    );
}

export default Signup;