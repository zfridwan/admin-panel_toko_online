import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Categories from './pages/Categories';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const theme = createTheme({
   palette: {
       primary: {
           main: '#3f51b5',
       },
       secondary: {
           main: '#f50057',
       },
   },
});

function App() {
   return (
       <ThemeProvider theme={theme}>
           <Router>
               <Navbar />
               <Routes>
                   <Route path="/categories" element={<Categories />} />
                   <Route path="/products" element={<Products />} />
                   <Route path="/signin" element={<SignIn />} />
                   <Route path="/signup" element={<SignUp />} />
                   <Route path="/" element={<Navigate replace to="/signin" />} />
               </Routes>
           </Router>
       </ThemeProvider>
   );
}

export default App;
