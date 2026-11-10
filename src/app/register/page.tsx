"use client";

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const registerUser = useStore((state) => state.registerUser);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(formData);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <h2 className="text-3xl font-bold text-violet-800 mb-6 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-1">Full Name</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full text-lg p-3 border border-slate-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-fuchsia-400 bg-pink-50" />
        </div>
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-1">Email Address</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full text-lg p-3 border border-slate-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-fuchsia-400 bg-pink-50" />
        </div>
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-1">Phone Number</label>
          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full text-lg p-3 border border-slate-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-fuchsia-400 bg-pink-50" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-lg font-medium text-slate-700 mb-1">Age</label>
            <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full text-lg p-3 border border-slate-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-fuchsia-400 bg-pink-50" />
          </div>
          <div className="flex-1">
            <label className="block text-lg font-medium text-slate-700 mb-1">Gender</label>
            <select required name="gender" value={formData.gender} onChange={handleChange} className="w-full text-lg p-3 border border-slate-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-fuchsia-400 bg-pink-50">
              <option value="" disabled>Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white text-xl font-medium py-4 px-6 rounded shadow transition focus:ring-4 focus:ring-violet-300">
          Register & Start
        </button>
      </form>
      <p className="mt-6 text-center text-slate-600">
        Already registered? <Link href="/login" className="text-violet-700 font-bold hover:underline">Log in here</Link>
      </p>
    </div>
  );
}
