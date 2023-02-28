import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem('user');
    Promise.resolve(userDataFromLocalStorage)
      .then(data => {
        if(data) {
          
          setIsLoggedIn(true);
          setUser(JSON.parse(data))
        }
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};