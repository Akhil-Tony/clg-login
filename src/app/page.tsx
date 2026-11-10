import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-violet-800 mb-6 leading-tight">Welcome to <br/>Cannalogic Course</h1>
      <p className="text-xl text-slate-600 mb-10 max-w-2xl">Start your healing journey today. A simple, step-by-step video guide designed for your well-being.</p>
      
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <Link href="/register" className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-xl font-medium py-4 px-6 rounded-xl shadow-lg transition transform hover:scale-105 focus:ring-4 focus:ring-violet-300">
          Get Started Focus
        </Link>
        <Link href="/login" className="flex-1 bg-white hover:bg-pink-50 text-violet-800 border-2 border-violet-600 text-xl font-medium py-4 px-6 rounded-xl shadow transition transform hover:scale-105 focus:ring-4 focus:ring-violet-300">
          Login
        </Link>
      </div>
    </div>
  );
}
