"use client";

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const loginUser = useStore((state) => state.loginUser);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginUser(email);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Account not found. Please check your email or register.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <h2 className="text-3xl font-bold text-violet-800 mb-6 text-center">Welcome Back</h2>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-2">Email Address</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-lg p-3 border border-slate-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-fuchsia-400 bg-pink-50" placeholder="Enter your email" />
        </div>
        
        <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white text-xl font-medium py-4 px-6 rounded shadow transition focus:ring-4 focus:ring-violet-300">
          Sign In
        </button>
      </form>
      <p className="mt-8 text-center text-slate-600">
        New here? <Link href="/register" className="text-violet-700 font-bold hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
