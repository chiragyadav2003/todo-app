import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-black transition-colors duration-300 relative pt-36">
    <div className="w-full max-w-md mx-auto px-4">
        <div className='bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl dark:shadow-slate-700/30 transition-all duration-300'>
          <Link href={'/dashboard'} className="block mb-4">
            <Button className='text-lg font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-300 w-full h-14 rounded-xl flex items-center justify-center space-x-3'>
              <span>Dashboard</span>
            </Button>
          </Link>
          <Link href={'/profile'} className="block">
            <Button className='text-lg font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-300 w-full h-14 rounded-xl flex items-center justify-center space-x-3'>
              <span>Profile</span>
            </Button>
          </Link>
        </div>
      </div>
  </div>
  );
}
