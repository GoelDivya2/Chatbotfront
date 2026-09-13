import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");

  const { loginUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-4">
      <form
        className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full md:w-[500px] border border-gray-100"
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          Welcome Back
        </h2>

        <p className="text-gray-500 mb-8 text-sm">
          Login to continue to your account
        </p>

        <div className="mb-6">
          <label
            className="block text-gray-700 mb-2 font-medium"
            htmlFor="email"
          >
            Email:
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 bg-gray-50 p-3.5 w-full rounded-xl outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300"
            required
          />
        </div>

        <button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-blue-500/30 w-full disabled:opacity-70"
          disabled={btnLoading}
        >
          {btnLoading ? <LoadingSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;