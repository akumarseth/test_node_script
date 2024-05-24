// const {connectDatabase, readProducts } = productService

const productService = require("./productService");

const express = require('express')

const app = express()
port = 4000

app.use(express.json())



app.delete('/product/:id', async(req, res) => {

})

app.put('/product/:id', async(req, res) => {

})

app.post('/products', async(req, res) => {
  let body = req.body
  try {
    let resutls = await productService.saveProducts(body)
    console.log(resutls)
    // if(resutls){
      res.status(200).send(`product ${body.name} added to db successfully. ${resutls}`)
    // }
    // else{
    //   throw new Error(resutls)
    // }
  } catch (error) {
    console.log("Failed to read the existing Data", error);
    res.status(500).send(error)
  }

})

app.get('/products/:id', async(req, res) => {
  let req_id = req.params.id

  try {
    let resutls = await productService.readProductById(req_id)
    res.status(200).send(resutls)
  } catch (error) {
    console.log("Failed to read the existing Data", error);
  }
})

app.get('/products', async(req, res) => {
  try{
    let results = await productService.readProducts()
    console.log(results)
    res.status(200).send(results)
  }
  catch (error){
    res.status().send(error)
  }
})


app.get('/', async(req, res) =>{
    console.log('test')
    res.status(200).send('API is up and running')
  })
  
  
  app.listen(port, async() => {
    console.log(`Express API is up and running on port ${port}`)
    await productService.connectDatabase();
  })