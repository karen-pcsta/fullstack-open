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

let container
const handleLikeTest = jest.fn()

beforeEach(() => {
  container = render(<Blog blog={newBlog} updateBlog={handleLikeTest} />).container
})

describe("renders ", () => {
  test("blog post with title and author only", () => {
    const titleAndAuthor = screen.getByText("Oi - Doki")
    const url = screen.queryByText("url")
    const likes = screen.queryByText("likes")

    expect(titleAndAuthor).toHaveTextContent("Oi - Doki")

    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test("URL and number of likes after the view button has been clicked ", async () => {
    const button = screen.getByText("view")
    await userEvent.click(button)

    const div = container.querySelector(".togglableContent")

    expect(div).toHaveTextContent("blabla.com")
    expect(div).toHaveTextContent("5")
  })
})

describe("when clicked, ", () => {
  test("the event handler for the like button is called twice", async () => {
    const button = screen.getByText("view")
    await userEvent.click(button)

    const likeButton = screen.getByText("like")

    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(handleLikeTest).toHaveBeenCalledTimes(2)
  })
})
