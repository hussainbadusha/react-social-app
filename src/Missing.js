import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <div className='custom-box'>
      <h3>404 Found</h3>
      <p style={{ marginTop: "10px" }}>
        The page you're looking for is not found
      </p>
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default Missing