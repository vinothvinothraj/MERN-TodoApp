import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoUpdateForm from './components/TodoUpdateForm';
import './App.css';
import { LuListTodo } from "react-icons/lu";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (title, description, completed, priority, category) => {
        try {
            const response = await axios.post('http://localhost:5000/api/todos', {
                title,
                description,
                status: completed ? 'Complete' : 'Incomplete',
                priority,
                category,
            });
            setTodos([...todos, response.data]);
            alert('Todo task added successfully!');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
            alert('Todo deleted successfully!');
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const openUpdateForm = (id) => {
        setSelectedTodoId(id);
        setShowUpdateForm(true);
    };

    const updateTodo = async (id, updatedFields) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedFields);
            const updatedTodos = todos.map(todo =>
                todo._id === id ? response.data : todo
            );
            setTodos(updatedTodos);
            setShowUpdateForm(false);
            alert('Todo Updated successfully!');
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const cancelUpdate = () => {
        setShowUpdateForm(false);
    };

    return (
        <Router> 
            <div className='container'>
                <div className="navbar">
                    <div className="logo">
                        <img src="images/logo1.png" alt="Logo" className="logo-img" />
                        <h2>TodoApp</h2>
                    </div>

                    <div className="title">
                        <Link to="/todos" className='link-todo'>
                            <LuListTodo 
                           id='link-todo-icon' style={{ color: 'white', fontSize: '20px' }} />
                            <p id='link-todo-p '>Todo List</p>
                        </Link>
                        <p>A simple and efficient way to manage your tasks.</p>
                    </div>
                </div>

                <div className="hero">
                    <div className="hero-content">
                        <div className='hero-form'>
                            <TodoForm onAdd={addTodo} />
                        </div>
                    </div>
                </div>

                <Routes>
                    <Route path="/todos" element={<TodoList todos={todos} onDelete={deleteTodo} onUpdate={openUpdateForm} />} />
                </Routes>

                {showUpdateForm && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={cancelUpdate}>&times;</span>
                            <TodoUpdateForm
                                todo={todos.find(todo => todo._id === selectedTodoId)}
                                onUpdate={updateTodo}
                                onCancel={cancelUpdate}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Router> 
    );
};

export default App;
