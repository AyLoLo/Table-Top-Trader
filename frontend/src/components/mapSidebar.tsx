import React from "react"

export const MapSidebar = (props: { posts: any }) => {
  const {
    posts
  } = props
  return (
    <div className=".w-3/12">
      {posts ? posts}
    </div>
  )
}
