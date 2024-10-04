import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-black mx-auto">
      <h1 className="text-5xl font-extrabold text-white mb-8 shadow-md">
        Welcome to Our App!
      </h1>
      
      <div className="space-y-4 w-full mx-auto">
        
        <div className='flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl p-6 max-w-md mx-auto shadow-xl'>
          <Link href={'/dashboard'}>
            <Button className='text-lg font-semibold text-slate-900 bg-slate-200 hover:bg-slate-300 transition-colors duration-300 w-full mb-3'>
              Dashboard
            </Button>
          </Link>
          
          <Link href={'/profile'}>
            <Button className='text-lg font-semibold text-slate-900 bg-slate-200 hover:bg-slate-300 transition-colors duration-300 w-full'>
              Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
