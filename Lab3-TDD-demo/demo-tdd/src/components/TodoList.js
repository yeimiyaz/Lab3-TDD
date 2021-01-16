import React from 'react'
import TodoItem from '../components/TodoItem'

const TodoList =({todos}) => 
<div>
    {todos.map((t,i)=>(
        <TodoItem key={i} todo={t}/>
    ))}
</div>;

export default TodoList;