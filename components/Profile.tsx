'use client';

import Link from 'next/link'
import { Button } from './ui/button'
import { useUser } from '@/app/hooks/useUser'
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/utils/supabase/client';

export const Profile = ()=>{
  const {isFetching, data} = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async()=>{
    const supabase = supabaseBrowser();
    queryClient.clear(); // Clear all cache
    await supabase.auth.signOut();
    router.refresh();
  }

  if(isFetching){
    return <></>
  }

  return (
    <div>
      {!data?.id ? 
        (
          <Link href={'/auth'} className='animate-fade' >
            <Button variant={'outline'}>
              SignIn
            </Button>
          </Link>
        ) : (
          <>
            {
              data?.image_url ? 
              (
                <Image 
                  src={data.image_url || ""} 
                  alt={data.display_name || ""} 
                  width={50}
                  height={50}
                  className='rounded-full animate-fade cursor-pointer'
                  onClick={handleLogout}
                />
              ) : (
                <div 
                  className='h-[50px] w-[50px] flex items-center justify-center ring-2 rounded-full text-2xl font-semibold cursor-pointer' 
                  onClick={handleLogout}
                >
                  <h1>{data.email[0]}</h1>
                </div>
              )
            }
          </>
        )}
    </div>
  )
}