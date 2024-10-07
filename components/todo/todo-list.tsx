"use client";
import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import { Todo } from '@/lib/types/customTypes'
import { useOptimistic } from "react";

export type Action = "delete" | "update" | "create";

//  => todoReducer : how the todo list should change based on different actions (like deleting, updating, or creating a todo
//  => state: The current array of todos.
//  => todo: The todo item to be deleted, updated, or created
//  => action: A string ("delete", "update", "create") that specifies what action to perform.
export function todoReducer(
  state: Array<Todo>, 
  { action, todo }: { action: Action; todo: Todo } 
) {
  switch (action) {
    case "delete":
      return state.filter(({ id }) => id !== todo.id);
    case "update":
      return state.map((t) => (t.id === todo.id ? todo : t));
    case "create":
      return [todo, ...state];
    default:
      return state;
  }
}

export type TodoOptimisticUpdate = (action: {
  action: Action;
  todo: Todo;
}) => void;

export function TodoList({ todos }: { todos: Array<Todo> }) {
  const [optimisticTodos, optimisticTodosUpdate] = useOptimistic(todos, todoReducer); // Optimistic update hook
  return (
    <>
      <TodoForm optimisticUpdate={optimisticTodosUpdate} />
      <div className="w-full flex flex-col gap-4">
        {optimisticTodos?.map((todo) => {
          return (
            <TodoItem
              optimisticUpdate={optimisticTodosUpdate}
              todo={todo}
              key={todo.id}
            />
          );
        })}
      </div>
    </>
  );
}