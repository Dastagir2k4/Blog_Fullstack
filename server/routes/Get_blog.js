const express = require("express");
const route=express.Router();


// get all blogs
route.get("/get-blogs", (req, res) => {
    Blog.find().then((blogs) => {
        res.status(200).json(blogs);
    }).catch((err) => {
        console.log(err);
        res.send("error occured");
    })
})

// get data of a single blog
route.get("/get-blog/:id",(req,res)=>{
    const id=req.params.id;
    Blog.findById(id).then((blog)=>{
        res.status(200).json(blog);
    }).catch((err)=>{
        console.log(err);
        res.send("error occured");
    }) 
})

module.exports=route;