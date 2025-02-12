const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog.model'); 

// Create a new blog
router.post("/create-blog", async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.send("Blog created successfully");
        console.log("Blog created successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred");
    }
});

// Delete a blog using id
router.delete("/delete-blog/:id", async (req, res) => {
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

// Get all blogs
router.get("/get-blogs", (req, res) => {
    Blog.find().then((blogs) => {
        res.status(200).json(blogs);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error occurred");
    });
});

// Add favourite blog
router.put("/add-favourite/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, { isFavorite: true }).then(() => {
        res.send("Blog added to favourite");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error occurred");
    });
});

// Get data of a single blog
router.get("/get-blog/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((blog) => {
        res.status(200).json(blog);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error occurred");
    });
});

module.exports = router;