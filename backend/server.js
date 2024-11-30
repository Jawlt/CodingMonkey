require ('dotenv').config();
const express = require ('express');
const cors = require ('cors');
const db = require('./db');
const usersRoute = require('./routes/updateUser')

const app = express();

//connect to db
db()

// Middlewares
app.use(express.json())
app.use(cors());

//Routes
app.use("/api", usersRoute)

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Connected on port ${port}`));

