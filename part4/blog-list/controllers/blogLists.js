const blogListsRouter = require("express").Router()
const req = require("express/lib/request")
const Blog = require("../models/blogList")
const { error } = require("../utils/logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

let exportedList = []

blogListsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  res.json(blogs)
})

blogListsRouter.post("/", async (req, res) => {
  const { body, token } = req

  if (!token) {
    return res.status(401).json({ error: "token missing" })
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({ ...body, user: user.id })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)

  await user.save()

  res.status(201).json(savedBlog)
})

blogListsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const { token } = req

  if (!token) {
    return res.status(401).json({ error: "token missing" })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" })
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({ error: "blog not found" })
  }

  if (blog.user.toString() !== decodedToken.id) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  await Blog.findByIdAndRemove(id)

  const user = await User.findById(decodedToken.id)
  user.blogs = user.blogs.filter((blog) => blog.toString() !== id)
  await user.save()

  return res.status(204).end()
})

blogListsRouter.put("/:id", async (req, res) => {
  const id = req.params.id
  const { body } = req
  const updatedBlog = {
    ...body,
    likes: body.likes,
  }
  await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
  res.send(updatedBlog)
})

module.exports = { blogListsRouter, exportedList }
