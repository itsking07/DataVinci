import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';
import { HiHome, HiUserCircle } from 'react-icons/hi';
import { SiAboutdotme } from 'react-icons/si';
import { BsMastodon } from 'react-icons/bs';
import { MdEmojiEvents } from 'react-icons/md';

import { BsFillCartFill } from 'react-icons/bs';

import { FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

import { MdLogin } from 'react-icons/md';
import { useAuth } from '../../../contextApi/auth';
import { useCart } from '../../../contextApi/cart';


const Header = () => {
  const [auth] = useAuth();
  const [Cart]=useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };




  return (
    <header className="bg-gray-200 text-gray-900">
      <nav className="container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between">

          <NavLink to='/' className="flex items-center" >
           
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900">
            DataVinci Private Limited
            </span>
          </NavLink>
          <div className="md:hidden ml-24">
            <button
              className="text-gray-900 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </button>
          </div>
        </div>




        <ul className="hidden md:flex space-x-4 mt-4 md:mt-0 mx-auto text-lg border-gray-100 rounded-lg">
          <li>
            <Link
              to="/"
              className={`py-2 pl-3 pr-4 flex items-center text-gray-900 rounded cursor-pointer ${location.pathname === '/' ? 'bg-blue-200' : ''
                }`}
            >
              <HiHome className="mr-2" />
              Home
            </Link>
          </li>


          {auth?.user ? (
            <>

              <li>
                <Link
                  to="/user"
                  className={`py-2 pl-3 pr-4 flex items-center text-gray-900 rounded cursor-pointer ${location.pathname === '/user' ? 'bg-blue-200' : ''
                    }`}
                >
                  <FaUser className="mr-2" />
                  User
                </Link>
              </li>
              <li>
                <Link
                  to="/user/mycourses"
                  className={`py-2 pl-3 pr-4 flex items-center text-gray-900 rounded cursor-pointer ${location.pathname === '/user/mytasks' ? 'bg-blue-200' : ''
                    }`}
                >
                  <BsMastodon className="mr-2" />
                  My Course
                </Link>
              </li>

            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`py-2 pl-3 pr-4 flex items-center text-gray-900 rounded cursor-pointer ${location.pathname === '/login' ? 'bg-blue-200' : ''
                    }`}
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`py-2 pl-3 pr-4 flex items-center text-gray-900 rounded cursor-pointer ${location.pathname === '/register' ? 'bg-blue-200' : ''
                    }`}
                >
                  <FaUserPlus className="mr-2" />
                  Sign Up
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              to="/cart"
              className={`py-2 pl-3 pr-4 flex items-center text-gray-900 rounded cursor-pointer ${location.pathname === '/cart' ? 'bg-blue-200' : ''
                }`}
            >
              <BsFillCartFill className="mr-2" />
              Cart({Cart?.length})
            </Link>
          </li>

        </ul>




        {/* mobileMenu code off canvas */}

        {isMobileMenuOpen && (
          <div className={`fixed top-0 left-0 w-full h-full bg-black z-40 backdrop-filter backdrop-blur-lg bg-opacity-70`} />

        )}

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-200 transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } z-50`}
        >
          <button
            className="text-gray-900 absolute top-4 right-4 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <FiX size={35} />
          </button>
          {/* off canvas */}
          <ul className="flex flex-col items-start space-y-4  p-4 mt-14">
            
            <li className="flex items-center">
              <HiHome size={18} className="mr-5" />
              <Link to="/" onClick={closeMobileMenu}>Home</Link>
            </li>

            <li className="flex items-center">
              <MdEmojiEvents size={18} className="mr-5" />
              <Link to="/allcourses" onClick={closeMobileMenu}>All Course</Link>
            </li>
            {auth?.user ? (
              <>
                <li className="flex items-center">
                  <HiUserCircle size={25} className="mr-2" />

                  <Link
                    to="/user"
                    className="pl-3 pr-4 text-gray-900 rounded cursor-pointer " onClick={closeMobileMenu}
                  >
                    {auth?.user.name && (
                      <p> Hello, {" "}
                        {auth.user.name.length > 10
                          ? `${auth.user.name.slice(0, 15)}...`
                          : auth.user.name}
                      </p>
                    )}
                  </Link>
                </li>
                <li className="flex items-center">
                  <BsMastodon size={18} className="mr-5" />
                  <Link to="/user/mycourses" onClick={closeMobileMenu}>My Courses </Link>
                </li>
                
              </>
            ) : (
              <>
                <li className="flex items-center">
                  <MdLogin size={18} className="mr-2" />

                  <Link
                    to="/login"
                    className=" pl-3 pr-4 text-gray-900 rounded cursor-pointer " onClick={closeMobileMenu}

                  >
                    Login
                  </Link>
                </li>
                <li className="flex items-center">
                  <MdLogin size={18} className="mr-2" />

                  <Link
                    to="/register"
                    className=" pl-3 pr-4 text-gray-900 rounded cursor-pointer " onClick={closeMobileMenu}

                  >
                    Sign Up
                  </Link>
                </li></>
            )}
            <li className="flex items-center">
              <SiAboutdotme size={18} className="mr-5" />
              <Link to="/cart" onClick={closeMobileMenu}>Cart</Link>
            </li>

          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;