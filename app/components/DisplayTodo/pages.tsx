import { Todo } from '@/app/model/Todo'
import React from 'react'

interface IDisplayTodo {
  todo: Todo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const DisplayTodo = ({todo, toggleTodo, removeTodo}: IDisplayTodo) => {
    
  return (
    <div className='text-center text-xl'>
      <span className={`${todo.done ? 'done' : ''} text-2xl`} >{todo.text}</span>
      <button className={`${'toggleBtn'} mx-10 my-5 border-2 border-black rounded-md px-1`} onClick={() => toggleTodo(todo.id)}>Done</button>
      <button className={`${'removeBtn'} border-2 border-black rounded-md px-1`} onClick={() => removeTodo(todo.id)}>Remove</button>
      
    </div>
  )
}

export default DisplayTodo
