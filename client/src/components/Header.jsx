import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state)=>(state.user))
  return (
    <header className="bg-blue-300 shadow-md ">
        <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
          <Link to='/'>
            <h1 className="font-bold text-lg sm:text-2xl  flex flex-wrap hover:cursor-pointer">
                <span className="text-slate-500">SunnySide</span>
                <span className="text-slate-700">Estates</span>
            </h1>
          </Link>
            <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                <input type="text" placeholder="search..." className="bg-transparent focus:outline-none w-24 sm:w-64" />
                <FaSearch className='text-blue-300'/>
            </form>
            <ul className=' flex gap-3'>
              <Link to='/'>
              <li className='hidden sm:inline hover:underline text-slate-700 text-lg'>Home</li>
              </Link>
              <Link to='/about'>
              <li className='hidden sm:inline hover:underline text-slate-700 text-lg'>About</li>
              </Link>
              <Link to='/profile'>
              {currentUser 
              ? <img className='rounded-full h-7 w-7 object-cover ml-2' src={currentUser.avatar} alt="profile" />
              : <li className='hover:underline text-slate-700 text-lg'>Sign in</li>
              }
              </Link>
            </ul>
        </div>
    </header> 
  )
}
