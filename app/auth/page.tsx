'use client';
import { KeyRound } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { Provider } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/utils/supabase/client';
import { useSearchParams } from 'next/navigation';

export default function AuthPage(){

  const param = useSearchParams();
  const next = param.get('next') || '/';


  const handleLoginWithOAuth = async(provider:Provider)=>{
    const supabase =  supabaseBrowser();
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/auth/callback?next=${next}`,
        },
      });
    } catch (error) {
      console.error('OAuth login failed', error);
    }
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
          <OAuthButton provider="github" icon={<FaGithub />} label="GitHub" onClick={handleLoginWithOAuth} />
          <OAuthButton provider="google" icon={<FcGoogle />} label="Google" onClick={handleLoginWithOAuth} />
        </div>

        <div className='glowbox -z-10'></div>
      </div>
    </div>
  )
}

type OAuthButtonProps = {
  provider: Provider;
  icon: React.ReactNode;
  label: string;
  onClick: (provider: Provider) => void;
};

const OAuthButton = ({ provider, icon, label, onClick }:OAuthButtonProps) =>{
  return (
  <Button className="w-full flex items-center gap-2" variant="outline" onClick={() => onClick(provider)}>
    {icon} {label}
  </Button>
  )
}