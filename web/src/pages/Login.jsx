import React, { useState } from "react";
import Logo from '../assets/images/Logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        // Display success toast notification
        localStorage.setItem("token", result.token);
        window.location.href = '/dash';
        toast.success("Login successful!", { position: "top-center" });
        console.log("Login successful:", result);
      } else {
        // Display error toast notification
        toast.error("Login failed. Please check your credentials.", { position: "top-center" });
      }
    } catch (error) {
      // Handle any other errors and show a toast notification
      toast.error("An error occurred while logging in.", { position: "top-center" });
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="Logo"
            className="w-12"
          />
        </div>
        <h1 className="text-center text-2xl font-bold mb-6">
          Welcome! How do you want to get started?
        </h1>
        {/* Social Login Buttons */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
            <i className="fab fa-apple mr-2"></i> Continue with Apple
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <i className="fab fa-facebook mr-2"></i> Continue with Facebook
          </button>
        </div>

        <div className="flex items-center justify-between my-6">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Email and Password Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
          >
            Continue
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-yellow-500 underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-yellow-500 underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
