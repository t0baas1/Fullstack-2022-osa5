import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testUser = {
    username: 'tester',
    name: 'Tester Pro',
    id: '12345'
}

const blog = {
    title: 'TestSuite Blog',
    author: 'Tester Boi',
    url: 'www.tests.com',
    likes: 10,
    user: testUser
}

test('only title and author are shown at start', () => {
    const mockhandler = jest.fn()

    const { container } = render(
        <Blog blog={blog} currentUser={testUser} addLike={mockhandler} removeBlog={mockhandler} />
    )

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(blog.likes)).toBeNull()
})

test('all blog info shown when button is pressed', async () => {
    const mockhandler = jest.fn()
    const user = userEvent.setup()

    const { container } = render(
        <Blog blog={blog} currentUser={user} addLike={mockhandler} removeBlog={mockhandler} />
    )

    const viewButton = screen.getByText('view')

    await user.click(viewButton)

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(blog.likes)
})

test('when like-button is pressed twice, event handler is called twice', async () => {
    const likeHandler = jest.fn()
    const mockhandler = jest.fn()
    const user = userEvent.setup()

    const { container } = render(
        <Blog blog={blog} currentUser={user} addLike={likeHandler} removeBlog={mockhandler} />
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)

})


