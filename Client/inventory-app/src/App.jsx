import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
