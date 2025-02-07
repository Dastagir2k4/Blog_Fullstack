const express=require('express');
const route=express.Router();


// delete a blog using id
route.delete("/delete-blog/:id", async (req, res) => {
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

module.exports=route;
