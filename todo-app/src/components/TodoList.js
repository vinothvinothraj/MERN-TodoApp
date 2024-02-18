import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './TodoList.css';

const TodoList = ({ todos, onDelete, onUpdate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            return;
        }
    
        const filtered = todos.filter(todo =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            todo.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
            todo.status.toLowerCase().includes(searchTerm.toLowerCase()) || 
            todo.priority.toLowerCase().includes(searchTerm.toLowerCase())
        );
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

        filtered.reverse();
        
        setFilteredTodos(filtered);
        setModalIsOpen(true);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <div className="todo-list">
            <div className="header">
                <h1 className="center">Todo List</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button id='srch-btn' onClick={handleSearch}>Search</button>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Filtered Todos Modal"
                className="modal2"
                overlayClassName="overlay"
            >
                <div className="modal-content2">
                    <span className="close-icon2" onClick={closeModal}>×</span>
                    <h2>Filtered Todos</h2>
                    {filteredTodos.map(todo => (
                        <div key={todo._id} className="todo-items2">
                            <h3>{todo.title}</h3>
                            <p><strong>Date&Time:</strong> {new Date(todo.date).toLocaleString()}</p>
                            <p><strong>Description:</strong> {todo.description}</p>
                            <p><strong>Category:</strong> {todo.category}</p>
                            <p><strong>Status:</strong> {todo.status}</p>
                            <p><strong>Priority:</strong> {todo.priority}</p>
                        </div>
                    ))}
                </div>
            </Modal>

            {[...todos].reverse().map(todo => (
                <div key={todo._id} className="todo-item">
                    <div className='date-title'>
                        <h3>Title: {todo.title}</h3>
                        <p><strong>Date&Time:</strong> {new Date(todo.date).toLocaleString()}</p>
                    </div>
                    
                    <div className='more-items'>
                        <p><strong>Description:</strong> {todo.description}</p>
                        <p><strong>Category:</strong> {todo.category}</p>
                        <p><strong>Status:</strong> {todo.status}</p>
                        <p><strong>Priority:</strong> {todo.priority}</p>
                    </div>

                    <div className='buttons'>
                        <button id= "dlt-btn" onClick={() => onDelete(todo._id)}>Delete</button>
                        <button onClick={() => onUpdate(todo._id)}>Update</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
