const express=require('express');
const route=express.Router();

// create a blog 
route.post("/create-blog", async (req, res) => {
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

module.exports=route;
