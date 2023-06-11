const Blog = require("../models/blogList")

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

module.exports = {
  initialBlogList,
  blogListInDb,
}
