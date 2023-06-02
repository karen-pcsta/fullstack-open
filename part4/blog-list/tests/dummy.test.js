const { dummy, totalLikes } = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []
  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ]

  test("of empty list is zero", () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("of a bigger list is calculated right", () => {
    const result = totalLikes([
      { likes: 1 },
      { likes: 2 },
      { likes: 3 },
      { likes: 4 },
      { likes: 5 },
      { likes: 6 },
    ])
    expect(result).toBe(21)
  })
})
