import { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('/login', { email, password });
      const { data: userData } = response;

      if (userData.error) {
        toast.error(userData.error);
      } else {
        setUser(userData);
        setData({ email: '', password: '' });
        toast.success(`Welcome ${userData.name}`);
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className='flex justify-center mt-10'>
      <div className='flex flex-col items-center h-[440px] w-[400px] bg-white backdrop-blur-sm rounded-2xl'>
        <h2 className='mt-10  text-2xl font-bold'>Login</h2>
        <form onSubmit={loginUser} className='my-5'>
          <div className='flex flex-col'>
            <label className=' pt-5 pb-2 font-semibold'>Email</label>
            <input
              className='w-64 h-10 rounded-md px-5 focus:outline-none focus:ring-1 focus:ring-sky-500'
              type="email"
              placeholder='Enter Email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className=' pt-5 pb-2 font-semibold'>Password</label>
            <input
              className='w-64 h-10 rounded-md px-5 focus:outline-none focus:ring-1 focus:ring-sky-500'
              type="password"
              placeholder='Enter Password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <button
            type='submit'
            className='text-white w-[100px] flex justify-center items-center my-5 py-2 rounded-3xl bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400'
          >
            Login
          </button>
          <a href="/register" className=' text-sm mb-5 hover:underline hover:underline-offset-2'>
            Not registered yet?
          </a>
        </form>
      </div>
    </div>
  );
}
