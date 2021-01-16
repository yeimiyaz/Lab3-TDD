import React, {useState, useEffect} from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");
  const [saving, setSaving] = useState(false);

  function onChange(e){
    const value = e.target.value;
    setNewTodo(value);
  }

  function addTodo(e){
    e.preventDefault();
    const value = {
      userId: 3, 
      id: Math.floor(Math.random()*10000)+1,
      title: newTodo,
      completed: false
    };

    setSaving(true);
    fetch('https://jsonplaceholder.typicode.com/todos',{
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-type' : 'application/json; charset=UTF-8'},
    })

      .then((response)=> response.json())
      .then((result) =>{
        setTodos(todos.concat({...result, id: value.id}));
        setSaving(false);
      });
  }

  useEffect(()=> {
    async function fetchData() {
      const result = await fetch("https://jsonplaceholder.typicode.com/todos"). then((response) =>response.json());
      setTodos(result.slice(0, 5));
      setLoading(false);
      return result;
    }
    fetchData();
  }, []);

  function removeTodo(id){
    setTodos(todos.filter((t)=> t.id != id));
  }

  function updateTodo(id){
    const newList = todos.map((todoItem)=>{
      if (todoItem.id == id)
      {
        const updatedItem ={...todoItem, completed: !todoItem.completed};
        return updatedItem;
      }
      return todoItem;
    });
    setTodos(newList);
  }

  const TodoList = ({todos, removeHandler, updateTodo}) =>{
    <div>
      { todos.map((t, i)=>(
        <todoItem key={i} todo={t} removeHandler={removeHandler} updateTodo={updateTodo} />
      ))}
    </div>
  };

  return(
    <div className="App">    
      <h1 className="header"> My todo List</h1>
      {loading ? ('Loading') : (<TodoList todos={todos} removeHandler={removeTodo} updateTodo={updateTodo}/>)}
    
      <div className="add-todo-form">
        {saving ?(
          'Saving'
        ):(
          <form onSubmit={addTodo}>
            <input type="text" onChange={onChange}/>
            <button type="submit"> Add new todo </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
