import React from "react"
import { ExpandableText } from "../expandableText"
import closeIcon from "../../icons/close.svg"

export const MapSidePanel = (props: {
  panelAnimation: any,
  setPanelAnimation: Function,
  post: any
}) => {
  const {
    post,
    panelAnimation,
    setPanelAnimation,
  } = props

  const
    slideExitActive = "-right-full animate-slide-close",
    slideOpenAnimation = "right-0 animate-slide-open";

  const date = post ? new Date(post.date_created).toLocaleString() : ""
  return (
    <div className={`
      ${panelAnimation.show &&
      slideOpenAnimation}

      ${panelAnimation.hide &&
      slideExitActive} 
        
      ${!panelAnimation.hide &&
      !panelAnimation.show &&
      " -right-1/2 "}

      bg-white p-6 absolute top-20 h-screen w-3/12 overflow-y-scroll z-50`}
    >
      <div className="flex flex-row-reverse">
        <img className="w-4 cursor-pointer" onClick={() => { setPanelAnimation({ show: false, hide: true }) }} src={closeIcon} alt="close side panel" />
      </div>
      {post &&
        <div className="w-full">
          {/* TODO: IMAGE CAROUSEL HERE */}
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p>${post.price}</p>
          <ExpandableText text={post.description} limit={400} />
          <p>Posted on {date}</p>
        </div>}
    </div>
  )
}
