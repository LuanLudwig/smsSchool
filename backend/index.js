const express = require('express');
const cors = require('cors');

const app = express();

// Config Json response
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000 '}))

// Public Folder for images
app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes');
const StudentRoutes = require('./routes/StudentRoutes');
const SendRoutes = require('./routes/SendRoutes');

app.use('/users', UserRoutes);
app.use('/student', StudentRoutes);
app.use('/send', SendRoutes);

app.listen(5000)

