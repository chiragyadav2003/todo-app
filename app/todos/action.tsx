'use server';
import { revalidatePath } from 'next/cache';
import { Todo } from '@/lib/types/customTypes';
import { supabaseServer } from '@/utils/supabase/server';

export async function addTodo(formData:FormData){
  const supabase = supabaseServer();
  const text = formData.get('todo') as string | null ;

  if(!text){
    throw new Error("Text is required");
  }

  const {data:{user}} = await supabase.auth.getUser();

  if(!user){
    throw new Error("User is required");
  }

  const {error} = await supabase
                        .from("todos")
                        .insert({
                          task:text,
                          user_id:user.id
                        })

  if(error){
    throw new Error("Error adding task");
  };

  //Revalidate the todos page after adding a new task to the database to update the UI.
  revalidatePath('/todos'); 
}

export async function deleteTodo(id:number){
  const supabase = supabaseServer();
  const {data:{user}} = await supabase.auth.getUser();

  if(!user){
    throw new Error("User is required");
  }

  const {error} = await supabase
                        .from('todos')
                        .delete()
                        .match({
                          user_id:user.id,
                          id:id
                        })

  if(error){
    throw new Error('Error deleting task');
  };

  revalidatePath('/todos');
}

export async function updateTodo(todo:Todo){
  const supabase = supabaseServer();

  const {data:{user}} = await supabase.auth.getUser();

  if(!user){
    throw new Error("User is required");
  }

  const {error} = await supabase
                        .from('todos')
                        .update(todo)
                        .match({
                          user_id:user.id,
                          id:todo.id
                        });

  if(error){
    throw new Error('Error updating task');
  };

  revalidatePath('/todos');
}