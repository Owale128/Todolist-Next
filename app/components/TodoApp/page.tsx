'use client'
import { TodosAllContext } from '@/app/context/TodosAllContext'
import { ActionType, TodoReducer } from '@/app/reducer/TodoReducer'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import AddTodo from '../AddTodo/page'
import Todos from '../Todos/pages'
import axios from 'axios'

const TodoApp = () => {
  const [todos, dispatch] = useReducer(TodoReducer, []);
  const [loading, setLoading] = useState(true);  

  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/listTodos');
        dispatch({
          type: ActionType.SET_TODOS,
          payload: response.data,
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTodos();
  }, [dispatch]);

  if (loading) {
    return <div className='text-center my-36 text-3xl'>Loading todos...</div>
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TodosAllContext.Provider value={{ todos, dispatch}}>
        <h1 className="text-6xl">TodoList</h1>
        <AddTodo />
        <Todos />
      </TodosAllContext.Provider>
    </div>
  );
};

export default TodoApp;
