"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ContactFormData = {
  username: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({    
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setError("");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username !== "" && formData.password !== "") {
      router.push('/member-page');
    } else {
      setError("Please enter both username and password");
    }
  }
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white via-slate-800 to-slate-900">
      <div className="max-w-md w-full space-y-8 p-8  rounded-lg bg-gray-100 ">
        <h2 className="text-center text-3xl font-bold text-black">Sign In</h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-600 rounded-md text-black placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-600 rounded-md text-black placeholder:text-slate-400"
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            Sign In
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

