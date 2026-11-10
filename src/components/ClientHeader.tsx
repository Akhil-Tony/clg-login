"use client";

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function ClientHeader() {
  const currentUser = useStore((state) => state.currentUser);
  const logoutUser = useStore((state) => state.logoutUser);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push('/');
  };

  return (
    <header className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
           <img src="/Assets/cl logo.png" alt="Cannalogic Logo" className="h-8 w-auto object-contain bg-white rounded-sm p-0.5" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span className="font-bold text-xl tracking-wide">Cannalogic</span>
        </Link>
        <div className="flex gap-4 items-center sm:text-base text-sm">
          {currentUser ? (
             <>
               <span className="hidden sm:inline font-medium">Hi, {currentUser.name}</span>
               <Link href="/dashboard" className="hover:text-fuchsia-100 focus:ring-2 focus:ring-violet-200 px-2 py-1 rounded">Dashboard</Link>
               <button onClick={handleLogout} className="bg-rose-700 hover:bg-rose-600 px-3 py-1.5 rounded text-white transition focus:ring-2 focus:ring-rose-300">Logout</button>
             </>
          ) : (
             <>
               <Link href="/login" className="hover:text-fuchsia-100 focus:ring-2 focus:ring-violet-200 px-2 py-1 rounded">Login</Link>
               <Link href="/register" className="bg-violet-600 hover:bg-fuchsia-500 px-3 py-1.5 rounded text-white transition focus:ring-2 focus:ring-violet-300">Register</Link>
             </>
          )}
        </div>
      </div>
    </header>
  );
}
