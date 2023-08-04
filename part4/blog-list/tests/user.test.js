const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const supertest = require("supertest")
const { userListInDb } = require("./test_helper.test")
const app = require("../app")
const api = supertest(app)

describe("When there is one user in db at start", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("blabla", 10)
    const user = new User({ username: "blabla2023", name: "blabla", passwordHash })

    await user.save()
  })

  test("New user is successfully added", async () => {
    const usersAtStart = await userListInDb()
    const newUser = {
      username: "Lolololo",
      name: "popi",
      password: "password",
    }

    await api.post("/api/users").send(newUser).expect(201)

    const usersAtEnd = await userListInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)

    expect(usernames).toContain(newUser.username)
  })
})

describe("User creation fails", () => {
  test("Creation fails because username is not unique", async () => {
    const usersAtStart = await userListInDb()
    const newUser = {
      username: "blabla2023",
      name: "blabla",
      password: "123",
    }
    const result = await api.post("/api/users").send(newUser).expect(400)

    expect(result.body.error).toContain("expected `username` to be unique")

    const usersAtEnd = await userListInDb()
    expect(usersAtStart).toEqual(usersAtEnd)
  })
  test("Creation fails because username length must at least 3 characters", async () => {
    const usersAtStart = await userListInDb()
    const newUser = {
      username: "bl",
      name: "blabla",
      password: "123",
    }
    const result = await api.post("/api/users").send(newUser).expect(400)

    expect(result.body.error).toContain(" is shorter than the minimum allowed length (3)")

    const usersAtEnd = await userListInDb()
    expect(usersAtStart).toEqual(usersAtEnd)
  })

  test("Creation fails because password length must at least 3 characters", async () => {
    const usersAtStart = await userListInDb()
    const newUser = {
      username: "blabla2023",
      name: "blabla",
      password: "12",
    }
    const result = await api.post("/api/users").send(newUser).expect(400)

    expect(result.body.error).toContain("password length must be at least 3 characters long")

    const usersAtEnd = await userListInDb()
    expect(usersAtStart).toEqual(usersAtEnd)
  })

  test("Creation fails because password was not informed", async () => {
    const usersAtStart = await userListInDb()
    const newUser = {
      username: "blabla2023",
      name: "blabla",
    }

    expect(newUser.password).toBe(undefined)

    const result = await api.post("/api/users").send(newUser).expect(400)

    expect(result.body.error).toContain("password must be provided")

    const usersAtEnd = await userListInDb()
    expect(usersAtStart).toEqual(usersAtEnd)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
