import React, { useState, useEffect } from 'react';
import './UpdateFormStyle.css';

const TodoUpdateForm = ({ todo, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        priority: todo.priority,
        category: todo.category
    });

    
    useEffect(() => {
        setFormData({
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            priority: todo.priority,
            category: todo.category
        });
    }, [todo]);

    const handleSave = () => {
        onUpdate(todo._id, formData);
    };

    const handleClear = () => {
        setFormData({
            title: '',
            description: '',
            completed: false,
            priority: 'Low',
            category: 'Work'
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    return (
        <div className="update-form">
            <h1>Update ToDo</h1>
            <div className='form-elements'>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Updated Title"
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Updated Description"
                />

                <label>
                    Mark task as completed:
                    <input
                        type="checkbox"
                        name="completed"
                        checked={formData.completed}
                        onChange={handleChange}
                    />
                </label>

                <div className='update-cat-pri'>
                    <label>
                        Category:
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Study">Study</option>
                        </select>
                    </label>

                    <label>
                        Priority:
                        <select name="priority" value={formData.priority} onChange={handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                </div>

                <div className='update-btns'>
                    <button id='update-clear-btn' onClick={handleClear}>Clear</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default TodoUpdateForm;
