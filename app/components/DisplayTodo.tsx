import { Todo } from '@/app/model/Todo'
import React from 'react'
import Button from './Button';

interface IDisplayTodo {
  todo: Todo;
  toggleTodo: (_id: string) => void;
  removeTodo: (_id: string) => void;
}

const DisplayTodo = ({ todo, toggleTodo, removeTodo }: IDisplayTodo) => {
  return (
    <tr className="text-xl bg-black text-white border">
      
      <td className={` text-2xl todoText pl-3 ${todo.done ? 'line-through' : ''}`}>
        {todo.text}
      </td>

      <td className="p-4 toggleBtn">
        <div
          onClick={() => toggleTodo(todo._id)}
          className="relative w-24 h-9 flex items-center justify-center border-2 border-white rounded-full cursor-pointer overflow-hidden transition-all duration-500 ease-in-out">
          <span className="absolute left-2 text-red-500 text-xl">✕</span>
          <span className="absolute right-2 text-green-500 text-xl">✓</span>
          <div
            className={`absolute w-7 h-7 rounded-full transition-transform duration-500 ${
              todo.done ? 'translate-x-6 bg-green-500' : '-translate-x-6 bg-red-500'}`}>
          </div>
        </div>
      </td>

      <td className="p-4 removeBtn">
        <Button
          className="border-2 rounded-md px-3 py-0.4"
          click={() => removeTodo(todo._id)}>
          <>Remove</>
        </Button>
      </td>
    </tr>
  );
};

export default DisplayTodo;
