require('dotenv').config({ path: '../.env' });
const express=require('express');

const dbConnect=require('./config/dbConnect');
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');




//Connect to database
dbConnect();

const cors = require('cors'); // Install with: npm install cors

const app = express();

// Enable CORS for all routes and origins
app.use(cors());

//Middleware
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

//Start the server
const PORT=process.env.PORT || 7002;

app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
});
