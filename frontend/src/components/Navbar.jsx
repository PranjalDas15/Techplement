"use client";
import { useState, useContext } from 'react';
import { Drawer } from "flowbite-react";
import { UserContext } from '../../context/userContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import close from '../components/Assets/close.svg';
import menu from '../components/Assets/menu.svg';
import star from '../components/Assets/star.svg';
import login from '../components/Assets/login.svg';
import logout from '../components/Assets/logout.svg';
import register from '../components/Assets/register.svg';
import user_w from '../components/Assets/user_white.svg';
import user_b from '../components/Assets/user_black.svg';
import search from '../components/Assets/search.svg';

export default function Navbar({ searchAuthor, setSearchAuthor, handleSearch }) {

  // calling the current user in session
  const { user, setUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false)
  const navigate = useNavigate();

  const handleClose = () => setIsOpen(false);
  const handleCloseProfile = () => setIsOpenProfile(false)

  const handleLogout = async () => {
    try {
        await fetch('http://localhost:8000/logout', {
            method: 'POST',
            credentials: 'include', 
        });

        // Clear local storage and update user state
        localStorage.removeItem('authToken');
        setUser(null);
        navigate('/login');
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
  

  return (
    <div className='z-20'>
      <nav className='flex bg-gray-500 bg-opacity-5 shadow-md'>
        <h1 className='text-3xl font-bold sm:text-4xl md:text-5xl my-5 mx-5 pb-5 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-violet-400'>
          <a href="/">Quote Generator</a>
        </h1>
        
        {/* Menu */}
        <ul className='hidden lg:flex flex-1 justify-end items-center my-5'>
          {user && (
          <>
            <li className='mx-5'>
            <form onSubmit={handleSearch} className='my-5 hidden sm:flex'>
              <input type='text' value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)} placeholder='Enter author name' className='px-3 py-2 rounded-l-3xl border-none outline-none'/>
              <button type='submit' className='px-4 py-2 rounded-r-3xl bg-black text-white border-white border-2 hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:left-3 hover:border-transparent'>
                <img src={search} width={25} alt="" />
              </button>
            </form>
            </li>
            <li onClick={() => setIsOpenProfile(true)} className='mx-5 text-white max-w-[300px] overflow-x-hidden flex justify-center items-center px-2 py-2 rounded-3xl border-white border-2 bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:left-3 hover:border-transparent cursor-pointer'> 
              <img src={user_w} width={25} alt="" />
              <p className='mx-2'>{user.name}</p>
            </li>
          </>
          )}

          {/* Login and Register links */}
          {!user && (
            <>
              <li className='mx-5'>
                <a href="/login" className='text-white w-[100px] flex justify-center items-center py-2 rounded-3xl border-white border-2 bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:left-3 hover:border-transparent'>
                  <img src={login} width={25} alt="" />
                  <p className='mx-2'>Login</p>
                </a>
              </li>
              <li className='mx-5'>
                <a href="/register" className='text-white w-[100px] flex justify-center items-center py-2 rounded-3xl border-white border-2 bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:left-3 hover:border-transparent'>
                  <img src={register} width={25} alt="" />
                  <p className='mx-2'>Register</p>
                </a>
              </li>
            </>
          )}
          
        </ul>

        {/* Drawer for Profile */}

        <Drawer open={isOpenProfile} onClose={handleCloseProfile} position="right">
          <div className='bg-white absolute top-0 left-0 h-full px-3 py-3 w-full'>
            <Drawer.Items>
              <div className='flex'>
                {user && (
                <div className=' my-5 ml-[40%] font-semibold text-2xl'>
                  {user.name}
                </div>
                )}
                <div className='flex flex-1 justify-end'>
                  <button onClick={handleCloseProfile}>
                    <img src={close} alt="Close" />
                  </button>
                </div>  
              </div>
              
              <ul className='flex flex-col justify-center items-center my-20'>
                <li className='w-full'>
                  <a href="/favourites" className='text-white w-full flex justify-center items-center py-5 rounded-3xl mb-2 font-semibold text-xl border-white border-2 bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:border-transparent'>
                    <img src={star} width={25} alt="" />
                    <p className='mx-2'>Favourites</p>
                  </a>
                </li>
                <li className='w-full'>
                  <button onClick={handleLogout} className='text-white w-full flex justify-center items-center py-5 rounded-3xl mb-2 font-semibold text-xl border-white bg-black border-2 hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:border-transparent'>
                    <img src={logout} width={25} alt="" />
                    <p className='mx-2'>Logout</p>
                  </button>
                </li>
              </ul>
            </Drawer.Items>
          </div>
        </Drawer>
        
        {/* Menu Button */}
        
        <div className='flex flex-1 justify-end lg:hidden relative right-5'>
          <button onClick={() => setIsOpen(true)} className="right-5 w-[60px] text-white items-center">
            <img src={menu} alt="Menu" />
          </button>
        </div>

        {/* Menu Items */}
        <Drawer open={isOpen} onClose={handleClose} position="right">
          <div className='bg-white absolute top-0 left-0 h-full px-3 py-3 w-full'>
            <Drawer.Items>
              <div className='flex items-center'>
                {user && (
                  <div className='flex items-center font-semibold text-2xl'>
                    <img src={user_b} width={35} alt="User" className='mr-2' />
                    <p>{user.name}</p>
                  </div>
                )}
                <div className='ml-auto flex items-center'>
                  <button onClick={handleClose}>
                    <img src={close} alt="Close" />
                  </button>
                </div>  
              </div>
              <ul  className='flex flex-col justify-center items-center'>
                {/* Displays when user in session */}
                {user && (
                  <>
                  <li className='w-full'>
                    <form onSubmit={handleSearch} className='my-2 flex lg:hidden justify-center items-center py-5 rounded-3xl mb-2'>
                      <input type='text' value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)} placeholder='Search author name' className='px-3 py-5 rounded-l-3xl'/>
                      <button type='submit' className='px-4 py-5 rounded-r-3xl bg-black text-white hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:left-3 hover:border-transparent'>
                        <img src={search} width={25} alt="" />
                      </button>
                    </form>
                  </li>
                  <li className='w-full'>
                      <a href="/favourites" className='text-white w-full flex justify-center items-center py-5 rounded-3xl mb-2 font-semibold text-xl border-white border-2 bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:border-transparent'>
                        <img src={star} width={25} alt="" />
                        <p className='mx-2'>Favourites</p>
                      </a>
                  </li>
                  <li className='w-full'>
                    <button onClick={handleLogout} className='text-white w-full flex justify-center items-center py-5 rounded-3xl mb-2 font-semibold text-xl border-white border-2 bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:border-transparent'>
                      <img src={logout} width={25} alt="" />
                      <p className='mx-2'>Logout</p>
                    </button>
                  </li>
                </>
                )}
                {/* Displays when user not in session */}
                {!user && (
                <>
                  <li className='w-full pt-10'>
                    <a href="/login" className='text-white w-full flex justify-center items-center py-5 rounded-3xl mb-2 font-semibold text-xl  border-white border-2 bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:border-transparent'>
                      <img src={login} width={25} alt="" />
                      <p className='mx-2'>Login</p>
                    </a>
                  </li>
                  <li className='w-full'>
                    <a href="/register" className='text-white w-full flex justify-center items-center py-5 rounded-3xl mb-2 font-semibold text-xl  border-white border-2 bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 hover:border-transparent'>
                      <img src={register} width={25} alt="" />
                      <p className='mx-2'>Register</p>
                    </a>
                  </li>
                </>
                )}
              </ul>
            </Drawer.Items>
        </div>
      </Drawer>
    </nav>
  </div>
);
}
