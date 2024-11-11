'use client'
import { TodosAllContext } from '@/app/context/TodosAllContext'
import { ActionType, TodoReducer } from '@/app/reducer/TodoReducer'
import React, { useEffect, useReducer, useState } from 'react'
import AddTodo from '../components/AddTodo'
import Todos from '../components/Todos'
import axios from 'axios'
import Header from '../components/Header'
import ProtectedRoute from '../components/ProtectedRoute'
import { ITheme, ThemeContext, themes } from '@/app/context/ThemeContext'

const TodoApp = () => {
  const [todos, dispatch] = useReducer(TodoReducer, []);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<ITheme>(themes.dark)

  const toggleTheme = () => {
   const newTheme = theme.name === 'Night'? themes.light : themes.dark;
   setTheme(newTheme)
   localStorage.setItem('theme', JSON.stringify(newTheme))
  }

useEffect(() => {
  const storedTheme = localStorage.getItem('theme')
    if(storedTheme){
      setTheme(JSON.parse(storedTheme))
    }
}, [])

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('/api/listTodos', {
          headers: {Authorization: `Bearer ${token}`}
        });

        const fetchedTodos = response.data

        dispatch({
          type: ActionType.SET_TODOS,
          payload: fetchedTodos,
        });
        
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <div className='text-center my-36 text-3xl'>Loading todos...</div>
  }

  return (
    <ThemeContext.Provider value={theme}>
        <ProtectedRoute>
        <Header toggleTheme={toggleTheme}/>
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-3 font-[family-name:var(--font-geist-sans)] animate-popUp">
      <TodosAllContext.Provider value={{ todos, dispatch}}>
        <h1 className="text-6xl max-md:text-5xl text-white">TodoList</h1>
        <AddTodo />
        <Todos />
      </TodosAllContext.Provider>
    </div>
  </ProtectedRoute>
      </ThemeContext.Provider>
  );
};

export default TodoApp;
