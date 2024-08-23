import React, { useTransition } from "react"
import { ExpandableText } from "./expandableText"
import closeIcon from "../icons/close.svg"

export const MapSidePanel = (props: {
  hideSidePanel: boolean,
  setHideSidePanel: Function,
  startClosePanelTransition: Function,
  isPendingClose: any,
  isPendingOpen: any,
  post: any
}) => {
  const {
    post,
    hideSidePanel,
    setHideSidePanel,
    startClosePanelTransition,
    isPendingClose,
    isPendingOpen,
  } = props

  const
    slideExit = "-right-1/2 ease-in-out delay-500 animate-slide-open",
    slideExitActive = "right-0 ease-in-out linear delay-500 animate-slide-close",
    slideOpen = "right-0 ease-in-out linear delay-500 animate-slide-close",
    slideOpenAnimation = "-right-1/2 ease-in-out delay-500 animate-slide-open"

  console.log(hideSidePanel)
  console.log(post)

  const date = post ? new Date(post.date_created).toLocaleString() : ""
  return (
    <div className={`${!hideSidePanel ? slideExitActive : slideExit} bg-white p-6 absolute top-20 right-0 h-screen w-3/12 overflow-y-scroll z-50`}>
      <div className="flex flex-row-reverse">
        <img className="w-4 cursor-pointer" onClick={() => { setHideSidePanel(true) }} src={closeIcon} alt="close side panel" />
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
