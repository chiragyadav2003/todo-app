'use client';
import { supabaseBrowser } from '@/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'

const initUser = {
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: ""
}

export const useUser = ()=>{
  
  return useQuery({
    queryKey:['user'],

    queryFn:async()=>{
      const supabase = supabaseBrowser();

      const {data} = await supabase.auth.getSession();

      if(data.session?.user){
        //fetch user information
        const {data:user} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id)
        .single(); //Return data as a single object instead of an array of objects.

        return user;
      }

      return initUser; //Return an empty object if there is no user.
    }
  })
}