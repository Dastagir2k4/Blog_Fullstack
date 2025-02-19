const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const blogRoutes = require('./routes/blogRoutes'); // Import the blog routes

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log('Error:', err);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Blog API');
});



// Use the blog routes
app.use('/api/blogs', blogRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


  
