"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import "@/scss/login.scss";
import { userContext } from "@/context/userContext";
import { userDispatchContext } from "@/context/userContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(userContext);
  const dispatch = useContext(userDispatchContext);

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    // console.log('Email:', email);
    // console.log('Password:', password);

    //submit the form to the endpoint  http://localhost:3000/api/users/login
    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(async (res) => {
      const statut = res.status;
      const data = await res.json();
      console.log("statut", statut);
      // console.log("data", data);
      if (statut === 200) {
        //console.log("login successful");

        console.log("user before", user);
        console.log("data", data);
        console.log("data id", data.id);

        // Update the user context
        console.log("login successful");
        //store the user data in local storage
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            id: data.id,
            email: data.email,
          })
        );
        // Update the user context
        console.log("Dispatching SET_USER action"); // Add console log before dispatch
        dispatch({
          type: "SET_USER",
          payload: { username: data.username, id: data.id, email: data.email },
        });
        console.log("user after", user);
        router.push("/");
      } else {
        // console.log("login failed");
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-between font-mono text-sm lg:flex">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p>{"Don't have an account?"}</p>
          <button
            className="text-blue-500 underline"
            onClick={() => router.push("/auth/signin")}
          >
            Sign up
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
