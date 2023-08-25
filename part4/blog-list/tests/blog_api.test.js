const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blogList")
const User = require("../models/user")
const { initialBlogList, blogListInDb, savePost } = require("./test_helper.test")

const createUserToken = async () => {
  const user = {
    username: "blabla2023",
    name: "blabla",
    password: "papaya",
  }

  await api.post("/api/users").send(user)

  const result = await api.post("/api/login").send(user)

  header = {
    "Authorization": `Bearer ${result.body.token}`, // prettier-ignore
  }

  return header
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogArr = initialBlogList.map((post) => new Blog(post))
  const blogPromise = blogArr.map((post) => post.save())
  await Promise.all(blogPromise)
})

describe("when there is initially some blog posts", () => {
  test("blogList is returned as json", async () => {
    await api
      .get("/api/blogs")
      .set(await createUserToken())
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("entire blog list is returned", async () => {
    const response = await blogListInDb()
    expect(response).toHaveLength(initialBlogList.length)
  })
})

describe("addition of a new blog", () => {
  test("id property exists", async () => {
    const response = await blogListInDb()

    expect(response[0].id).toBeDefined()
  })

  test("a new post is created", async () => {
    const newPost = savePost()

    await api
      .post("/api/blogs")
      .send(newPost)
      .set(await createUserToken())
      .expect(201)

    const blogList = await blogListInDb()

    expect(blogList).toHaveLength(initialBlogList.length + 1)
  })

  test("if like property is missing, it will default to the value 0 ", async () => {
    const newPost = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }
    await api
      .post("/api/blogs")
      .send(newPost)
      .set(await createUserToken())
      .expect(201)

    const blogList = await blogListInDb()
    const lastPost = blogList[blogList.length - 1]
    expect(lastPost.likes).toBe(0)
  })

  test("if title or url property is missing, return with bad request ", async () => {
    const post = {
      author: "Robert C. Martin",
      likes: 5,
    }
    await api
      .post("/api/blogs")
      .send(post)
      .set(await createUserToken())
      .expect(400)
  })

  test("if token is not provided a new post won't be created and will return with unauthorized ", async () => {
    const post = {
      author: "Robert C. Martin",
      likes: 5,
    }
    await api.post("/api/blogs").send(post).expect(401)
  })
})

describe("deletion of a blog", () => {
  test("a single blog post is deleted successfully", async () => {
    const blogList = await blogListInDb()
    const firstBlogId = blogList[0].id

    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .set(await createUserToken())
      .expect(204)
  })
})

describe("blog update", () => {
  test("likes in a single blog post is updated", async () => {
    const blogList = await blogListInDb()
    const blogToUpdate = blogList[0]
    const id = blogToUpdate.id
    const updatedBlog = {
      ...blogToUpdate,
      likes: 20,
    }
    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .set(await createUserToken())
      .expect(200)

    const blogsAtEnd = await blogListInDb()
    expect(blogsAtEnd[0].likes).toBe(20)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
