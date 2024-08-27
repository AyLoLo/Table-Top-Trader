import React, { useState } from 'react';

export const ExpandableText = (props: { text: string; limit: number; }) => {
  const {
    text,
    limit
  } = props
  const [isExpand, setIsExpand] = useState(false)
  return (
    <div>
      {isExpand ? <p>{text}</p> : `${text.substring(0, limit)}...`}
      <a href="#show" onClick={() => setIsExpand(!isExpand)}>Show {!isExpand ? "More" : "Less"}</a>
    </div>
  );
}
