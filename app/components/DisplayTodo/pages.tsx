import { Todo } from '@/app/model/Todo'
import React from 'react'

interface IDisplayTodo {
  todo: Todo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const DisplayTodo = ({todo, toggleTodo, removeTodo}: IDisplayTodo) => {
    
  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={() => toggleTodo(todo.id)}>Done</button>
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
      
    </div>
  )
}

export default DisplayTodo
