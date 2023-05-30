const blogListsRouter = require("express").Router()
const Blog = require("../models/blogList")

blogListsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogListsRouter.post("/", (req, res) => {
  const blog = new Blog(req.body)
  blog.save().then((result) => {
    res.status(201).json(result)
  })
})

module.exports = blogListsRouter
