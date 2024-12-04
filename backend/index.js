const express = require('express');
const mongoDB = require("./db"); // Import the mongoDB function

const app = express();
const port = 5000;

mongoDB(); // Call the MongoDB connection function
 
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})
// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use the Createuser route
app.use('/api', require("./Routes/Createuser"));
app.use('/api', require("./Routes/DisplayData"));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
