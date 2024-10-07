'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { useUser } from '@/app/hooks/useUser';
import { useSignOut } from '@/app/hooks/signOut';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export  function Header(){
  const router = useRouter();
  
  const { data , refetch} = useUser();

  const {mutate:signOut} = useSignOut(refetch);

  const handleSignOut = (e: React.FormEvent) => {
    e.preventDefault();
    signOut(); // Trigger the mutation (e.g., sign out)
    router.push('/auth');
  };

  return (
    <header className="z-10 sticky top-0 left-0 right-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background mx-auto">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">SupaTodo</span>
          </a>
          <Link href="/todos">Todos</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {
            data?.email ? 
            (
              <form onSubmit={handleSignOut}  className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={data.image_url!} alt={data.display_name!} />
                  <AvatarFallback>
                    {data.display_name ? data.display_name.charAt(0) : "U"}
                  </AvatarFallback>
              </Avatar>
                <Button>Sign Out</Button>
              </form>
            ) : (
              <Button asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
            )
          }
        </div>
      </div>
    </header>
  )
}