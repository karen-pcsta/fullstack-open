import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NewBlogForm from "./NewBlogForm"

const newBlog = {
  title: "Oi",
  author: "Doki",
  url: "blabla.com",
}

const handleNewBlogCreation = jest.fn()

describe("When a blog is created ", () => {
  test("the form calls the event handler it received as props with the right details", async () => {
    const { container } = render(<NewBlogForm handleNewBlog={handleNewBlogCreation}></NewBlogForm>)

    const user = userEvent.setup()
    const createBtn = screen.getByText("Create")

    const titleInput = container.querySelector("#title-input")
    const authorInput = container.querySelector("#author-input")
    const urlInput = container.querySelector("#url-input")

    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)

    await user.click(createBtn)

    expect(handleNewBlogCreation).toBeCalled()

    expect(handleNewBlogCreation).toHaveBeenCalledWith({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
  })
})
