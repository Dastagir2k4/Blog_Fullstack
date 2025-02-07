const express = require("express");
const route=express.Router();




// add favourite blog
route.put("/add-favourite/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, { isFavorite: true }).then(() => {
        res.send("blog added to favourite");
    }).catch((err) => {
        console.log(err);
        res.send("error occured");
    })
})




// get favourite blogs
route.get("/get-favourite",(req,res)=>{
    Blog.find({isFavorite:true}).then((blogs)=>{
        res.status(200).json(blogs);
    }).catch((err)=>{
        console.log(err);
        res.send("error occured");
    })
})

module.exports=route;
