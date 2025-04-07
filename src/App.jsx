import './App.css'



import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  addTask, toggleTask, removeTask,
  setFilter, setCategory, setSearch, toggleSortPriority
} from './redux/tasksSlice';

function App() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [category, setCat] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const { tasks, filter, category: selectedCat, search, sortPriority } = useSelector((state) => state.tasks);

  const filtered = tasks
    .filter(task => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed))
    .filter(task => selectedCat === 'all' || task.category === selectedCat)
    .filter(task => task.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortPriority ? priorityValue(b.priority) - priorityValue(a.priority) : 0);

  function priorityValue(p) {
    return p === 'High' ? 3 : p === 'Medium' ? 2 : 1;
  }

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(addTask({ text, category, priority, dueDate }));
    setText('');
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Task" />
        <select value={category} onChange={(e) => setCat(e.target.value)}>
          <option>Work</option>
          <option>Personal</option>
          <option>Groceries</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>

      <hr />


      <div>
        <button onClick={() => dispatch(setFilter('all'))}>All</button>
        <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
        <button onClick={() => dispatch(setFilter('incomplete'))}>Incomplete</button>

        <select onChange={(e) => dispatch(setCategory(e.target.value))}>
          <option value="all">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Groceries">Groceries</option>
        </select>

        <input placeholder="Search" onChange={(e) => dispatch(setSearch(e.target.value))} />
        <button onClick={() => dispatch(toggleSortPriority())}>Sort by Priority</button>
      </div>
      <div className="heading" >
        
        <div className="headingName">Task</div>
        <div className="headingName">Category</div>
        <div className="headingName">Priority</div>
        <div className="headingName">Due Date</div>
        <div className="headingName">Actions</div>

      </div>

      <ul>
        {filtered.map(task => (
          <li key={task.id} className="task-row">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <span className={task.completed ? 'completed task-col' : 'task-col'}>
              {task.text}
            </span>
            <span className="task-col">{task.category}</span>
            <span className="task-col">{task.priority}</span>
            <span className="task-col">{task.dueDate}</span>
            <button onClick={() => dispatch(removeTask(task.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;