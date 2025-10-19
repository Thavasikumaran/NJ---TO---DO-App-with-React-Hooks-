import React from 'react';
import api from '../api';

export default function TaskList({ tasks, token, onUpdate }) {
  const del = async id => {
    await api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` }});
    onUpdate(prev => prev.filter(t => t._id !== id));
  };
  const toggle = async t => {
    const res = await api.patch(`/tasks/${t._id}`, { completed: !t.completed }, { headers: { Authorization: `Bearer ${token}` }});
    onUpdate(prev => prev.map(it => it._id === t._id ? res.data : it));
  };
  return (
    <ul>
      {tasks.map(t => (
        <li key={t._id}>
          <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
          <button onClick={() => toggle(t)}>✔</button>
          <button onClick={() => del(t._id)}>🗑</button>
        </li>
      ))}
    </ul>
  );
}
