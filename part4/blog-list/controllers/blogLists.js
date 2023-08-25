const blogListsRouter = require("express").Router()
const req = require("express/lib/request")
const Blog = require("../models/blogList")
const { error } = require("../utils/logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

let exportedList = []

// const getTokenFrom = (req) => {
//   const authorization = req.get("authorization")
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "")
//   }
//   return null
// }

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
  await Blog.findByIdAndRemove(id)
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
