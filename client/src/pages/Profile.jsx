import { useSelector } from 'react-redux'
import { useRef, useState ,useEffect} from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getAuth , signOut } from 'firebase/auth'
import { app } from '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess, signOutUser} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
  //useRef to connect image to file input
  const fileRef = useRef(null)
  
  
  //import current user from central state
  const {currentUser} = useSelector((state)=>(state.user))
  
  const [file, setFile] = useState(undefined)
  const [filePercent,setFilePercent]= useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  
  const dispatch = useDispatch();
  
  // useNavigate for navigate to login page after sign out
  const navigate = useNavigate();


  //  console.log(filePercent);
  //  console.log(fileUploadError);
  //  console.log(file);
  // console.log(formData);
  
   
   
  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  },[file])


  //logic that handles the file upload.
  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> setFormData({...formData, avatar: downloadURL}))
        
      }
    )
  }

  ///
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value})
  };


  ///
  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(currentUser);
    
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        console.log(data);
        
        if(data.success === false){
          dispatch(updateUserFailure(data.message))
          return;
        }
        dispatch(updateUserSuccess(data))

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  
  //Signout function 
  const handleSignout = () => {
    const auth = getAuth();

    signOut(auth)
    .then(() => {
      //signout user
      dispatch(signOutUser())
      //check if this work later
      navigate('/sign-in');
    });
  };
  
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 uppercase text-slate-600'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* connect file input with image  */}
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} className='self-center rounded-full w-20 h-20 object-cover cursor-pointer my-5' src={formData.avatar || currentUser.avatar} alt="pic" />
        {/* --------------------- */}
        <p className='text-sm self-center'>
          {fileUploadError ? <span className='text-red-700'>Error uploading image</span> : filePercent > 0 && filePercent < 100 ? (
            <span className='text-slate-500'>{`uploading ${filePercent}`}</span>
          )  : filePercent === 100 ? (<span className='text-green-600'>File uploaded</span>) : ("")
           }
        </p>
        <input onChange={handleChange} type="text" defaultValue={currentUser.username} placeholder='username'className='border p-3 rounded-lg ' id='username' />
        <input onChange={handleChange} type="text" defaultValue={currentUser.email} placeholder='email'className='border p-3 rounded-lg ' id='email' />
        <input onChange={handleChange} type="text" placeholder='password'className='border p-3 rounded-lg ' id='password' />
        <button className='bg-slate-700 rounded-lg text-white p-3 hover:opacity-90 disabled:opacity-80 uppercase' >Update</button>
      </form>
      <div className='flex justify-between my-5'>
        <span className='text-red-600 cursor-pointer'>Delete Acount</span>
        <span onClick={handleSignout} className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
    </div>
    
  )
}

 //firebase storage
  //allow read;
  //allow write : if 
  //request.resource.size < 2 * 1024 * 1024 &&
  //request.resource.contentType.matches('image/.*')
