const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/Blog.model');
app.use(cors());
require('dotenv').config();

app.use(express.json());

const dbUrl = process.env.DATABASE_URL;


mongoose.connect(dbUrl).then(() => {
    console.log("mongodb is connected");
}).catch((err) => {
    console.log(err);
})


app.get("/", (req, res) => {
    res.send("hello world");
})


// create a blog 

app.post("/create-blog", async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;

    try {
        const blog = await Blog.create({
            title: title,
            content: content,
            image: image
        })


        res.send("blog created successfully");
        console.log("blog created successfully");
    } catch (err) {
        console.log(err);
        res.send("error occured");
    }
})


// delet a blog using id
// ...existing code...

// delete a blog using id
app.delete("/delete-blog/:id", async (req, res) => {
    const id = req.params.id;
    console.log("Received request to delete blog with id:", id);

    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            console.log("Blog not found with id:", id);
            return res.status(404).send("Blog not found");
        }
        res.send("Blog deleted successfully");
        console.log("Blog deleted successfully with id:", id);
    } catch (err) {
        console.log("Error occurred while deleting blog:", err);
        res.status(500).send("Error occurred");
    }
});

// ...existing code...

// get all blogs
app.get("/get-blogs", (req, res) => {
    Blog.find().then((blogs) => {
        res.status(200).json(blogs);
    }).catch((err) => {
        console.log(err);
        res.send("error occured");
    })
})

// add favourite blog
app.put("/add-favourite/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, { isFavorite: true }).then(() => {
        res.send("blog added to favourite");
    }).catch((err) => {
        console.log(err);
        res.send("error occured");
    })
})

// get data of a single blog
app.get("/get-blog/:id",(req,res)=>{
    const id=req.params.id;
    Blog.findById(id).then((blog)=>{
        res.status(200).json(blog);
    }).catch((err)=>{
        console.log(err);
        res.send("error occured");
    }) 
})


app.get("/get-favourite",(req,res)=>{
    Blog.find({isFavorite:true}).then((blogs)=>{
        res.status(200).json(blogs);
    }).catch((err)=>{
        console.log(err);
        res.send("error occured");
    })
})



app.listen(3000, () => {
    console.log("server is runningg");

})