'use client'
import Link from 'next/link';
import { Button } from './ui/button';
import { logout } from '@/app/actions/logout';
import { useUser } from '@/app/hooks/useUser';

export const Header = () =>{
  
  const { data } = useUser();

  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">SupaTodo</span>
          </a>
          <Link href="/todos">Todos</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {
            data?.email ? (<form action={logout}  className="flex items-center gap-2">
              <p>email {data?.email}</p>
              <Button>Sign Out</Button>
            </form>) : (<Button asChild>
              <Link href="/auth">Sign In</Link>
            </Button>)
          }
        </div>
      </div>
    </header>
  )
}