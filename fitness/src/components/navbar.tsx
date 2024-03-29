'use client';
import { userContext, userDispatchContext } from "@/context/userContext";
import { link } from "fs";
import '@/scss/navbar.scss';
import Link from "next/link";
import React, { use, useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const user = useContext(userContext);
    const dispatch = useContext(userDispatchContext);
    

    //try to detect if the user is logged in or not and display the appropriate links
    useEffect(() => {
      console.log("use effect ran!");
      console.log(user);
      if (user.id === undefined || user.id === -1) {
        setLoggedIn(false);
        
      }else  {
        console.log("user is logged in");
        setLoggedIn(true);
       
      }
      
  }, [loggedIn, setLoggedIn, user,dispatch]);

  const links = [
    {
      id: 1,
      link: "/",
      linkLabel: "Home",
    },
    {
      id: 2,
      link: "/dashboard",
      linkLabel: "Dashboard",
    },
    {
      id: 3,
      link: "/training",
      linkLabel: "Training",
    },
    {
      id: 4,
      link: "/exercises",
      linkLabel: "Exercises",

    },
    {
      id: 5,
      link: "/account",
      linkLabel: "Account",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav navbar">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
           {loggedIn ? `Welcome ${user.username}` : "Logo"}
          </a>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link ,linkLabel}) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{linkLabel}</Link>
          </li>
        ))}
        
        {loggedIn ? (
          <li
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
            onClick={() => {
               //set the context to the initial state by using the dispatch function CLEAR_USER
               dispatch({type:'CLEAR_USER', payload:{username:'', id:-1, email:''}})
              setLoggedIn(false);
            }}
          >
            <Link href="/">Logout</Link>
          </li>
        ) : (
          <li
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href="/auth/login">Login</Link>
          </li>
        )}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link,linkLabel }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {linkLabel}
              </Link>
            </li>
          ))}

            {loggedIn ? (
            <li
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
              onClick={() => {
               setNav(!nav);
                dispatch({type:'CLEAR_USER', payload:{username:'', id:-1, email:''}})


                setLoggedIn(false);
              
              }}
            >
              <Link href="/">Logout</Link>
            </li>
            ) : (
            <li
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link  onClick={() => setNav(!nav)} href="/auth/login">Login</Link>
            </li>
            )}
          </ul>
          )}
        </div>
        );
};

export default Navbar;