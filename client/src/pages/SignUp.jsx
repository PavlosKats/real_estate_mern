import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { errorHandler } from '../../../api/utils/error';
import OAuth from '../components/OAuth';


export default function SignUp() {

 //setup state to handle form data submission
 //handle errors and have loading while creating user
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //useNavigate() to create navigation for the site links etc..
  const navigate = useNavigate();

  //setup function to handle the data on change
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  //create proxy at vite.config.js so the '/api' route always points to /localhost:3000//
  const handleSubmit = async (e) =>{
    //e.preventDefault() stops the page from reloading when submit happens
    e.preventDefault();
    try {
        setLoading(true);
        if(!formData.username || !formData.email || !formData.password){
          setError("Please fill all the required fields.")
          setLoading(false);
          return;
        }
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData),  
        });
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(null);
        navigate('/sign-in');
        
    } catch (error) {
        setLoading(false)
        setError(error.message)
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-700'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input  type="text" className='border p-3 rounded-lg' placeholder='Username' id='username' onChange={handleChange} />
        <input type="email" className='border p-3 rounded-lg' placeholder='email' id='email'  onChange={handleChange}/>
        <input type="password" className='border p-3 rounded-lg' placeholder='password' id='password'  onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...': 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-3 mt-5" >
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign In</span> 
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
