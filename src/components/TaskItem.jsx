import { useState } from 'react';

const TaskItem = ({ task, toggleTask, removeTask, updateTask }) => {
  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleToggleDone = () => {
    toggleTask(task.id);
  };

  const handleEdit = () => {
    if (edit && editedTitle !== task.title) {
      updateTask(task.id, editedTitle);
    }
    setEdit(!edit);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <li style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
      <input type='checkbox' checked={task.done} onChange={handleToggleDone} />
      {edit ? (
        <input
          type='text'
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <span>{task.title}</span>
      )}
      {edit ? (
        <button onClick={handleEdit}>Save</button>
      ) : (
        <button onClick={() => setEdit(true)}>Edit</button>
      )}
      <button onClick={() => removeTask(task.id)}>Remove</button>
    </li>
  );
};

export default TaskItem;
