'use server';

import { supabaseServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function logout (){
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect('/auth');
}