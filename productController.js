const { Client } = require("pg");

const express = require('express')

const app = express()
port = 4000

app.use(express.json())

const user_db_connection =
  "postgres://postgres:ind123@localhost:5432/akhil_db";
const db_constructor = new Client({ connectionString: user_db_connection });


async function connectDatabase() {
  try {
    // 1. Can we use this line here? Doubt! 2. How to connect to Abhishek Database?
    // Here new Client is a constructor, Can we change Client to other preferred name? or it is mandatory? Why?
    await db_constructor.connect();
    console.log("Database Connection is Successful!");
    // await db_constructor.end();  This code says recommended. Is it is correct? or not required?
  } catch (error) {
    console.log("Failed to connect to the database:", error);
  }
}

app.delete('/product/:id', async(req, res) => {

})

app.put('/product/:id', async(req, res) => {

})

app.post('/products', async(req, res) => {

})

app.get('/products/:id', async(req, res) => {

})

app.get('/products', async(req, res) => {
    
})


app.get('/', async(req, res) =>{
    console.log('test')
    res.status(200).send('APi is up and running')
  })
  
  
  app.listen(port, async() => {
    console.log(`Express API is up and running on port ${port}`)
    await connectDatabase();
  })