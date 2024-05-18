const express = require('express');
const Crudmodel = require('../models/Crudmodel');


const router = express.Router()

router.get('/', (req, res) => {
    
    try{

        return res.status(200).json({"message": "This is Api", "status_code": res.statusCode = 200})

    }catch(e){
       return res.status(500).json({"message": "Something Went Wrong", "status_code": res.statusCode = 500})
    }
});


router.post('/add', async(req, res) => {
    
    try{
        const {title, description }=  await req.body;
        if(!title || !description){
            return res.status(400).json({ 
                message: "Title and description are required", 
                status_code: res.statusCode 
            });
        }
        const create = await Crudmodel.create({title, description})
        const save = await create.save();
        return res.status(201)
        .json({
            "message" : "Data Created Successfully",
            "payloads" : { "title" : title, "description" : description},
            "status_code" : res.statusCode = 201
        });
    }
    catch(e){
        return res.status(500).json({"mesage" : "something Went Wrong" , "status_code" : res.statusCode=500, "random": e})
    }
   
})

router.all('/', (req, res) => {
    res.set('Allow', "GET").status(405).json({"message": "Method Not Allwed"})
})



module.exports = router