'use client';

import Link from 'next/link'
import { Button } from './ui/button'
import { useUser } from '@/app/hooks/useUser'
import Image from 'next/image';

export const Profile = ()=>{

  const {isFetching, data} = useUser();

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
          <h1>
            <Image 
              src={data.image_url || ""} 
              alt={data.display_name || ""} 
              width={50}
              height={50}
              className='rounded-full animate-fade '
            />
          </h1>
        )}
    </div>
  )
}