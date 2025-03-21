import express from 'express'
import { postsRoutes } from './routes/postsRoutes.js'
import { usersRoutes } from './routes/usersRoutes.js'
import mongoose from 'mongoose'

import path from 'path';
import { fileURLToPath } from 'url';

// Resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname);

const app  = express();

app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

// Use the client app
app.use(express.static(path.join(__dirname, '/client/dist')));

// Render the client app
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/client/dist/index.html'))
);


//mongoose.connect("mongodb://localhost:27017", { dbName: 'demo_db'})
mongoose.connect(process.env.DB_URI, { dbName: 'demo_db'})
    .then(()=>{ 
    console.log("connected to DB successfully");
    app.listen(4000, 'localhost', () => console.log("Listening to port 4000"));
})
.catch((err) => console.log(err));




