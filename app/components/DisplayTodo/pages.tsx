import { Todo } from '@/app/model/Todo'
import React from 'react'
import Button from '../Button/page';

interface IDisplayTodo {
  todo: Todo;
  toggleTodo: (_id: string) => void;
  removeTodo: (_id: string) => void;
}

const DisplayTodo = ({ todo, toggleTodo, removeTodo }: IDisplayTodo) => {
  return (
    <tr className="text-center text-xl bg-white border border-black">
      
      <td className={`${todo.done ? 'line-through' : ''} text-2xl py-2 lg:p-4`}>
        {todo.text}
      </td>

      <td className="p-4">
        <div
          onClick={() => toggleTodo(todo._id)}
          className="relative w-24 h-9 flex items-center justify-center border-2 border-black rounded-full cursor-pointer overflow-hidden transition-all duration-500 ease-in-out">
          <span className="absolute left-2 text-red-500 text-xl">✕</span>
          <span className="absolute right-2 text-green-500 text-xl">✓</span>
          <div
            className={`absolute w-7 h-7 rounded-full transition-transform duration-500 ${
              todo.done ? 'translate-x-6 bg-green-500' : '-translate-x-6 bg-red-500'}`}>
          </div>
        </div>
      </td>

      <td className="p-4">
        <Button
          className="border-2 border-black rounded-md px-3 py-0.4"
          click={() => removeTodo(todo._id)}>
          <>Remove</>
        </Button>
      </td>
    </tr>
  );
};

export default DisplayTodo;
