const blogListsRouter = require("express").Router()
const req = require("express/lib/request")
const Blog = require("../models/blogList")
const { error } = require("../utils/logger")
let exportedList = []

blogListsRouter.get("/", async (req, res) => {
  const blogList = await Blog.find({})
  exportedList = res.json(blogList)
})

blogListsRouter.post("/", async (req, res) => {
  const { body } = req
  let blog = new Blog(body)
  await blog.save()
  res.status(201).json(blog)
})

blogListsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  await Blog.findByIdAndRemove(id)
  return res.status(204).end()
})

module.exports = { blogListsRouter, exportedList }
