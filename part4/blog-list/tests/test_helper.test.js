const Blog = require("../models/blogList")
const User = require("../models/user")

const initialBlogList = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
]

const blogListInDb = async () => {
  const posts = await Blog.find({})
  return posts.map((post) => post.toJSON())
}

const userListInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const savePost = () => {
  const newPost = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }

  return newPost
}

module.exports = {
  initialBlogList,
  blogListInDb,
  savePost,
  userListInDb,
}
