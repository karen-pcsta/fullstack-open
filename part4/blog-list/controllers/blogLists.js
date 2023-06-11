const blogListsRouter = require("express").Router()
const Blog = require("../models/blogList")
let exportedList = []

blogListsRouter.get("/", async (req, res) => {
  const blogList = await Blog.find({})
  exportedList = res.json(blogList)
})

blogListsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body)
  await blog.save()
  res.status(201).json(blog)
})

module.exports = { blogListsRouter, exportedList }
