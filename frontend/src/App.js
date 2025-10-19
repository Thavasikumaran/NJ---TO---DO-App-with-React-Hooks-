import React, { useEffect, useState } from 'react';
import api from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!token) return;
    api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } })
       .then(res => setTasks(res.data))
       .catch(() => { localStorage.removeItem('token'); setToken(''); });
  }, [token]);

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 20 }}>
      <h1>IBM-NJ To-Do App</h1>
      {!token ? <Auth setToken={setToken}/> : (
        <>
          <TaskForm token={token} onAdd={t => setTasks(prev => [t, ...prev])}/>
          <TaskList tasks={tasks} token={token} onUpdate={setTasks}/>
        </>
      )}
    </div>
  );
}

function Auth({ setToken }) {
  const [u, sU] = useState(''); const [p, sP] = useState('');
  const login = async () => {
    const res = await api.post('/auth/login', { username: u, password: p });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };
  return (
    <div>
      <input placeholder="username" value={u} onChange={e => sU(e.target.value)} />
      <input placeholder="password" type="password" value={p} onChange={e => sP(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;

