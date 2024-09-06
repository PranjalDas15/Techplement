import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate()
  const [data,setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerUser = async (e) =>{
    e.preventDefault();
    const {name, email, password} = data
    try {
      const {data} = await axios.post('./register', {
        name, email, password
      })
      if(data.error) {
        toast.error(data.error)
      }
      else{
        setData({})
        toast.success('Registration Successfull')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='flex justify-center mt-10'>
      <div className='flex flex-col items-center h-[500px] w-[400px] bg-white backdrop-blur-sm rounded-2xl'>{/*bg-gradient-to-b from-black from-20% via-blue-700 via-100% */}
        <h2 className='mt-10 text-2xl font-bold'>Register</h2>
        <form onSubmit={registerUser} className=' my-5'>
          <div className='flex flex-col'>
            <label className=' pt-5 pb-2 font-semibold'>Name</label>
            <input className='w-64 h-10 rounded-md px-5 focus:outline-none focus:ring-1 focus:ring-sky-500' type="text" placeholder='Enter Name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
          </div>
          <div className='flex flex-col'>
            <label className=' pt-5 pb-2 font-semibold'>Email</label>
            <input className='w-64 h-10 rounded-md px-5 focus:outline-none focus:ring-1 focus:ring-sky-500' type="email" placeholder='Enter Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
          </div>
          <div className='flex flex-col'>
            <label className=' pt-5 pb-2 font-semibold'>Password</label>
            <input className='w-64 h-10 rounded-md px-5 focus:outline-none focus:ring-1 focus:ring-sky-500' type="password" placeholder='Enter Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
          </div>
          <button type='submit' className='text-white w-[100px] flex justify-center items-center my-5 py-2 rounded-3xl bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400'>Register</button>
          <a href="/login" className=' text-sm mb-5 hover:underline hover:underline-offset-2'>Already registered?</a>
        </form>
      </div>
    </div>
  )
}
