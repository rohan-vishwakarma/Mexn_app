const express = require('express');


const router = express.Router()


router.get('/', (req, res) => {
    res.json({"message": "This is an index page"});
});


router.post('/post', (req, res) => {

    const a = ""
    if(a == ""){
        res.json({"msg": "a should not be empty"})
    }else{
        res.json({"msg": a});
    }
})



module.exports = router