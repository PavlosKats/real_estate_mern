import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-700'>Sign Up</h1>
      <form className='flex flex-col gap-5'>
        <input type="text" className='border p-3 rounded-lg' placeholder='Username' id='username' />
        <input type="email" className='border p-3 rounded-lg' placeholder='email' id='email' />
        <input type="password" className='border p-3 rounded-lg' placeholder='password' id='password' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign In</span> 
        </Link>
      </div>
    </div>
  )
}
