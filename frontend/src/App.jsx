import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import DashboardPage from './pages/dashboardPage/DashboardPage'
import LoginPage from './pages/loginPage/LoginPage'
import SignuPage from './pages/signupPage/SignupPage'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="/" element={<DashboardPage/>}></Route>
    <Route path="/login" element={<LoginPage/>}></Route>
    <Route path="/signup" element={<SignuPage/>}></Route>

    </Routes>
    <Toaster />
    </BrowserRouter>
    </>
  )
}

export default App
