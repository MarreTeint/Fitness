'use client';
import React, { createContext, useReducer } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/scss/custom.scss";
import { userContext
 } from '@/context/userContext';
 import { userDispatchContext } from '@/context/userContext';
 import { userReducer } from '@/context/userReducer';
import Navbar from "@/components/navbar";
import User from './class/user';


const inter = Inter({ subsets: ["latin"] });





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, dispatch] = useReducer(userReducer, new User(-1, '', ''));
  return (
    <html lang="en">
      <body className={inter.className}>
        <userContext.Provider value={user}>
          <userDispatchContext.Provider value={dispatch}>

          <Navbar />
          {children}
          </userDispatchContext.Provider>
        </userContext.Provider>
   
      </body>
    </html>
  );
}

