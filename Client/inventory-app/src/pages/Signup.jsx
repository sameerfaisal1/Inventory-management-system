import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import Swal from 'sweetalert2'; // Imported SweetAlert2 for premium notifications

const Signup = () => {
    const [username,setUsername]=useState('');
    const [email, setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error, setError] = useState('')
    const navigate =useNavigate();

    const handleSignup = async (e) => {
  e.preventDefault()
  try {
    await axios.post('/api/auth/signup', { username, email, password })

    // COMMENT: Added SweetAlert2 success notification where database user insertion succeeds
    await Swal.fire({
      title: 'Account Created!',
      text: 'Your registration was successful. Please log in.',
      icon: 'success',
      confirmButtonColor: '#4f46e5', // indigo-600
      background: '#1e293b',         // slate-800
      color: '#fff',
      iconColor: '#10b981'           // emerald-500
    });

    navigate('/')
  } catch (err) {
    const errMsg = err.response?.data?.message || 'Signup failed. Try again!';
    setError(errMsg)

    // COMMENT: Added SweetAlert2 error notification where registration validation or DB insertion fails
    Swal.fire({
      title: 'Signup Failed',
      text: errMsg,
      icon: 'error',
      confirmButtonColor: '#ef4444', // red-500
      background: '#1e293b',         // slate-800
      color: '#fff',
      iconColor: '#ef4444'
    });
  }
}
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-10">

        <h1 className="text-3xl font-bold text-slate-800 mb-1">Create account</h1>
        <p className="text-slate-400 text-sm mb-8">Start managing your inventory</p>
{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  )
}

export default Signup
