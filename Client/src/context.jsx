import { createContext, useContext, useState, useEffect } from "react"; 

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme-tube") === "dark"
  );

  const [openUpload, setOpenUpload] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false); 
  const URL = "http://localhost:8080/api/"; 

  
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("token-tube");
      return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
  }
});

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme-tube", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme-tube", "light");
    }
  }, [darkMode]);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem("token-tube", JSON.stringify(user));
    } else {
      localStorage.removeItem("token-tube");
    }
  }, [user]);


  const logout = () => {
    setUser(null); 
    localStorage.removeItem("token-tube");  
    // window.location.reload();  
  };

  return (
    <ThemeContext.Provider value={{ 
      URL,
     darkMode,
     setDarkMode, 
     user, 
     setUser, 
     logout, 
     openUpload, 
     setOpenUpload,
     showSignIn,
     setShowSignIn,
     
     }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useIt = () => useContext(ThemeContext);
