import { Todo } from '@/app/model/Todo'
import React from 'react'

interface IDisplayTodo {
  todo: Todo;
  toggleTodo: (_id: string) => void;
  removeTodo: (_id: string) => void;
}

const DisplayTodo = ({ todo, toggleTodo, removeTodo }: IDisplayTodo) => {
  return (
    <tr className="text-center text-xl">
      
      <td className={`${todo.done ? 'line-through' : ''} text-2xl p-4`}>
        {todo.text}
      </td>

      <td className="p-4">
        <div
          onClick={() => toggleTodo(todo._id)}
          className="relative w-24 h-10 flex items-center justify-center border-2 border-black rounded-full cursor-pointer overflow-hidden transition-all duration-500 ease-in-out">
          <span className="absolute left-2 text-red-500 text-2xl">✕</span>
          <span className="absolute right-2 text-green-500 text-2xl">✓</span>
          <div
            className={`absolute w-8 h-8 rounded-full transition-transform duration-500 ${
              todo.done ? 'translate-x-6 bg-green-500' : '-translate-x-6 bg-red-500'}`}>
          </div>
        </div>
      </td>

      <td className="p-4">
        <button
          className="border-2 border-black rounded-md px-3 py-1"
          onClick={() => removeTodo(todo._id)}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default DisplayTodo;
