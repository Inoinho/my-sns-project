import React from 'react';
import {makeRandomUser} from '../data/data';
import {UserProfile} from '../types/user';

export function Layout({
  onAdd,
  onSearch,
  onInit,
  toggleDark,
  isDark,
  children,
  ...rest
}: LayoutProps) {
  return (
    <div {...rest} className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 text-white shadow-lg junp-4 bg-slate-800">
        <h1 className="text-xl font-bold">My SNS Feed</h1>
        <div>
          <input
            type="text"
            placeholder="Search name..."
            className="px-3 py-1 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(event) => {
              onSearch(event.target.value);
            }}
          />
          <button
            className="px-4 py-2 ml-2 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
            onClick={(event) => {
              event.preventDefault();
              onAdd(makeRandomUser());
            }}
          >
            Add feed
          </button>
          <button
            onClick={toggleDark}
            className="p-2 ml-3 transition-all rounded-full bg-slate-700 dark:bg-slate-600 hover:ring-2 ring-indigo-400"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button
            className="ml-3 text-xs text-gray-400 underline hover:text-red-500"
            onClick={(event) => {
              event.preventDefault();
              if (window.confirm('모든 데이터를 초기화할까요?')) {
                onInit();
              }
            }}
          >
            초기화
          </button>
        </div>
      </header>
      <main className="flex-1 p-6 transition-colors duration-300 bg-gray-50 dark:bg-slate-900">
        {children}
      </main>

      <footer className="p-4 text-center text-gray-500 bg-white border-t dark:bg-slate-800 dark:border-slate-700">
        <p>© 2026 SNS Project</p>
      </footer>
    </div>
  );
}

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onAdd: (newUser: UserProfile) => void;
  onSearch: (search: string) => void;
  onInit: () => void;
  toggleDark: () => void;
  isDark: boolean;
}
