'use client';

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { Provider } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/utils/supabase/client';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';


//useSearchParams() hook should be wrapped in a Suspense boundary
export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}

function AuthContent() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  const handleLoginWithOAuth = async(provider: Provider) => {
    const supabase = supabaseBrowser();
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
        },
      });
    } catch (error) {
      console.error('OAuth login failed', error);
    }
  }

  return (
    <section className="h-[calc(100vh-57px)] flex flex-col justify-start w-full pt-36">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl mx-auto">Login</CardTitle>
          <CardDescription>
            Select a provider below to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className='flex flex-col gap-5'>
            <OAuthButton provider="github" icon={<FaGithub />} label="GitHub" onClick={handleLoginWithOAuth} />
            <OAuthButton provider="google" icon={<FcGoogle />} label="Google" onClick={handleLoginWithOAuth} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

type OAuthButtonProps = {
  provider: Provider;
  icon: React.ReactNode;
  label: string;
  onClick: (provider: Provider) => void;
};

const OAuthButton = ({ provider, icon, label, onClick }: OAuthButtonProps) => {
  return (
    <Button className="w-full flex items-center gap-2" variant="outline" onClick={() => onClick(provider)}>
      {icon} {label}
    </Button>
  )
}