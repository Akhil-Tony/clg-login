"use client";

import { useStore } from '@/lib/store';
import { COURSES } from '@/lib/courses';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const currentUser = useStore((state) => state.currentUser);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!currentUser) router.push('/login');
  }, [currentUser, router]);

  if (!mounted || !currentUser) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-violet-900 mb-2">My Journey</h1>
      <p className="text-lg text-slate-600 mb-8">Welcome back, {currentUser.name}. Continue your healing progress.</p>
      
      {/* Gamification Progress Bar */}
      <div className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-10 text-center">
        <h2 className="text-2xl font-bold text-violet-800 mb-2">Level {currentUser.completedLevels.length} of {COURSES.length}</h2>
        <div className="w-full bg-slate-200 rounded-full h-8 mb-4 border border-slate-300 overflow-hidden relative">
          <div className="bg-fuchsia-500 h-8 rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-2" style={{ width: `${currentUser.progress}%` }}>
             {currentUser.progress > 10 && <span className="text-white font-bold text-sm">{currentUser.progress}%</span>}
          </div>
        </div>
        <p className="text-slate-600 text-lg">
          {currentUser.progress === 100 ? "Congratulations! You have completed the season." : "Keep it up! Every step matters."}
        </p>
      </div>

      <div className="space-y-4">
        {COURSES.map((course, index) => {
          const isCompleted = currentUser.completedLevels.includes(course.id);
          const isLocked = index > 0 && !currentUser.completedLevels.includes(COURSES[index - 1].id);

          return (
            <div key={course.id} className={`p-4 rounded-xl border-2 flex items-center justify-between transition ${isCompleted ? 'bg-green-50 border-green-300' : isLocked ? 'bg-slate-100 border-slate-200 opacity-60' : 'bg-white border-fuchsia-400 shadow-md'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${isCompleted ? 'bg-green-600 text-white' : isLocked ? 'bg-slate-300 text-slate-500' : 'bg-fuchsia-500 text-white'}`}>
                  {course.id}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{course.title}</h3>
                  <span className={`text-sm font-medium ${isCompleted ? 'text-green-600' : isLocked ? 'text-slate-500' : 'text-fuchsia-600'}`}>
                    {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Ready to start'}
                  </span>
                </div>
              </div>
              <Link href={isLocked ? '#' : `/course/${course.id}`} className={`px-6 py-3 rounded-lg font-bold text-lg transition ${isLocked ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700 text-white shadow'}`}>
                {isCompleted ? 'Watch Again' : isLocked ? 'Locked' : 'Start'}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
