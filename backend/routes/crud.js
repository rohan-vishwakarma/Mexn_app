const express = require('express');
const Crudmodel = require('../models/Crudmodel');
const { set } = require('mongoose');


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
        const validate = await Crudmodel.exists({title: title})
        if(validate){
            return res.json({"message":  `${title} Already Exist`, "status_code": res.statusCode=409})
        }
        const create = await Crudmodel.create({title, description})
        const save = await create.save();
        return res.status(201)
        .json({
            "message" : "Data Created Successfully",
            "payloads" : { "title" : title, "description" : description},
            "status_code" : res.statusCode = 201,
            "code" : save
        });
    }
    catch(e){
        return res.status(500).json({"mesage" : "something Went Wrong" , "status_code" : res.statusCode=500, "random": e})
    }
});

router.get('/retrieve', async(req, res) => {
    try{
        const crud = (await Crudmodel.find({}))
        return res.status(400)
        .json({
            "message" : "Data Fetched Successfully",
            "payloads" : {"data" : crud},
            "status_code" : res.statusCode = 201
        });
    }
    catch(e){
        console.log({e})
        return res.status(500).json({"mesage" : "something Went Wrong" , "status_code" : res.statusCode=500, "random": e})
    }
});

router.patch('/update/:title', async(req, res)=>{

    try {
        const title = req.params.title;
        const {description }=  await req.body;
        if(!title || !description){
            return res.status(400).json({ 
                message: "Title and description are required", 
                status_code: res.statusCode 
            });
        }
        const validate = await (Crudmodel.exists({ title: title }));
        if(!validate){
            return res.status(404).json({"message" : `${title} not found`, "status_code" : res.statusCode = 404})
        }
        const update = await (Crudmodel.updateOne({title : title}, { $set: { description: description } }))
        if(update.acknowledged == true){
            return res.status(200).json({"message": `${title} updated successfully` ,
                                        "status_code": res.statusCode=200,
                                         "Updated" : {"field" : "description", "value": description},
                                         "success" : update
                                         });
        }
        else{
            return res.status(500).json({ "message": "Something went wrong" });
        }

    } catch (error) {
        console.log({error})
        return res.status(500).json({"mesage" : "something Went Wrong" , "status_code" : res.statusCode=500, "random": error})
    }

});


router.delete('/delete/:id', async(req, res)=> {
    try{
        const id = await req.params.id;
        if(!id){
            return res.status(404).json({"message": "id cannot be empty" })
        }
        if(Crudmodel.exists({"_id" : id})){
           await Crudmodel.deleteOne({"_id": id})
           .then(()=>{
                res.status(202).json({"message" :  `${id} deleted successfully`})
           })
           .catch((error)=>{
            console.log(error);
            res.status(500).json({
                "message": "something went wrong"
            })
           })
        }
        else{
            res.status(404).json({
                "message": "id not exist"
            })
        }
    }
    catch(error){
        res.json(500).json({
            "message": "something went wrong"
        })
    }
})


router.all('/', (req, res) => {
    res.set('Allow', "GET").status(405).json({"message": "Method Not Allwed"})
})
router.all('/update/:title', (req, res) => {
    res.set('Allow', "PATCH").status(405).json({"message": "Method Not Allwed"})
})

router.all('/delete/:id', (req, res) => {
    res.set('Allow', "DELETE").status(405).json({"message": "Method Not Allwed"})
})



module.exports = router