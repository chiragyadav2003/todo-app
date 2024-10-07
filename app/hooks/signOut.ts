'use client';
import { supabaseBrowser } from '@/utils/supabase/client';
import { useMutation } from '@tanstack/react-query';

export const useSignOut = (refetch: () => void) => {
  return useMutation({
    mutationFn:async()=>{
      const supabase = supabaseBrowser();
      await supabase.auth.signOut();
    },
    onSuccess:()=>{
      refetch(); //Refetch the user data after sign out.
    }
  })
}