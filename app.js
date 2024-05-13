const express = require('express')

const app = express()
port = 4000

app.get('/', async(req, res) =>{
    console.log('test')
    res.status(200).send('APi is up and running')
})

app.listen(port, async() => {
    console.log(`Express API is up and running on port ${port}`)
})
