import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div>
      <img
        className="w-4/6 mx-auto"
        src="/static/404.png"
        alt="page not found"
      />
      <div className="text-center">
        <Link
          to="/"
          className="inline-block py-1 px-4 rounded-lg border-2 border-black w-fit font-bold hover:bg-black hover:text-white"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}
