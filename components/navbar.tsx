import Link from 'next/link';
import { Profile } from './Profile';

export const Navbar = () =>{
  return (
    <div className='flex justify-between items-center h-20'>
      <Link href={'/'}>
        <h1 className='text-2xl font-bold'>LOGO</h1>
      </Link>
      <Profile/>
    </div>
  )
}