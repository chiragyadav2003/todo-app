import { KeyRound } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from '@/components/ui/button';

export default function AuthPage(){
  return (
    <div className='flex items-center justify-center w-full h-screen'
    >
      <div className="w-96  rounded-md border p-5 space-y-5 relative bg-slate-900">

        <div className="flex items-center gap-2">
          <KeyRound />
          <h1 className='text-2xl font-bold'>Next + Supabase </h1>
        </div>

        <p className='text-sm text-gray-300'>Register/SignIn Today 👇</p>

        <div className='flex flex-col gap-5'>
          <Button className='w-full flex items-center gap-2' variant={'outline'}>
            <FcGoogle /> Google
          </Button>
          <Button className='w-full flex items-center gap-2' variant={'outline'}>
            <FaGithub/>  GitHub
          </Button>
        </div>

        <div className='glowbox -z-10'></div>
      </div>
    </div>
  )
}