import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/');
    }
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold tracking-wide">Inventory Manager</h1>
      <button
        onClick={handleLogout}
        className="text-sm text-slate-300 hover:text-white transition"
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar
    