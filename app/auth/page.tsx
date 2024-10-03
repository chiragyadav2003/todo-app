'use client';
import { KeyRound } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { Provider } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/utils/supabase/client';

export default function AuthPage(){

  const handleLoginWithOAuth = async(provider:Provider)=>{
    console.log('provider', provider)
    const supabase =  supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options:{
        redirectTo:location.origin+"/auth/callback"
      }
    })
  } 

  return (
    <div className='flex items-center justify-center w-full h-screen'
    >
      <div className="w-96  rounded-md border p-5 space-y-5 relative bg-slate-900">

        <div className="flex items-center gap-2">
          <KeyRound />
          <h1 className='text-2xl font-bold'>Next.js + Supabase </h1>
        </div>

        <p className='text-sm text-gray-300'>Register/SignIn Today 👇</p>

        <div className='flex flex-col gap-5'>
          <Button 
            className='w-full flex items-center gap-2' 
            variant={'outline'}
            onClick={()=>handleLoginWithOAuth('github')}
          >
            <FaGithub/>  GitHub
          </Button>
          <Button 
            className='w-full flex items-center gap-2' 
            variant={'outline'}
            onClick={()=>handleLoginWithOAuth('google')}
          >
            <FcGoogle /> Google
          </Button>
        </div>

        <div className='glowbox -z-10'></div>
      </div>
    </div>
  )
}