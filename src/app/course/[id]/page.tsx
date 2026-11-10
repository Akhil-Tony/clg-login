"use client";

import { useStore } from '@/lib/store';
import { COURSES } from '@/lib/courses';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const currentUser = useStore((state) => state.currentUser);
  const completeLevel = useStore((state) => state.completeLevel);
  const [mounted, setMounted] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  
  const resolvedParams = use(params);
  const courseId = parseInt(resolvedParams.id, 10);
  const course = COURSES.find(c => c.id === courseId);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!currentUser) router.push('/login');
  }, [currentUser, router]);

  if (!mounted || !currentUser) return null;

  if (!course) {
    return <div className="text-center p-10 text-2xl text-red-600">Course not found.</div>;
  }

  const isCompleted = currentUser.completedLevels.includes(courseId);

  const handleComplete = () => {
    completeLevel(courseId);
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/dashboard" className="text-violet-700 font-bold mb-6 inline-block hover:underline text-lg flex items-center gap-2">
        â† Back to Journey
      </Link>
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
          <h1 className="text-3xl font-bold">Level {course.id}: {course.title}</h1>
        </div>
        
        <div className="aspect-video bg-black relative">
          {/* Using HTML5 video for protected streaming behavior. In a real app, use DRM and signed URLs. */}
          <video 
            muted={false}
            controls
            controlsList="nodownload"
            onEnded={() => setIsVideoFinished(true)}
            className="w-full h-full object-cover"
            src={course.videoLink}
            title={course.title}
          />
        </div>

        <div className="p-8 text-center bg-pink-50 border-t border-slate-200 flex flex-col items-center">
            {isCompleted ? (
              <div>
                <p className="text-green-700 font-bold text-xl mb-4">You have already completed this level!</p>
                <button onClick={() => router.push('/dashboard')} className="bg-violet-600 hover:bg-violet-700 text-white text-xl font-medium py-3 px-8 rounded-lg shadow-md transition">
                  Next Steps
                </button>
              </div>
            ) : (
              <div className="w-full max-w-lg">
                <p className="text-lg text-slate-700 mb-6">Watch the main video to unlock the completion button and proceed to the next level.</p>
                <button 
                  onClick={handleComplete} 
                  disabled={!isVideoFinished}
                  className={`w-full text-xl font-medium py-4 px-6 rounded-lg shadow-md transition ${isVideoFinished ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer transform hover:scale-105' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
                >
                  {isVideoFinished ? 'Complete Level & Continue' : 'Please finish video to unlock...'}
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
