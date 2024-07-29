import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';

export default function SignIn() {

 //setup state to handle form data submission
 //handle errors and have loading while creating user
  const [formData, setFormData] = useState({});
  //useSelector to get the loading and error states from the 'user' in store.js
  const {loading, error } = useSelector((state)=>state.user)
  //useNavigate() to create navigation for the site links etc..
  const navigate = useNavigate();
  //useDispatch to initialise react dispatch
  const dispatch = useDispatch();

  //setup function to handle the date on change
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
        dispatch(signInStart())
        //check if password is empty or not
        if (!formData.password || !formData.email) {
          setError("Please enter your credentials.");
          setLoading(false);
          return;
        }
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData),  
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate('/');
        
    } catch (error) {
        dispatch(signInFailure(error.message));
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-700'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input type="email" className='border p-3 rounded-lg' placeholder='email' id='email'  onChange={handleChange}/>
        <input type="password" className='border p-3 rounded-lg' placeholder='password' id='password'  onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...': 'Sign In'}
        </button>
      </form>
      <div className="flex gap-3 mt-5" >
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span> 
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
