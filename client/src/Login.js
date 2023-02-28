import React, {useState, useContext} from 'react';
import { AuthContext } from './AuthContext';
import './Login.css'

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password: ''
    })
    const {setIsLoggedIn, setUser} = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/auth', 
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          const data = await response.json();
          if(!data.user) return;
          setUser(data.user);
          setIsLoggedIn(true);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          console.log('Authentication failed');
        }
    };
    return (
        <div className='container'>
            <img src='logo.png' className='logo'></img>
            <form onSubmit={handleLogin}>
                <div className='formInput'>
                <label>Email:</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData(prev => {
                    return {...prev, email: e.target.value}
                })} />
                </div>
                <div className='formInput'>
                <label>Password:</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData(prev => {
                    return {...prev, password: e.target.value}
                })} />
                </div>
                <div className='buttonContainer'>
                  <button type="submit" className='submitButton'>LOGIN</button>

                </div>
            </form>
        </div>
    )
}

export default Login;