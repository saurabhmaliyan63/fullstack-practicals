import React, { useState, useEffect } from 'react';

export default function App() {
  // 1. useState Hook: Initialize state with persisted todos from localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('react_todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: 1, text: 'Learn React Hooks (useState, useEffect)', completed: true },
      { id: 2, text: 'Build responsive To-Do component layout', completed: true },
      { id: 3, text: 'Implement LocalStorage persistence', completed: false },
      { id: 4, text: 'Connect frontend to RESTful API backend', completed: false },
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // 2. useEffect Hook: Sync state with localStorage on changes
  useEffect(() => {
    localStorage.setItem('react_todos', JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  // Toggle completion
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Clear completed
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="app-card">
      <div className="header">
        <span className="badge">Practical 3: React.js</span>
        <h1>TaskFlow React</h1>
        <p className="subtitle">State management, event handlers & local storage sync.</p>
      </div>

      {/* Input Form */}
      <form className="input-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
        <button type="submit" className="btn-add">Add Task</button>
      </form>

      {/* Filter and Status Controls */}
      <div className="controls">
        <span><strong>{activeCount}</strong> items remaining</span>
        <div className="filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        {todos.some((t) => t.completed) && (
          <button className="clear-btn" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-left">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <button
                className="btn-delete"
                onClick={() => deleteTodo(todo.id)}
                title="Delete task"
              >
                ✕
              </button>
            </li>
          ))
        ) : (
          <div className="empty-state">
            No tasks found in this view.
          </div>
        )}
      </ul>
    </div>
  );
}
