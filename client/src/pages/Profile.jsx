import { useSelector } from 'react-redux'
import { useRef, useState ,useEffect} from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';


export default function Profile() {
  //useRef to connect image to file input
  const fileRef = useRef(null)

  //import current user from central state
  const {currentUser} = useSelector((state)=>(state.user))
  
  const [file, setFile] = useState(undefined)
  const [filePercent,setFilePercent]= useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  //  console.log(filePercent);
  //  console.log(fileUploadError);
  //  console.log(file);
   
   
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
  
  
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 uppercase text-slate-600'>Profile</h1>
      <form className='flex flex-col gap-4'>
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

 //firebase storage
  //allow read;
  //allow write : if 
  //request.resource.size < 2 * 1024 * 1024 &&
  //request.resource.contentType.matches('image/.*')
