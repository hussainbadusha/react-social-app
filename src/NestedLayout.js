import React from 'react'
import { Outlet } from 'react-router-dom'

const NestedLayout = () => {
  return (
    <>
      <div>Nested (Coming from common layout)</div>
      <Outlet /> {/* This is very important to show the actual page content */}
    </>
  )
}

export default NestedLayout