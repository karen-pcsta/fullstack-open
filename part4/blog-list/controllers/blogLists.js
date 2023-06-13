const blogListsRouter = require("express").Router()
const Blog = require("../models/blogList")
let exportedList = []

blogListsRouter.get("/", async (req, res) => {
  const blogList = await Blog.find({})
  exportedList = res.json(blogList)
})

blogListsRouter.post("/", async (req, res) => {
  let blog
  if (req.body.likes === undefined) {
    blog = new Blog({ ...req.body, likes: 0 })
  } else {
    blog = new Blog(req.body)
  }

  await blog.save()
  res.status(201).json(blog)
})

module.exports = { blogListsRouter, exportedList }
