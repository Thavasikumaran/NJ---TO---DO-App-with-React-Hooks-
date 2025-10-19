import React, { useState } from 'react';
import api from '../api';

export default function TaskForm({ token, onAdd }) {
  const [title, setTitle] = useState('');
  async function submit() {
    if (!title.trim()) return;
    const res = await api.post('/tasks', { title }, { headers: { Authorization: `Bearer ${token}` }});
    onAdd(res.data);
    setTitle('');
  }
  return (
    <div style={{ marginBottom: 16 }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task..." />
      <button onClick={submit}>Add</button>
    </div>
  );
}
