'use client';
import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Textarea } from '../ui/textarea';
import {Send} from 'lucide-react';
import { addTodo } from '@/app/todos/action';
import { TodoOptimisticUpdate } from "./todo-list";
import { Todo } from '@/lib/types/customTypes';

// handles the UI for the form's content, such as the textarea for entering the todo and the submit button.
function FormContent() {
  // `pending` is a boolean value that indicates whether the form is currently submitting data.
  const { pending } = useFormStatus(); 
  return (
    <>
      <Textarea
        disabled={pending}
        minLength={4} // Minimum length of the todo text.
        name="todo" // Name of the input field. we will use this name to get the value of the input field and in action 
        required // Required field.
        placeholder="Add a new todo"
      />
      <Button type="submit" size="icon" className="min-w-10" disabled={pending}>
        <Send className="h-5 w-5 hover:scale-125 transition duration-500" />
        <span className="sr-only">Submit Todo</span>
      </Button>
    </>
  );
}

export function TodoForm({
  optimisticUpdate,
}: {
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardContent className="p-3">
        <form
          ref={formRef} // Reference to the form element.
          className="flex gap-4"
          // When the form is submitted, we will create a new todo object and add it to the database.
          action={async (data) => {
            // create a new todo object with the form data.
            const newTodo: Todo = { 
              id: -1, // Temporary id.
              inserted_at: "",
              user_id: "", 
              task: data.get("todo") as string, // Task text.
              is_complete: false,
            };
            optimisticUpdate({ action: "create", todo: newTodo }); // Optimistically update the UI.
            await addTodo(data); // Add the new todo to the database.
            formRef.current?.reset(); // Reset the form after submitting the data.
          }}
        >
          <FormContent />
        </form>
      </CardContent>
    </Card>
  );
}