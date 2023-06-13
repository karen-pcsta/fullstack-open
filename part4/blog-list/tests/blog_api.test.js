const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blogList")
const { initialBlogList, blogListInDb, savePost } = require("./test_helper.test")

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogArr = initialBlogList.map((post) => new Blog(post))
  const blogPromise = blogArr.map((post) => post.save())
  await Promise.all(blogPromise)
})

test("blogList is returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("entire blog list is returned", async () => {
  const response = await blogListInDb()
  //   console.log(response)
  expect(response).toHaveLength(initialBlogList.length)
})

test("id property exists", async () => {
  const response = await blogListInDb()
  // console.log(response)
  expect(response[0].id).toBeDefined()
})

test("a new post is created", async () => {
  const newPost = savePost()
  // console.log(newPost)

  await api.post("/api/blogs").send(newPost).expect(201)

  const blogList = await blogListInDb()

  expect(blogList).toHaveLength(initialBlogList.length + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})
