//Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

const newBlog = {
  title: "Oi",
  author: "Doki",
  likes: 5,
  url: "blabla.com",
}

describe("renders ", () => {
  test("blog post with title and author only", () => {
    render(<Blog blog={newBlog} />)

    const titleAndAuthor = screen.getByText("Oi - Doki")
    const url = screen.queryByText("url")
    const likes = screen.queryByText("likes")

    expect(titleAndAuthor).toHaveTextContent("Oi - Doki")

    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test("URL and number of likes after the view button has been clicked ", async () => {
    const { container } = render(<Blog blog={newBlog} />)

    const button = screen.getByText("view")
    await userEvent.click(button)

    const div = container.querySelector(".togglableContent")

    expect(div).toHaveTextContent("blabla.com")
    expect(div).toHaveTextContent("5")
  })
})
