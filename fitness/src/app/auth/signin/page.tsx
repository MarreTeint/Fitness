"use client";
import React, { useState } from "react";
import "@/scss/signin.scss";
import { useRouter } from 'next/navigation'


const Signin: React.FC = () => {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //create arequest to the server at the endpoint http://localhost:3000/api/users/signin
    //send the username, email, password  in the request body
    //if the request is successful, redirect the user to the home page
    //if the request is not successful, display an error message to the user
    console.log("submit");
    try {
      fetch("http://localhost:3000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
        .then(async (response) => {
            //put response in json format
            const statut = response.status;
            const data = await response.json();

            console.log(statut);
            console.log(data);

            //save the token in the local storage
            if (statut === 200) {
                //save username , email and id in the local storage
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", data.email);
                localStorage.setItem("id", data.id);
                router.push("/");
            } else {
                //display an error message to the user
                alert(data.error);
            }


          
        })
        
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-between font-mono text-sm lg:flex">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="username" className="block">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <p>{"Already have an account?"}</p>
          <button
            className="text-blue-500 underline"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </button>
          </div>
        
      </div>
    </main>
  );
};

export default Signin;
