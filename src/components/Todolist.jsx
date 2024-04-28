import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTask, done: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const updateTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='todolistnnn' >
      
      <h1>Todo List</h1>

      <div className='inputundadd'>
      <input className='add'
        type='text'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Add a new task'
      />
      <button className='btnadditem' onClick={addTask}>Add</button>
      </div>
           
      <ul >
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            removeTask={removeTask}
            updateTask={updateTask}
          />
        ))}
      </ul>
      </div>
    
  );
};

export default TodoList;
