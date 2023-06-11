const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blogList")
const { initialBlogList, blogListInDb } = require("./test_helper.test")

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

afterAll(async () => {
  await mongoose.connection.close()
})
