import React, { useState } from 'react';
import './Form.css';


const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [priority, setPriority] = useState('Low');
    const [category, setCategory] = useState('Work');

    const handleAdd = () => {
        if (!title || !description) {
            alert('Please enter a title and description.'); 
            return;
        }


        onAdd(title, description, completed, priority, category);
        setTitle('');
        setDescription('');
        setCompleted(false);
        setPriority('Low');
        setCategory('Work');
    };

    const handleClear = () => {
        setTitle('');
        setDescription('');
        setCompleted(false);
        setPriority('Low');
        setCategory('Work');
    };

    return (
        <div className='main-form'>
            <h2>Add New Todo</h2>
            <div className='input-titles'>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    required 
                />
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                />
            </div>


            <div className='input-more'>
                <div className='input-completed'>
                    <label>
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={e => setCompleted(e.target.checked)}
                        />
                        Mark task as completed
                    </label>
                </div>
                <div className='input-category'>
                    <label>
                        Category:
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Study">Study</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className='input-priority'>
                <label>Priority:</label>
                <label>
                    <input
                        type="radio"
                        value="Low"
                        checked={priority === 'Low'}
                        onChange={() => setPriority('Low')}
                    />
                    Low
                </label>
                <label>
                    <input
                        type="radio"
                        value="Medium"
                        checked={priority === 'Medium'}
                        onChange={() => setPriority('Medium')}
                    />
                    Medium
                </label>
                <label>
                    <input
                        type="radio"
                        value="High"
                        checked={priority === 'High'}
                        onChange={() => setPriority('High')}
                    />
                    High
                </label>
            </div>
            <div className='form-btn'>
                <button onClick={handleAdd}>Add Todo</button>
                <button id='cl-btn' onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
};

export default TodoForm;
