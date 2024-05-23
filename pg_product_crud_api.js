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

// Product Table

app.delete('/product/:id', async(req, res) => {
    let req_id = req.params.id
    const update_productDataQuery = `delete from react_schema.product  where id = $1`;
  
      console.log(update_productDataQuery)
    try {
      await db_constructor.query(update_productDataQuery, [req_id]);
      console.log(`product ${req_id} has been deleted!`);
      res.status(200).send(`product ${req_id} has been deleted!`)
    } catch (error) {
      console.log(`Failed to delete product Data for product id ${req_id}`, error);
    }
  })
  
  
  app.put('/product/:id', async(req, res) => {
    let {name, description,date} = req.body
    console.log(name)
    console.log(description)
    console.log(date)
  
    let req_id = req.params.id
    const update_productDataQuery = `update react_schema.product set 
      product_name= $1, description = $2, exp_date = $3 where id = $4`;
  
      console.log(update_productDataQuery)
    try {
      await db_constructor.query(update_productDataQuery, [
        name,
        description,
        date,
        req_id
      ]);
      console.log("product has been updated!");
      res.status(204).send()
    } catch (error) {
      console.log(`Failed to update product Data for product id ${req_id}`, error);
    }
  })
  
  
  app.post('/products', async(req, res) => {
    let {name, description,date} = req.body
    console.log(name)
    console.log(description)
    console.log(date) 
    const insert_newProductDataQuery = `INSERT INTO react_schema.product (product_name, description, exp_date)
    VALUES ($1, $2, $3);`;
  
    try {
      await db_constructor.query(insert_newProductDataQuery, [
        name,
        description,
        date,
      ]);
      console.log("New Product Data Inserted!");
      res.status(200).send(`product ${name} added to db successfully`)
    } catch (error) {
      console.log("Failed to insert new product Data", error);
    }
  })
  
  app.get('/products/:id', async(req, res) => {
  
    let req_id = req.params.id
    const read_existingProductDataQuery = `SELECT * FROM react_schema.product where id= ${req_id};`;
  
    try {
      const result = await db_constructor.query(read_existingProductDataQuery);
      console.log("Read the existing Data!");
      console.log(result.rows);
      res.status(200).send(result.rows)
    } catch (error) {
      console.log("Failed to read the existing Data", error);
    }
  })
  
  app.get('/products', async(req, res) => {
    const read_existingProductDataQuery = `SELECT id, product_name, description, exp_date
    FROM react_schema.product;`;
  
    try {
      const result = await db_constructor.query(read_existingProductDataQuery);
      console.log("Read the existing Data!");
      console.log(result.rows);
      res.status(200).send(result.rows)
  
    } catch (error) {
      console.log("Failed to read the existing Data", error);
    }
  })
  
  app.get('/', async(req, res) =>{
    console.log('test')
    res.status(200).send('APi is up and running')
  })
  
  
  app.listen(port, async() => {
    console.log(`Express API is up and running on port ${port}`)
    await connectDatabase();
  })
  