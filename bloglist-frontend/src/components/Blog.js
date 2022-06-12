import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
      setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></div>
    </div>
    <div style={showWhenVisible}>
      <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={() => addLike(blog)}>like</button></div>
      <div>{blog.user.name}</div>
      {blog.user.username === currentUser.username && <button onClick={() => removeBlog(blog.id)}>remove</button>}
    </div>
  </div>  
)}

export default Blog