const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()

app.use(express.json())


//route
app.get('/', async (req, res) => {
    //res.sendStatus(200)

    try{
        const data = await pool.query('SELECT * FROM schools')
        res.status(200).send(data.rows)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/', async (req,res)=>{
    const {name ,location} = req.body
    
    try{
        await pool.query('INSERT INTO schools (name,address) VALUES ($1, $2)',[name,location])
        res.status(200).send({
            message : "Successfully added student"
        })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

    /*res.status(200).send({
        message : `Your DATA are ${name},${location}`
    })*/

})

app.get('/setup', async (req,res)=>{
    try{
        await pool.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))')
        res.status(200).send({
            message : "Successfully Created Table"
        })

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})


app.listen(port, ()=> console.log(`Server has started on port: ${port}`))