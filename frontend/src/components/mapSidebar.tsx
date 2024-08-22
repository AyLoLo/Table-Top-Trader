import React from "react"
import { ExpandableText } from "./expandableText"

export const MapSidebar = (props: { posts: any, post: any }) => {
  const {
    posts,
    post
  } = props
  console.log("post is ", post)
  const date = post ? new Date(post.date_created).toLocaleString() : ""
  return (
    post ?
      <div className={`bg-white p-6 absolute top-20 right-0 h-screen w-3/12 overflow-y-scroll z-50`}>
        <div className="w-full">
          {/* TODO: IMAGE SLIDESHOW HERE */}
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p>${post.price}</p>
          <ExpandableText text={post.description} limit={100} />
          <p>Posted on {date}</p>
        </div>
      </div >
      : <div></div>
  )
}
