import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Button>
        Hello World
      </Button>
      <div className='my-4 w-full flex items-center justify-center bg-slate-900 rounded-full p-4 max-w-2xl mx-auto'>
        <Link href={'/dashboard'}>
          <Button variant={'link'} className='text-2xl font-semibold'>
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
