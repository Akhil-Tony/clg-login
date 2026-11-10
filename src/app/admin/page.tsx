"use client";

import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { User } from '@/lib/store';

export default function AdminDashboard() {
  const users = useStore((state) => state.users);
  const [mounted, setMounted] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md">
        <div className="bg-white p-8 mb-6 rounded-xl shadow-md border border-fuchsia-200">
          <h2 className="text-2xl font-bold text-violet-800 mb-6 text-center">Admin Access Required</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === 'admin123') setIsAuthenticated(true);
            else alert('Incorrect Password');
          }} className="flex flex-col gap-4">
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-slate-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50"
            />
            <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded shadow transition">
              View Leads Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard - Registration & Analytics</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow border border-slate-200">
          <h2 className="text-xl font-bold text-slate-700 mb-4">Registered Users ({users.length})</h2>
          {users.length === 0 ? (
            <p className="text-slate-500">No users registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-200">
                    <th className="p-3 font-semibold text-slate-700">Name</th>
                    <th className="p-3 font-semibold text-slate-700">Email</th>
                    <th className="p-3 font-semibold text-slate-700 text-center">Completion</th>
                    <th className="p-3 font-semibold text-slate-700 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-slate-100 hover:bg-pink-50 transition">
                      <td className="p-3 font-medium text-slate-800">{u.name}</td>
                      <td className="p-3 text-slate-600">{u.email}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded text-sm font-bold ${u.progress === 100 ? 'bg-green-100 text-green-800' : u.progress > 0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'}`}>
                          {u.progress}%
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button onClick={() => setSelectedUser(u)} className="text-fuchsia-600 hover:text-violet-800 font-medium underline">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/3">
          {selectedUser ? (
            <div className="bg-white p-6 rounded-xl shadow border border-fuchsia-200 sticky top-24">
              <h2 className="text-xl font-bold text-violet-800 mb-4">User Details</h2>
              <div className="space-y-3 text-lg">
                <p><span className="font-semibold text-slate-600">Name:</span> {selectedUser.name}</p>
                <p><span className="font-semibold text-slate-600">Email:</span> {selectedUser.email}</p>
                <p><span className="font-semibold text-slate-600">Phone:</span> {selectedUser.phone}</p>
                <p><span className="font-semibold text-slate-600">Age:</span> {selectedUser.age}</p>
                <p><span className="font-semibold text-slate-600">Gender:</span> {selectedUser.gender}</p>
                
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <p className="font-bold text-slate-700 mb-2">Course Progress</p>
                  <div className="w-full bg-slate-200 rounded-full h-6 mb-2 overflow-hidden">
                    <div className="bg-fuchsia-500 h-6 flex items-center justify-center text-white text-xs font-bold" style={{ width: `${selectedUser.progress}%` }}>
                       {selectedUser.progress}%
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">Completed {selectedUser.completedLevels.length} of 5 levels.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 text-center text-slate-500 italic">
              Select a user to view their detailed analytics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
