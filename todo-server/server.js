const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/todo-list', {
    
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


const Todo = require('./models/TodoModels');


app.use('/api/todos', require('./routes/todoRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
