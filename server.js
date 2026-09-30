const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const filePath = path.join(__dirname,"db.json")

let cache = {}


async function readData(){
    let data = await fs.readFile(filePath,'utf-8');
    return JSON.parse(data)
}

async function delayReaddata(){
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,1500)

    })
    return await readData();
}

app.get('/products',async(req,res)=>{
    let key = req.url;
    let value = cache[key]
    try{
        if(value){
            return res.json(value)
        }
        let products = await delayReaddata()
        cache[key] = products
        return res.json(products)
    }catch(err){
        console.log(err)
    }
    
});

app.get('/products/:id',async(req,res)=>{
    let key = req.url
    let value = cache[key]
    try{
        if(value){
            return res.json(value)
        }
        let id = Number(req.params.id)
        let products = await delayReaddata()
        let data = products.find(x => x.id == id)
        cache[key] = data
        res.json(data)
    }catch(err){
        console.log(err)
    }
});

app.post("/products",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})


