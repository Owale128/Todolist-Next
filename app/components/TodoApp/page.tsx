'use client'
import { TodosAllContext } from '@/app/context/TodosAllContext'
import { TodoReducer } from '@/app/reducer/TodoReducer'
import React, { useReducer } from 'react'
import AddTodo from '../AddTodo/page'
import Todos from '../Todos/pages'
import DisplayTodo from '../DisplayTodo/pages'

const Todolist = () => {
const [todos, dispatch] = useReducer(TodoReducer, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <TodosAllContext.Provider value={{todos, dispatch}}>
    <h1 className="text-6xl">TodoList</h1>
    <AddTodo />
    <Todos />
    </TodosAllContext.Provider>
   </div>
  )
}

export default Todolist