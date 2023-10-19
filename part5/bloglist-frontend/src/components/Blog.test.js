//Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("renders blog post with title and author only", () => {
  const newBlog = {
    title: "Oi",
    author: "Doki",
  }

  render(<Blog blog={newBlog} />)

  const titleAndAuthor = screen.getByText("Oi - Doki")
  const url = screen.queryByText("url")
  const likes = screen.queryByText("likes")

  expect(titleAndAuthor).toHaveTextContent("Oi - Doki")

  expect(url).toBeNull()
  expect(likes).toBeNull()
})
