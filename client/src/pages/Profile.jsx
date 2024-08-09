import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state)=>(state.user))
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 uppercase text-slate-600'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='self-center rounded-full w-20 h-20 object-cover cursor-pointer my-5' src={currentUser.avatar} alt="pic" />
        <input type="text" placeholder='username'className='border p-3 rounded-lg ' id='username' />
        <input type="text" placeholder='email'className='border p-3 rounded-lg ' id='email' />
        <input type="text" placeholder='password'className='border p-3 rounded-lg ' id='password' />
        <button className='bg-slate-700 rounded-lg text-white p-3 hover:opacity-90 disabled:opacity-80 uppercase' >Update</button>
      </form>
      <div className='flex justify-between my-5'>
        <span className='text-red-600 cursor-pointer'>Delete Acount</span>
        <span className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
    </div>
    
  )
}
