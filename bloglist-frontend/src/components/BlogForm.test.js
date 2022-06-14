import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  

  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await userEvent.type(inputs[0], 'Testing Title')
  await userEvent.type(inputs[1], 'Testing Author')
  await userEvent.type(inputs[2], 'Testing Url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
})